import React, { ReactElement } from 'react'
import variables from '../styles/variables.module.scss'
import utilStyles from '../styles/utils.module.css'
import { NextPageWithLayout } from './_app'
import Sidebar from '../components/sidebar'
import Layout from '../components/layout'
import Image from 'next/image'
import image4mb from '../public/images/4mbb.jpg'

// https://github.com/vercel/styled-jsx
// npm install --save styled-jsx
// Next, add styled-jsx/babel to plugins in your babel configuration:
// {
//   "plugins": ["styled-jsx/babel"]
// }



const CSS: NextPageWithLayout = () => {
  return (
    <div>
      Hello world
      <p>scoped!</p>
      <p style={{color: variables.secondaryColor, height: 100, width: 100, background: variables.primaryColor}}>Color</p>
      <p style={{ color: 'red' }}>hi there</p>
      <Image 
        src={image4mb} 
        // src={'/public/images/4mbb.jpg'} 
        alt='anh-4mb' 
      />
      <button type="button" className={utilStyles.listItem}>
        Button
      </button>
      {/* <style jsx>{`
        p {
          color: blue;
        }
        div {
          background: red;
        }
        @media (max-width: 600px) {
          div {
            background: blue;
          }
        }
      `}</style>
      <style global jsx>{`
        body {
          background: black;
        }
      `}</style> */}
    </div>
  )
}

CSS.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <React.Fragment>
      {page}
      <Sidebar/>
      </React.Fragment>
    </Layout>
  )
}

export default CSS