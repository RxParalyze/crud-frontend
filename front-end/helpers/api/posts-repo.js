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

function create(post) {
    // generate new post id and excerpt
    post.id = posts.length ? Math.max(...posts.map(x => x.id)) + 1 : 1;
    post.excerpt = post.content.substring(0,99).concat('...');

    // set date created and updated
    post.dateCreated = new Date().toISOString();
    post.dateUpdated = new Date().toISOString();

    // add and save post
    posts.push(post);
    saveData();
}

function update(id, params) {
    const post = posts.find(x => x.id.toString() === id.toString());
    post.excerpt = post.content.substring(0,99).concat('...');

    // set date updated
    post.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(post, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
    // filter out deleted post and save
    posts = posts.filter(x => x.id.toString() !== id.toString());
    saveData();

}

// private helper functions

function saveData() {
    fs.writeFileSync('data/posts.json', JSON.stringify(posts, null, 4));
}