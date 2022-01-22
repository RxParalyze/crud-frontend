import { createPost, updatePost, deletePost } from '../../lib/posts';

const fs = require('fs');

let posts = require('../../data/posts.json');

export const postsRepo = {
    getAll: () => posts,
    getById: id => posts.find(x => x.id.toString() === id.toString()),
    find: x => posts.find(x),
    create,
    update,
    delete: _delete
};

async function create(post, user) {
    // generate new post id and excerpt
    post.id = posts.length ? Math.max(...posts.map(x => x.id)) + 1 : 1;
    post.excerpt = post.content.substring(0,99).concat('...');
    post.author_id = user.id;

    // set date created and updated
    post.created_at = new Date().toISOString();
    post.updated_at = new Date().toISOString();

    // add and save post
    posts.push(post);
    saveData();
    await addToRepo(post);
}

async function update(id, params, user) {
    const post = posts.find(x => x.id.toString() === id.toString());
    if(post.author_id == user.id) {
        post.excerpt = post.content.substring(0,99).concat('...');

        // set date updated
        post.updated_at = new Date().toISOString();

        // update and save
        Object.assign(post, params);
        saveData();
        await updateRepo(post);
    }
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
async function _delete(id, user) {
    // filter out deleted post and save
    const post = posts.find(x => x.id.toString() === id.toString());

    if(post.author_id == user.id) {
        posts = posts.filter(x => x.id.toString() !== id.toString());
        saveData();
        await deleteFromRepo(post);
    }
}

// private helper functions

function saveData() {
    fs.writeFileSync('data/posts.json', JSON.stringify(posts, null, 4));
}

async function addToRepo(post) {
    return await createPost(post);
}

async function deleteFromRepo(post) {
    return await deletePost(post);
}

async function updateRepo(post) {
    return await updatePost(post);
}