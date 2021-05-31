export type LinkType = {
  name: string
  url: string
}

type LinkProps = Omit<LinkType, 'name'> & {
  children: LinkType['name'] | JSX.Element
}

const Link = ({ children, url }: LinkProps) => {
  return (
    <a className="text-sm" href={url}>{children}</a>
  )
}

export default Link
