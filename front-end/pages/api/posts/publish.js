import { apiHandler, postsRepo } from '../../../helpers/api';

export default apiHandler({
    post: publish
});

function publish(req, res) {
    const { ...post } = req.body;

    // validate
    if (postsRepo.find(x => x.title === post.title))
        throw `Post with the title "${post.title}" already exists`;

    postsRepo.create(post);
    return res.status(200).json({});
}