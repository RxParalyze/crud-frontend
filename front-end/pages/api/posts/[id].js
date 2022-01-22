import { apiHandler, postsRepo } from '../../../helpers/api';

export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

function getById(req, res) {
    const post = postsRepo.getById(req.query.id);

    if (!post) throw 'Post Not Found';

    return res.status(200).json(post);
}

function update(req, res) {
    const post = postsRepo.getById(req.query.id);

    if (!post) throw 'Post Not Found';

    const { ...params } = req.body;

    // validate
    if (post.title !== params.title && postsRepo.find(x => x.title === params.title))
        throw `Post with the title "${params.title}" already exists`;


    postsRepo.update(req.query.id, params);
    return res.status(200).json({});
}

function _delete(req, res) {
    postsRepo.delete(req.query.id);
    return res.status(200).json({});
}
