import { gql } from '@apollo/client'
import client from '../apollo-client'
import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import Header, { HeaderType } from '../components/Header'
import SEO, { SEOSiteType, SEOPageType } from '../components/SEO'

type Props = {
  site: {
    seo: SEOSiteType
  }
  page: {
    header: HeaderType,
    seo: SEOPageType
  }
}

const NotFound = ({ site, page }: Props) => (
  <>
    <SEO
      page={{
        ...page.seo,
        canonical: '/404',
        noIndex: true,
        noFollow: true
      }}
      site={site.seo}
    />
    <Layout>
      <Header content={page.header} />
    </Layout>
  </>
)

export const getStaticProps: GetStaticProps = async () => {
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
          }
        }
      }
    `
  })

  return {
    props: {
      site: data.global,
      page: data.notFound
    }
  }
}

export default NotFound
