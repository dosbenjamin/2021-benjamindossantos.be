import { gql } from '@apollo/client'
import client from '../apollo-client'
import Header, { HeaderType } from '../components/Header'
import Link, { LinkType } from '../components/Link'
import SEO, { SEOGlobalType, SEOPageType } from '../components/SEO'
import { useReveal } from '../hooks/useReveal'
import { useEffect } from 'react'
import { GetStaticProps } from 'next'

type Props = {
  page: {
    header: HeaderType
    socials: LinkType[]
    seo: SEOPageType
  }
  global: {
    seo: SEOGlobalType
  }
}

const Home = ({ page, global }: Props) => {
  const { setReveal, revealClass } = useReveal()

  useEffect(() => setReveal(true), [])

  return (
    <>
      <SEO page={{...page.seo, canonical: ''}} global={global.seo} />
      <Header content={page.header}>
        <ul className="lg:text-right">
          {page.socials.map(({ name, url }, index) => {
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

export const getStaticProps: GetStaticProps = async () => {
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
          seo {
            title
            description
            thumbnail {
              url
            }
          }
        }
        global {
          seo {
            title
            twitter
            thumbnail {
              url
            }
            favicon {
              url
            }
          }
        }
      }
    `
  })

  return {
    props: {
      page: data.home,
      global: data.global
    }
  }
}

export default Home
