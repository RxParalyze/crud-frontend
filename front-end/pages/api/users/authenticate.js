const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
import getConfig from 'next/config';

import { apiHandler } from '../../../helpers/api';
import { getAll } from '../../../services/user.service';

const { serverRuntimeConfig } = getConfig();

export default apiHandler({
    post: authenticate
});

async function authenticate(req, res) {
    const { userName, password } = req.body;
    const users = await getAll();
    var user;
    for (var x = 0; x < users.length; x++) {
        console.log(users[x].userName)
        if (users[x].userName == userName) {
            user = users[x];
        }
    }

    // validate
    if (!(user && bcrypt.compareSync(password, user.hash))) {
        throw 'Username or password is incorrect';
    }

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });

    // return basic user details and token
    return res.status(200).json({
        id: user.id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        token
    });
}
