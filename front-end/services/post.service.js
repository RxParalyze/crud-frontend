import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';

import { fetchWrapper } from '../helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/posts`;
const postSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('post')));

export const postService = {
    post: postSubject.asObservable(),
    get postValue () { return postSubject.value },
    create,
    getAll,
    getBySlug,
    update,
    delete: _delete
};

function create(post) {
    return fetchWrapper.post(`${baseUrl}/create`, post);
}

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getBySlug(slug) {
    return fetchWrapper.get(`${baseUrl}/${slug}`);
}

function update(slug, params) {
    return fetchWrapper.put(`${baseUrl}/${slug}`, params)
        .then(x => {
            // update stored post if the logged in post updated their own record
            if (slug === postSubject.value.slug) {
                // update local storage
                const post = { ...postSubject.value, ...params };
                localStorage.setItem('post', JSON.stringify(post));

                // publish updated post to subscribers
                postSubject.next(post);
            }
            return x;
        });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(slug) {
    return fetchWrapper.delete(`${baseUrl}/${slug}`);
}
