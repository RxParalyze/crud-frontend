import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from '../helpers';

const { publicRuntimeConfig } = getConfig();
//TODO: FIX PUBLICRUNTIMECONFIG
const baseUrl = `${publicRuntimeConfig.localUrl}/users`;

const userApi = `${publicRuntimeConfig.apiUrl}/users`;
//const userApi = 'http://localhost:8080/api/users';
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout,
    post,
    getAll,
    getById,
    put,
    delete: _delete
};

async function login(userName, password) {
    return fetchWrapper.post(`${baseUrl}/authenticate`, { userName, password })
        .then(user => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/account/login');
}

export async function post(user) {
    console.log(user);
    return fetchWrapper.post(`${userApi}`, user);
}

export async function getAll() {
    return fetchWrapper.get(userApi);
}

export async function getById(id) {
    return fetchWrapper.get(`${userApi}/${id}`);
}

export async function put(id, params) {
    return fetchWrapper.put(`${userApi}/${id}`, params)
        .then(x => {
            // update stored user if the logged in user updated their own record
            if (id === userSubject.value.id) {
                // update local storage
                const user = { ...userSubject.value, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // publish updated user to subscribers
                userSubject.next(user);
            }
            return x;
    });
}

// prefixed with underscored because delete is a reserved word in javascript
export async function _delete(id) {
    return fetchWrapper.delete(`${userApi}/${id}`);
}
