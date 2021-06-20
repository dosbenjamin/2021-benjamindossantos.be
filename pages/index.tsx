import { gql } from '@apollo/client'
import client from '../apollo-client'
// import Head from 'next/head'
import Header, { HeaderType } from '../components/Header'
import Link, { LinkType } from '../components/Link'

type HomeProps = {
  home: {
    header: HeaderType
    socials: LinkType[]
  }
}

const Home = ({
  home: { header, socials }
}: HomeProps) => {
  return (
    <Header content={header} >
      <ul className="text-right">
        {socials.map(({ name, url }) => {
          return (
            <li key={name}>
              <Link url={url}>{name}</Link>
            </li>
          )
        })}
      </ul>
    </Header>
  )
}

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        home {
          header {
            title
            subtitle
            description
            link {
              name
              url
            }
          }
          socials {
            name
            url
          }
        }
      }
    `
  })

  return { props: { home: data.home } }
}

export default Home
