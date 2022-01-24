import { getById, getAll, register, update, _delete } from '../../services/user.service';
const bcrypt = require('bcryptjs');

let users = getAll();

export const usersRepo = {
    getAll: () => users,
    getById: id => getById(id),
    find: x => users.find(x),
    registerUser,
    updateUser,
    deleteUser
};

function getUser() {
    const data = localStorage.getItem('user');
    const dataJson = JSON.parse(data);

    return dataJson;
}

export async function registerUser(user) {
    // generate new user id
    user.id = await getAll().length + 1;

    // set date created and updated
    user.createdAt = new Date().toISOString();
    user.updatedAt = new Date().toISOString();
    user.hash = bcrypt.hashSync(user.password, 10);


    console.log(user);

    // add and save user
    return register(user);
}

export async function updateUser(id, params) {
    const user = getById(id);
    Object.assign(user, params);

    // update and save
    user.updatedAt = new Date().toISOString();
    return update(user.id, params);
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
export async function deleteUser(id) {
    const user = getById(id);
    const loggedUser = getUser();

    if(user.id == loggedUser.id) {
        return _delete(id);
    }
}