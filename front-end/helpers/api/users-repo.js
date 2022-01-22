import { createUser, updateUser, deleteUser } from '../../lib/users';

const fs = require('fs');

let users = require('../../data/users.json');

export const usersRepo = {
    getAll: () => users,
    getById: id => users.find(x => x.id.toString() === id.toString()),
    find: x => users.find(x),
    create,
    update,
    delete: _delete
};

async function create(user) {
    // generate new user id
    user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;

    // set date created and updated
    user.created_at = new Date().toISOString();
    user.updated_at = new Date().toISOString();

    // add and save user
    users.push(user);
    saveData();
    await addToRepo(user);
}

async function update(id, params) {
    const user = users.find(x => x.id.toString() === id.toString());

    // set date updated
    user.updated_at = new Date().toISOString();

    // update and save
    Object.assign(user, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
async function _delete(id) {
    // filter out deleted user and save
    users = users.filter(x => x.id.toString() !== id.toString());
    saveData();

}

// private helper functions

function saveData() {
    fs.writeFileSync('data/users.json', JSON.stringify(users, null, 4));
}

async function addToRepo(user) {
    return await createUser(user);
}

async function deleteFromRepo(user) {
    return await deleteUser(user);
}

async function updateRepo(user) {
    return await updateUser(user);
}