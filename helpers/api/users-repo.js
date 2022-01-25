import { userService } from '../../services/';
const bcrypt = require('bcryptjs');

export const usersRepo = {
    getAllFromRepo,
    getByIdFromRepo,
    registerToRepo,
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
    return await getAll();
}

export async function getByIdFromRepo(id){
    return await userService.getById(id);
}

export async function registerToRepo(user) {
    // generate new user id
    //user.id = await userService.getAll().length + 1;

    // set date created and updated
    user.createdAt = new Date().toISOString();
    user.updatedAt = new Date().toISOString();
    user.hash = bcrypt.hashSync(user.password, 10);
    delete user.password;

    console.log(user);

    // add and save user
    return await userService.post(user);
}

export async function updateRepo(id, params) {
    const user = await getByIdFromRepo(id);
    Object.assign(user, params);

    // update and save
    user.updatedAt = new Date().toISOString();
    return userService.put(user.id, params);
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
async function deleteFromRepo(id) {
    const user = getByIdFromRepo(id);
    const loggedUser = getUser();

    if(user.id == loggedUser.id) {
        return userService.delete(id);
    }
}