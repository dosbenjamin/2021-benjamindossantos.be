import '../styles/globals.css'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main className="w-screen h-screen p-2">
      <Component {...pageProps} />
    </main>
  )
}

export default App
