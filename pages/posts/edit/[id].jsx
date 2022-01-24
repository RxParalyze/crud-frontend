import { useState, useEffect } from 'react';

import { Layout, AddEdit } from '../../../components/posts';
import { Spinner } from '../../../components';
import { postService, alertService } from '../../../services';

export default Edit;

function Edit({ id }) {
    const [post, setPost] = useState(null);

    useEffect(() => {
        // fetch post and set default form values if in edit mode
        postService.getById(id)
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
        props: { id: params.id }
    }
}
