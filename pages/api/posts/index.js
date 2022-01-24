import { apiHandler, postsRepo } from '../../../helpers/api';

export default apiHandler({
    get: getPosts
});

function getPosts(req, res) {
    const response = postsRepo.getAll().map(x => x);
    return res.status(200).json(response);
}