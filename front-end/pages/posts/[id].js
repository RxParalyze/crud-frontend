import { getAllPostIds, getPostData } from '../../lib/posts'
import { getUserData } from '../../lib/users'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData, userData }) {
  return (
    <td>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <h2 className={utilStyles.h2}>by {userData.first_name}</h2>
        <div className={utilStyles.lightText}>
          published {postData.created_at}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      </article>
    </td>
  )
}

export async function getStaticPaths() {
  const paths = await getAllPostIds()
  return { paths, fallback: false }
}

export async function getStaticProps({params}) {
  const postData = await getPostData(params.id)
  const userData = await getUserData(postData.author_id)

  return {
    props: {
      postData,
      userData
    }
  }
}