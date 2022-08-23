import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { signIn, signOut, useSession } from 'next-auth/react'

const Home: NextPage = () => {


  const {data, status} = useSession()

  data ? console.log(data): console.log('pailis');
  
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'unauthenticated' && <button onClick={() => signIn()}>Sign In</button>}
        {status === 'authenticated' && <button onClick={() => signOut()}>Sign Out</button>}
        {data && <p>{JSON.stringify(data.user.email)}</p>}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home