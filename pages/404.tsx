import { gql } from '@apollo/client'
import client from '../apollo-client'
// import Head from 'next/head'
import Header, { HeaderType } from '../components/Header'

type NotFoundProps = {
  notFound: {
    header: HeaderType
  }
}

const NotFound = ({
  notFound: { header }
}: NotFoundProps) => {
  return (
    <Header
      content={header}
    />
  )
}

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        notFound {
          header {
            title
            subtitle
            description
            link {
              name
              url
            }
          }
        }
      }
    `
  })

  return { props: { notFound: data.notFound } }
}

export default NotFound
