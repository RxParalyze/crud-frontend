import { getAll, getById, publish, updatePost, _delete } from '../../services/post.service';

let posts = getAll();

export const postsRepo = {
    getAll: () => posts,
    getById: id => getById(id),
    find: x => posts.find(x),
    createPost,
    editPost,
    deletePost
};

function getUser() {
    const data = localStorage.getItem('user');
    const dataJson = JSON.parse(data);

    return dataJson;
}

export async function createPost(post) {
    // generate new post id and excerpt
    const user = getUser();

    //post.id = await getAll().length + 1;
    post.excerpt = post.content.substring(0,99).concat('...');
    post.authorId = user.id;

    // set date created and updated
    post.createdAt = new Date().toISOString();
    post.updatedAt = new Date().toISOString();

    post.published = true;

    console.log(post);

    // add and save post
    return publish(post);
}

export async function editPost(id, params) {
    const post = getById(id);
    Object.assign(post, params);

    // update and save
    post.excerpt = post.content.substring(0,99).concat('...');
    post.updatedAt = new Date().toISOString();
    return updatePost(id, post);
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
async function deletePost(id) {
    // filter out deleted post and save
    const post = getById(id);
    const user = getUser();

    if(post.authorId == user.id) {
        return _delete(id);
    }
}
