import parse, { domToReact } from 'html-react-parser'
import { useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import Link, { LinkType } from './Link'

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
  const { setReveal, revealClass } = useReveal()

  const cleanDesc = parse(description, {
    replace: ({ children }: any) => {
      if (children && children[1]?.type === 'tag') {
        const [, link] = children
        link.attribs.class = link.tagName && 'inline-block duration-1000 ease-out link'
        link.attribs.target = link.tagName && '_blank'
        link.attribs.rel = link.tagName && 'noopener noreferer'
      }
      return <>{domToReact(children)}</>
    }
  })

  useEffect(() => {
    setTimeout(
      () => setReveal(true),
      500
    )
  }, [])

  return (
    <section className="flex flex-col items-start w-full space-y-4 lg:space-y-0 lg:flex-row">
      <div className="max-w-[8rem]">
        <h1 className={`text-lg ${revealClass}`}>{title}</h1>
      </div>
      {subtitle && (
        <div className="max-w-[14rem] space-y-2 lg:ml-4">
          <h2
            className={`delay-300 ${revealClass}`}
            style={{transitionDelay: '300ms'}}
          >
            {subtitle}
          </h2>
          <p
            className={revealClass}
            style={{transitionDelay: '450ms'}}
          >
            {cleanDesc}
          </p>
          {link && (
            <div
              className={revealClass}
              style={{transitionDelay: '600ms'}}
            >
              <Link url={link.url}>
                {link.name}
              </Link>
            </div>
          )}
        </div>
      )}
      {children && (
        <div className="lg:ml-auto">{children}</div>
      )}
    </section>
  )
}

export default Header
