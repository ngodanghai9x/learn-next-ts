import type { ReactElement } from 'react'
import React from 'react'
import Layout from '../../components/Layout/Layout'
import Sidebar from '../../components/Layout/Sidebar'
import type { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  return <p>hello world</p>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <React.Fragment>
      {page}
      <Sidebar/>
      </React.Fragment>
    </Layout>
  )
}

export default Page