import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';

import { fetchWrapper } from '../helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = 'http://localhost:8080/api/posts';
const postSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('post')));

export const postService = {
    post: postSubject.asObservable(),
    get postValue () { return postSubject.value },
    publish,
    getAll,
    getById,
    update,
    delete: _delete
};

function publish(post) {
    return fetchWrapper.post(`${baseUrl}`, post);
}

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(x => {
            // update local storage
            const post = { ...postSubject.value, ...params };
            localStorage.setItem('post', JSON.stringify(post));

            // publish updated post to subscribers
            postSubject.next(post);
            return x;
        });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
