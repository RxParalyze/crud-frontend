import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
//import Link from 'next/link'
import { userService } from '../services';
import { Link } from '../components';



export async function getStaticProps() {
  const allPostsData = await getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Semper Supra!</p>
      </section>
      <div className="p-4">
          <div className="container">
              <h1>Hi {userService.userValue?.firstName}!</h1>
              <p>You&apos;re logged in with Next.js & JWT!!</p>
              <p><Link href="/users">Manage Users</Link></p>
          </div>
      </div>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, createdAt, title}) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <a>{createdAt}</a>
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}