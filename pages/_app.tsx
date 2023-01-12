import '../styles/globals.css'
import variables from '../styles/variables.module.scss'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import React from 'react'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
// function MyAppOld({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }
export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <React.Fragment>
      <p
        style={{
          color: variables.secondaryColor,
          height: 20,
          width: 50,
          background: variables.primaryColor,
        }}
      >
        Color
      </p>
      <Component {...pageProps} />
    </React.Fragment>
  )
}
