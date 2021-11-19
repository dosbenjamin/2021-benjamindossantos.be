import { gql } from '@apollo/client'
import { GetStaticProps } from 'next'
import { SocialProfileJsonLd } from 'next-seo'
import { useEffect } from 'react'
import client from '../apollo-client'
import Header, { HeaderType } from '../components/Header'
import Layout from '../components/Layout'
import Link, { LinkType } from '../components/Link'
import SEO, { SEOPageType, SEOSiteType } from '../components/SEO'
import { useReveal } from '../hooks/useReveal'

type Props = {
  site: {
    socials: LinkType[]
    seo: SEOSiteType
  }
  page: {
    header: HeaderType
    seo: SEOPageType
  }
}

const Home = ({ site, page }: Props) => {
  const { setReveal, revealClass } = useReveal()

  useEffect(() => {
    setTimeout(
      () => setReveal(true),
      500
    )
  }, [])

  return (
    <>
      <SEO page={{...page.seo, canonical: ''}} site={site.seo} />
      <SocialProfileJsonLd
        type="Person"
        name="Benjamin Dos Santos"
        url={String(process.env.PRODUCTION_URL)}
        sameAs={site.socials.map(({ url }) => url)}
      />
      <Layout>
        <Header content={page.header}>
          <ul className="lg:text-right">
            {site.socials.map(({ name, url }, index) => {
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
      </Layout>
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
          seo {
            title
            description
            thumbnail {
              url
            }
          }
        }
        global {
          socials {
            name
            url
          }
          seo {
            title
            twitter
            thumbnail {
              url
            }
          }
        }
      }
    `
  })

  return {
    props: {
      site: data.global,
      page: data.home
    }
  }
}

export default Home
