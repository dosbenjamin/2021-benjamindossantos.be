type Props = {
  children: JSX.Element | JSX.Element[]
}

const Layout = ({ children }: Props) => (
  <main className="w-screen h-screen p-2">
    {children}
  </main>
)

export default Layout