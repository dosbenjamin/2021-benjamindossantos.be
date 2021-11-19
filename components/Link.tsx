import NextLink from 'next/link'

export type LinkType = {
  name: string
  url: string
}

type LinkProps = Omit<LinkType, 'name'> & {
  children: LinkType['name'] | JSX.Element
  className?: string
}

const Link = ({ children, url, className }: LinkProps) => {
  return (
    <NextLink href={url}>
      <a className={`inline-block text-sm transform-gpu transition-transform duration-1000 ease-out ${className || ''} link`}>
        {children}
      </a>
    </NextLink>
  )
}

export default Link
