import { NextPage } from 'next'
import Image from 'next/image'
import * as QRCode from 'qrcode'
import { useState } from 'react'
import QrScanner from 'qr-scanner'
import defaultPng from '../../../public/images/default.png'

interface Props {
  userAgent?: string
}

interface QRCommand {
  type: string
  data: string // JSON
  options: object
}

const QrPage: NextPage<Props> = ({ userAgent }) => {
  const qrWidth = 200
  const qrCmd: QRCommand = {
    type: 'qr',
    data: JSON.stringify({ name: 'Hai Ngo' }),
    options: { option1: 'email' },
  }
  const [textQR, setTextQR] = useState<string>(JSON.stringify(qrCmd))
  const [base64QR, setBase64QR] = useState<string>('')

  const generateQRUrl = async (text: string) => {
    await QRCode.toDataURL(text, { errorCorrectionLevel: 'H' })
      .then((data) => {
        console.log('generateQRUrl', { data })
        setBase64QR(data)
      })
      .catch(console.error)
    await generateQR(text)
  }

  const generateQR = async (text: string) => {
    await QRCode.toString(text, { errorCorrectionLevel: 'H', type: 'terminal' })
      .then((data) => {
        console.log('generateQR', { data })
      })
      .catch(console.error)
    await QRCode.toString(text, { errorCorrectionLevel: 'H', type: 'svg' })
      .then((data) => {
        console.log('generateQR', { data })
      })
      .catch(console.error)
    await QRCode.toString(text, { errorCorrectionLevel: 'H', type: 'utf8' })
      .then((data) => {
        console.log('generateQR', { data })
      })
      .catch(console.error)
  }

  const generateQRCanvas = async (text: string) => {
    await QRCode.toCanvas(document.getElementById('canvas'), text, {
      errorCorrectionLevel: 'high',
      width: qrWidth,
    })
      .then((data) => console.log('generateQRCanvas', data))
      .catch(console.error)
  }

  const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data)
    // const byteCharacters = Buffer.from(b64Data, 'base64')
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize)

      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }

      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }

    const blob = new Blob(byteArrays, { type: contentType })
    return blob
  }

  const readQRCode = async (base64Img: string) => {
    const contentType = 'image/png'
    const b64Data =
      'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='

    const blob = b64toBlob(b64Data, contentType)
    const blobUrl = URL.createObjectURL(blob)
    const img = document.createElement('img')
    img.src = blobUrl
    document.body.appendChild(img)

    const qrImage = document.createElement('img')
    qrImage.src = base64Img

    QrScanner.scanImage(qrImage)
      .then((result) => {
        console.log(`QR code: ${result}`)
        try {
          const qrCommand: QRCommand = JSON.parse(result)
          console.warn(qrCommand)
          // if (prompt(`nhập thêm input ?`, 'default text')) {
          if (confirm(`Bạn có muốn xem data của qrCommand k ?`)) {
            alert(qrCommand.data)
          }
        } catch (error: any) {
          alert(`QR code: ${result}; Message: ${error?.message}`)
        }
      })
      .catch((error) => console.log(error || 'No QR code found.'))
  }

  return (
    <div>
      <main>Your user agent: {userAgent}</main>
      <br />

      <div className="input-form" style={{ margin: '20px 0px' }}>
        <label htmlFor="qr-text">QR text</label>
        <textarea
          id="qr-text"
          // type="text"
          onChange={(e) => setTextQR(e.target.value)}
          value={textQR}
        />
      </div>
      <div
        className="qr-container"
        style={{
          width: '100%',
        }}
      >
        <button onClick={() => generateQRUrl(textQR)}>Generate QR</button>
        {
          <Image
            src={base64QR || defaultPng}
            alt="anh-qr-base64"
            width={qrWidth}
            height={qrWidth}
          />
        }
        {base64QR && <button onClick={() => readQRCode(base64QR)}>Read QR Code</button>}
      </div>

      <div
        className="qr-container"
        style={{
          width: '100%',
          margin: '10px 0px',
        }}
      >
        <button onClick={() => generateQRCanvas(textQR)}>Generate QR Image</button>
        <canvas id="canvas" width={qrWidth} height={qrWidth}></canvas>
        {/* <img
          src={base64QR}
          // src={'/public/images/4mbb.jpg'}
          alt="anh-qr-base64"
        /> */}
      </div>
    </div>
  )
}

QrPage.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  return { userAgent }
}

export default QrPage
