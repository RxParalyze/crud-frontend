import { apiHandler, usersRepo } from '../../../helpers/api';

export default apiHandler({
    post: register
});

async function register(req, res) {
    // split out password from user details
    const { password, ...user } = req.body;
    const users = await usersRepo.getAllFromRepo();
    console.log(user);

    // validate
    for (var x = 0; x < users.length; x++) {
        if (users[x].userName == user.userName) {
            throw `User with the username "${user.userName}" already exists`;
        }
    }

    usersRepo.registerToRepo(user);
    return res.status(200).json({});
}
