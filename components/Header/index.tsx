import Link, { LinkType } from '../Link'
import parse, { domToReact } from 'html-react-parser'
import { useReveal } from '../../hooks/useReveal'
import { useEffect } from 'react'

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
    replace: ({ attribs, tagName, children }: any) => {
      if (!attribs) return
      if (tagName === 'a') attribs.class = 'underline'
      return <>{domToReact(children)}</>
    }
  })

  useEffect(() => { setTimeout(() => setReveal(true), 1000) }, [])

  return (
    <section className="flex flex-col items-start w-full lg:flex-row">
      <div className="max-w-[8rem]">
        <h1 className={`text-lg ${revealClass}`}>{title}</h1>
      </div>
      {subtitle && (
        <div className="mt-4 max-w-[14rem] lg:mt-0 lg:ml-4">
          <h2 className={`delay-300 ${revealClass}`}>{subtitle}</h2>
          <p className={`mt-2 delay-[450ms] ${revealClass}`}>{cleanDesc}</p>
          {link && (
            <Link
              url={link.url}
              className={`mt-2 delay-[600ms] ${revealClass}`}
            >
              {link.name}
            </Link>
          )}
        </div>
      )}
      {children && (
        <div className="mt-4 lg:mt-0 lg:ml-auto">{children}</div>
      )}
    </section>
  )
}

export default Header
