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
    <a
      className={`inline-block text-sm ${className}`}
      href={url}
    >
      {children}
    </a>
  )
}

export default Link
