import { apiHandler, postsRepo } from '../../../helpers/api';

export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

async function getById(req, res) {
    const post = await postsRepo.getByIdFromRepo(req.query.id);

    if (!post) throw 'Post Not Found';

    return res.status(200).json(post);
}

async function update(req, res) {
    const post = await getById(req.query.id);

    if (!post) throw 'Post Not Found';

    const { ...params } = req.body;

    // validate
    if (post.title !== params.title && postsRepo.getByIdFromRepo(x => x.title === params.title))
        throw `Post with the title "${params.title}" already exists`;


    postsRepo.updateRepo(req.query.id, params);
    return res.status(200).json({});
}

function _delete(req, res) {
    postsRepo.deleteFromRepo(req.query.id);
    return res.status(200).json({});
}
