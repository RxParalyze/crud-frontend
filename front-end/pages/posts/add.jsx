import { Layout, AddEdit } from '../../components/posts';

export default Add;

function Add() {
    return (
        <Layout>
            <h1>Add Post</h1>
            <AddEdit />
        </Layout>
    );
}