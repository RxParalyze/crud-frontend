import { useState, useEffect } from 'react';

import { Layout, AddEdit } from '../../../components/posts';
import { Spinner } from '../../../components';
import { postService, alertService } from '../../../services';

export default Edit;

function Edit({ slug }) {
    const [post, setPost] = useState(null);

    useEffect(() => {
        // fetch post and set default form values if in edit mode
        postService.getBySlug(slug)
            .then(x => setPost(x))
            .catch(alertService.error)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout>
            <h1>Edit Post</h1>
            {post ? <AddEdit post={post} /> : <Spinner /> }
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    return {
        props: { slug: params.slug }
    }
}
