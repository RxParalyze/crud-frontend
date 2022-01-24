import { register, update, _delete } from '../../services/user.service';


let users = require('../../data/users.json');

export const usersRepo = {
    getAll: () => users,
    getById: id => users.find(x => x.id.toString() === id.toString()),
    find: x => users.find(x),
    registerUser,
    updateUser,
    deleteUser
};

function getDate(){
    new Date().toISOString();
}

export async function registerUser(user) {
    // generate new user id
    user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;

    // set date created and updated
    user.createdAt = getDate();
    user.updatedAt = getDate();

    console.log(user);

    // add and save user
    users.push(user);
    return register(user);
}

export async function updateUser(id, params) {
    const user = users.find(x => x.id.toString() === id.toString());

    // set date updated
    user.updatedAt = getDate();

    // update and save
    Object.assign(user, params);
    return update(user.id, params);
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
export async function deleteUser(id) {

    // filter out deleted user and save
    users = users.filter(x => x.id.toString() !== id.toString());
    return _delete(id);
}