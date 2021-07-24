import { gql } from '@apollo/client'
import client from '../apollo-client'
import Header, { HeaderType } from '../components/Header'
import SEO, { SEOGlobalType, SEOPageType } from '../components/SEO'

type Props = {
  page: {
    header: HeaderType,
    seo: SEOPageType
  },
  global: {
    seo: SEOGlobalType
  }
}

const NotFound = ({ page, global }: Props) => (
  <>
    <SEO
      page={{...page.seo, canonical: '/404', noIndex: true, noFollow: true}}
      global={global.seo}
    />
    <Header content={page.header} />
  </>
)

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
      page: data.notFound,
      global: data.global
    }
  }
}

export default NotFound
