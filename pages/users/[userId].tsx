// TODO: Need to fetch `users` (by calling some API endpoint)
//       before this page can be pre-rendered.
import fetch from 'node-fetch';
import { useRouter } from "next/router"
import React from "react"
import { API_BASE_URL } from "../../constants"
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
// import useSWR from 'swr';

const USER_LIST = [{name:"Hai"}]
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // ...
// }

// Next.js will statically pre-render all the paths specified by getStaticPaths.
export const getStaticPaths: GetStaticPaths = async () => {
  // // Call an external API endpoint to get users
  // const res = await fetch('https://.../users')
  // const users = await res.json()

  // // Get the paths we want to pre-render based on users
  // const paths = users.map((post) => ({
  //   params: { id: post.id },
  // }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    paths: [
      // String variant:
      '/users/first-post',
      // Object variant:
      { params: { userId: '123' } },
    ],
    fallback: true,
  }
}

// This function gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log("🚀 ~ params", params)
  // const { data, error } = useSWR('/api/users', fetch);
  // Call an external API endpoint to get users
  const res = await fetch(`${API_BASE_URL}/users/`).catch(console.warn)
  // const res = await fetch(`${API_BASE_URL}/users/${params.userId}`).catch(console.warn)
  const users = await res?.json() || []

  // By returning { props: { users } }, the Blog component
  // will receive `users` as a prop at build time
  return {
    props: {
      users,
    },
  }
}
function User({ users = USER_LIST }) {
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

export default User

// type GetStaticPropsContext<
//   Q extends ParsedUrlQuery = ParsedUrlQuery,
//   D extends PreviewData = PreviewData
// > = {
//   params?: Q
//   preview?: boolean
//   previewData?: D
//   locale?: string
//   locales?: string[]
//   defaultLocale?: string
// }

// type GetServerSidePropsContext<
//   Q extends ParsedUrlQuery = ParsedUrlQuery,
//   D extends PreviewData = PreviewData
// > = {
//   req: IncomingMessage & {
//     cookies: NextApiRequestCookies
//   }
//   res: ServerResponse
//   query: ParsedUrlQuery
//   resolvedUrl: string
  
//   params?: Q
//   preview?: boolean
//   previewData?: D
//   locale?: string
//   locales?: string[]
//   defaultLocale?: string
// }