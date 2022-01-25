import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';
import { userService, postService } from '../../services/';

export default function Post({ postData, userData }) {

  return (
    <td>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <h2 className={utilStyles.h2}>by {userData.userName}</h2>
        <div className={utilStyles.lightText}>
          published {postData.createdAt}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      </article>
    </td>
  )
}

//

export async function getStaticPaths() {
  const paths = await postService.getAllIds();
  return { paths, fallback: false }
}

export async function getStaticProps({params}) {
  const postData = await postService.getById(params.id);
  const userData = await userService.getById(postData.authorId);

  //console.log(userData);
  return {
    props: {
      postData,
      userData
    }
  }
}