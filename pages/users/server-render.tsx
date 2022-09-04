// TODO: Need to fetch `users` (by calling some API endpoint)
//       before this page can be pre-rendered.
import fetch from 'node-fetch';
import { useRouter } from "next/router"
import React from "react"
import { API_BASE_URL } from "../../constants"
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
// import useSWR from 'swr';

const USER_LIST = [{name:"Hai"}]
export const getServerSideProps: GetServerSideProps = async (context) => {
  const {query, params, req, res, locale, locales, defaultLocale} = context;
  console.log("🚀 ~ query", query)
  console.log("🚀 ~ params", params)
  console.log("🚀 ~ req", req)
  console.log("🚀 ~ locale, locales, defaultLocale", locale, locales, defaultLocale)
  if (query?.a == '2') {
    throw new Error(`123`)
  }
  if (query?.a == '404') {
    return {
      notFound: true,
    }
  }
  if (query?.a == 'redirect') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
        // statusCode: 401
      },
    }
  }
  // console.log("🚀 ~ res", res)
  // res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=10, stale-while-revalidate=59'
  // )
  // const { data, error } = useSWR('/api/users', fetch);
  // Call an external API endpoint to get users or query db
  // const _res = await fetch(`${API_BASE_URL}/users/`).catch(console.warn)
  // const res = await fetch(`${API_BASE_URL}/users/${params.userId}`).catch(console.warn)
  const users = await Promise.resolve(USER_LIST)

  // By returning { props: { users } }, the Blog component
  // will receive `users` as a prop at build time
  return {
    props: {
      users,
    },
  }
}

function ServerRender({ users = [] as typeof USER_LIST }) {
  const router = useRouter();
  return (
    <React.Fragment>
      <h3>Query: {JSON.stringify(router.query || '')}</h3>
      <ul>
        {users.map((u) => (
          <li key={u.name}>{u?.name}</li>
        ))}
      </ul>
    </React.Fragment>
  )
}

export default ServerRender