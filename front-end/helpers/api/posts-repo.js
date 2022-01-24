import { publish, updatePost, _delete } from '../../services/post.service';

let posts = require('../../data/posts.json');

export const postsRepo = {
    getAll: () => posts,
    getById: id => posts.find(x => x.id.toString() === id.toString()),
    find: x => posts.find(x),
    createPost,
    editPost,
    deletePost
};

function getDate(){
    return new Date().toISOString();
}

function getUser() {
    const data = localStorage.getItem('user');
    const dataJson = JSON.parse(data);

    return dataJson;
}

export async function createPost(post) {
    // generate new post id and excerpt
    const user = getUser();

    post.id = posts.length ? Math.max(...posts.map(x => x.id)) + 1 : 1;
    post.excerpt = post.content.substring(0,99).concat('...');
    post.authorId = user.id;

    // set date created and updated
    post.createdAt = getDate();
    post.updatedAt = getDate();

    post.published = true;

    console.log(post);

    // add and save post
    posts.push(post);
    return publish(post);
}

export async function editPost(id, params) {
    const post = posts.find(x => x.id.toString() === id.toString());

    // set date updated
    post.updatedAt = getDate();

    // update and save
    Object.assign(post, params);
    post.excerpt = post.content.substring(0,99).concat('...');
    return updatePost(id, post);
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
async function deletePost(id) {
    // filter out deleted post and save
    const post = posts.find(x => x.id.toString() === id.toString());

    if(post.authorId == user.id) {
        posts = posts.filter(x => x.id.toString() !== id.toString());
        return _delete(id);
    }
}
