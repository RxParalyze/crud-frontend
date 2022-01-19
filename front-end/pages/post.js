import { Fragment } from 'react';
import Head from 'next/head';

import PostForm from '../components/post-form/post-form'

function CreatePostPage() {
    return (
        <Fragment>
            <Head>
                <title>Create Post</title>
                <meta name='description' content='Create and publish a new post'></meta>
            </Head>
            <PostForm />
        </Fragment>
    )
}

export default CreatePostPage;