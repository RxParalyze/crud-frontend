import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';

import { fetchWrapper } from '../helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/posts`;
const postApi = 'http://localhost:8080/api/posts';
const postSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('post')));

export const postService = {
    post: postSubject.asObservable(),
    get postValue () { return postSubject.value },
    publish,
    getAll,
    getAllPostIds,
    getById,
    updatePost,
    delete: _delete
};

export async function publish(post) {
    return fetchWrapper.post(`${postApi}`, post);
}

export async function getAll() {
    return fetchWrapper.get(postApi);
}

export async function getAllPostIds() {
    const res = await fetchWrapper.get(postApi);
    return res.map(post => {
        return {
          params: {
            id: post.id.toString()
          }
        }
    })
}

export async function getById(id) {
    return fetchWrapper.get(`${postApi}/${id}`);
}

export async function updatePost(id, params) {
    return fetchWrapper.put(`${postApi}/${id}`, params)
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
export async function _delete(id) {
    return fetchWrapper.delete(`${postApi}/${id}`);
}
