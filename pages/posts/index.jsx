import { useState, useEffect } from 'react';

import { Link, Spinner } from '../../components';
import { Layout } from '../../components/posts';
import { postService } from '../../services';

export default Index;

function Index() {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        postService.getAll().then(x => setPosts(x));
    }, []);

    function deletePost(id) {
        setPosts(posts.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        postService.delete(id).then(() => {
            setPosts(posts => posts.filter(x => x.id !== id));
        });
    }

    return (
        <Layout>
            <h1>Posts</h1>
            <Link href="/posts/add" className="btn btn-sm btn-success mb-2">Add Post</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '50%' }}>Title</th>
                        <th style={{ width: '100%' }}>Content</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {posts && posts.map(post =>
                        <tr key={post.id}>
                            <td>
                                <Link href={`/posts/${post.id}`} className="btn btn-sm btn-primary mr-2">
                                    {post.title}
                                </Link>
                            </td>
                            <td>{post.excerpt}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/posts/edit/${post.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deletePost(post.id)} className="btn btn-sm btn-danger btn-delete-post" disabled={post.isDeleting}>
                                    {post.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!posts &&
                        <tr>
                            <td colSpan="4">
                                <Spinner />
                            </td>
                        </tr>
                    }
                    {posts && !posts.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Posts To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </Layout>
    );
}
