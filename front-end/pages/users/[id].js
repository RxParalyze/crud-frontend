import Layout from '../../components/layout'
import { getAllUserIds, getUserData, getUserPostIds, getUserPostData } from '../../lib/posts'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'

export default function User({ userData, postData }) {
  return (
    <Layout>
      <Head>
        <title>{userData.username}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{userData.username}</h1>
        <h2 className={utilStyles.headingXl}>{userData.name}</h2>
        <div className={utilStyles.lightText}>
          {userData.createdAt}
        </div>
        <ul className={utilStyles.list}>
          {postData.map(({ id, createdAt, title}) => (
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
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const userPaths = await getAllUserIds()
  const postPaths = await getUserPostIds()
  return { userPaths, postPaths, fallback: false }
}

export async function getStaticProps({params}) {
  const userData = await getUserData(params.id)
  const postData = await getUserPostData(params.id)

  return {
    props: {
      userData,
      postData
    }
  }
}