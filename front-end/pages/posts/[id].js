import Layout from '../../components/layout'
import { getAllPostIds, getPostData, getUserData } from '../../lib/posts'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'

const fetcher = (...args) => fetch(...args).then((res) => res.json())
const userApi = 'http://localhost:8080/users/'

export default function Post({ postData, userData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <h2 className={utilStyles.h2}>by {userData.name}</h2>
        <div className={utilStyles.lightText}>
          published {postData.createdAt}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await getAllPostIds()
  return { paths, fallback: false }
}

export async function getStaticProps({params}) {
  const postData = await getPostData(params.id)
  const userData = await getUserData(postData.authorId)

  return {
    props: {
      postData,
      userData
    }
  }
}