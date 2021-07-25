import { NextSeo } from 'next-seo'

export type SEOSiteType = {
  title: string
  twitter?: string
  thumbnail?: {
    url: string
  }
}

export type SEOPageType = {
  title: string
  description: string
  canonical: string
  noIndex?: boolean
  noFollow?: boolean
  thumbnail?: {
    url: string
  }
}

type Props = {
  children?: JSX.Element | JSX.Element[]
  site: SEOSiteType
  page: SEOPageType
}

const SEO = ({ site, page }: Props) => (
  <NextSeo
    title={`${page.title} - ${site.title}`}
    description={page.description}
    noindex={page.noIndex}
    nofollow={page.noFollow}
    canonical={`${process.env.PRODUCTION_URL}${page.canonical}`}
    openGraph={{
      url: `${process.env.PRODUCTION_URL}${page.canonical}`,
      type: 'website',
      locale: 'en_GB',
      ...(site.title && { site_name: site.title }),
      ...(page.title && { title: page.title }),
      ...(page.description && { description: page.description }),
      ...(site.thumbnail && {
        images: [{
          url: page.thumbnail?.url ?? site.thumbnail.url,
          width: 1200,
          height: 630
        }]
      })
    }}
    twitter={{
      cardType: 'summary_large_image',
      ...(site.twitter && { handle: site.twitter })
    }}
  />
)

export default SEO