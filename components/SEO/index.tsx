import { NextSeo } from 'next-seo'

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

export type SEOGlobalType = {
  title: string
  thumbnail?: {
    url: string
  }
  favicon?: {
    url: string
  }
  twitter?: string
}

type Props = {
  children?: JSX.Element | JSX.Element[]
  page: SEOPageType
  global: SEOGlobalType
}

const SEO = ({
  children,
  page,
  global
}: Props) => (
  <NextSeo
    title={`${page.title} - ${global.title}`}
    description={page.description}
    noindex={page.noIndex}
    nofollow={page.noFollow}
    canonical={`${process.env.PRODUCTION_URL}${page.canonical}`}
    openGraph={{
      url: `${process.env.PRODUCTION_URL}${page.canonical}`,
      type: 'website',
      locale: 'en_GB',
      ...(global.title && { site_name: global.title }),
      ...(page.title && { title: page.title }),
      ...(page.description && { description: page.description }),
      ...(global.thumbnail && {
        images: [{
          url: page.thumbnail?.url ?? global.thumbnail.url,
          width: 1200,
          height: 630
        }]
      })
    }}
    twitter={{
      cardType: 'summary',
      ...(global.twitter && { handle: global.twitter })
    }}
  />
)

export default SEO