import Navbar from '../components/navbar'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import UsersProvider from '../contexts/usersContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UsersProvider>
      <div className='bg-white min-h-screen'>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </UsersProvider>
  )
}

export default MyApp
