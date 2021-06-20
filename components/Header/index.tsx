import Link, { LinkType } from '../Link'
import parse, { domToReact, HTMLReactParserOptions } from 'html-react-parser'

export type HeaderType = {
  title: string
  subtitle: string
  description: string
  link?: LinkType
}

type HeaderProps = {
  children?: string | JSX.Element | JSX.Element[]
  content: HeaderType
}

const Header = ({
  children,
  content: { title, subtitle, description, link }
}: HeaderProps) => {
  const options: HTMLReactParserOptions = {
    replace: ({ attribs, tagName, children }: any) => {
      if (!attribs) return

      if (tagName === 'a') {
        attribs.class = 'underline'
      }

      return (
        <>
          {domToReact(children)}
        </>
      )
    }
  }

  return (
    <section className="flex">
      <div className="max-w-[8rem]">
        <h1 className="text-lg">{title}</h1>
      </div>
      {(subtitle) && (
        <div className="ml-4 max-w-[14rem]">
          <h2>{subtitle}</h2>
          <p className="mt-2">{parse(description, options)}</p>
          {link && (
            <Link
              url={link.url}
              className="mt-2"
            >
              {link.name}
            </Link>
          )}
        </div>
      )}
      {children && (
        <div className="ml-auto">{children}</div>
      )}
    </section>
  )
}

export default Header
