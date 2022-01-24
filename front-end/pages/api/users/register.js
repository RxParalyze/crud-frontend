const bcrypt = require('bcryptjs');

import { apiHandler } from '../../../helpers/api';
import { getAll, registerUser } from '../../../services/user.service';

export default apiHandler({
    post: register
});

async function register(req, res) {
    // split out password from user details
    const { password, ...user } = req.body;
    const users = await getAll();
    console.log(user);

    // validate
    for (var x = 0; x < users.length; x++) {
        if (users[x].userName == user.userName) {
            throw `User with the username "${user.userName}" already exists`;
        }
    }

    // hash password
    user.hash = bcrypt.hashSync(password, 10);

    registerUser(user);
    return res.status(200).json({});
}
