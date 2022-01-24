import { getAllPostIds, getById } from '../../services/post.service';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
  const user = getUser();

  return (
    <td>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <h2 className={utilStyles.h2}>by {user.username}</h2>
        <div className={utilStyles.lightText}>
          published {postData.createdAt}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      </article>
    </td>
  )
}

function getUser() {
  const data = localStorage.getItem('user');
  const dataJson = JSON.parse(data);

  return dataJson;
}

export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return { paths, fallback: false }
}

export async function getStaticProps({params}) {
  const postData = await getById(params.id);

  return {
    props: {
      postData
    }
  }
}