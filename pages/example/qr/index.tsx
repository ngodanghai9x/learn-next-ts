import { NextPage } from 'next'
import Image from 'next/image'
import * as QRCode from 'qrcode'
import { useState } from 'react'

interface Props {
  userAgent?: string
}

const QrPage: NextPage<Props> = ({ userAgent }) => {
  const [textQR, setTextQR] = useState<string>('default textQR')
  const [base64QR, setBase64QR] = useState<string>('')

  const generateQR = async (text: string) => {
    await QRCode.toDataURL(text, { errorCorrectionLevel: 'H' })
      .then((data) => {
        console.log('generateQR', { data })
        setBase64QR(data)
      })
      .catch(console.error)
  }

  const generateQRImage = async (text: string) => {
    await QRCode.toCanvas(document.getElementById('canvas'), text, {
      errorCorrectionLevel: 'high',
      scale: 10,
    })
      .then((data) => console.log('generateQRImage', data))
      .catch(console.error)
  }

  return (
    <div>
      <main>Your user agent: {userAgent}</main>
      <br />

      <div className="input-form" style={{ margin: '20px 0px' }}>
        <label htmlFor="qr-text">QR text</label>
        <input
          id="qr-text"
          type="text"
          onChange={(e) => setTextQR(e.target.value)}
          value={textQR}
        />
      </div>

      <div className="qr-container" style={{ background: '#F2F2F2', width: '100%', height: 400 }}>
        <button onClick={() => generateQR(textQR)}>Generate QR</button>
        {base64QR && (
          <Image
            src={base64QR}
            // src={'/public/images/4mbb.jpg'}
            alt="anh-qr-base64"
            width={200}
            height={200}
          />
        )}
        <button onClick={() => generateQRImage(textQR)}>Generate QR Image</button>
        <canvas id="canvas"></canvas>
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
