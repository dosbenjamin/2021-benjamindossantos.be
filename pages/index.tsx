import { gql } from '@apollo/client'
import client from '../apollo-client'
import Head from 'next/head'
import Header, { HeaderType } from '../components/Header'
import Link, { LinkType } from '../components/Link'
import { useReveal } from '../hooks/useReveal'
import { useEffect } from 'react'

type HomeProps = {
  home: {
    header: HeaderType
    socials: LinkType[]
  }
}

const Home = ({
  home: { header, socials }
}: HomeProps) => {
  const { setReveal, revealClass } = useReveal()

  useEffect(() => {
    setTimeout(
      () => setReveal(true),
      250
    )
  }, [])

  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      <Header content={header}>
        <ul className="lg:text-right">
          {socials.map(({ name, url }, index) => {
            return (
              <li
                className={`leading-none ${revealClass}`}
                style={{transitionDelay: `${(index * 150) + 750}ms`}}
                key={name}
              >
                <Link url={url}>{name}</Link>
              </li>
            )
          })}
        </ul>
      </Header>
    </>
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
