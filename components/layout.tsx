import Head from 'next/head';
import React, { ReactElement, ReactNode } from 'react';
import styles from './layout.module.css';

// const Layout: React.FC = function ({ children }) {
function Layout({ children }: { children: ReactNode }): ReactElement {
  return (
    <React.Fragment>
      <Head>
        <title>Layouts Example</title>
      </Head>
      <main className={styles.main}>{children}</main>
    </React.Fragment>
  );
}
export default Layout
