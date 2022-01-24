import { apiHandler, postsRepo } from '../../../helpers/api';

let posts = require('../../../data/posts.json')

export default apiHandler({
    post: publish
});

function publish(req, res) {
    const { ...post } = req.body;

    // validate
    if (postsRepo.find(x => x.title === post.title))
        throw `Post with the title "${post.title}" already exists`;

    postsRepo.createPost(post);
    return res.status(200).json({});
}
