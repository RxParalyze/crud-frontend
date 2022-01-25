import { postService, userService } from '../../services/';

export const postsRepo = {
    getAllFromRepo,
    getByIdFromRepo,
    addPostToRepo,
    updateRepo,
    deleteFromRepo
};

async function getUser() {
    //const data = localStorage.getItem('user');
    const data = userService.userValue;
    //const dataJson = JSON.parse(data);

    return data;
}

export async function getAllFromRepo() {
    return await postService.getAll();
}

export async function getByIdFromRepo(id){
    return await postService.getById(id);
}

export async function addPostToRepo(post) {
    console.log(post);
    const user = await getUser();

    console.log(user);
    // generate new excerpt ang get AuthorId
    post.excerpt = post.content.substring(0,99).concat('...');
    post.authorId = user.id;

    // set date created and updated
    post.createdAt = new Date().toISOString();
    post.updatedAt = new Date().toISOString();

    post.published = true;

    console.log(post);

    // add and save post
    return postService.post(post);
}

export async function updateRepo(id, params) {
    const post = getByIdFromRepo(id);
    Object.assign(post, params);

    // update and save
    post.excerpt = post.content.substring(0,99).concat('...');
    post.updatedAt = new Date().toISOString();
    return postService.put(id, post);
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
async function deleteFromRepo(id) {
    // filter out deleted post and save
    const post = getByIdFromRepo(id);
    const user = getUser();

    if(post.authorId == user.id) {
        return postService._delete(id);
    }
}
