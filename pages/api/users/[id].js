const bcrypt = require('bcryptjs');

import { omit, apiHandler, getAllUsersFromRepo } from '../../../helpers/api';
import usersRepo from '../../../helpers/api/';

export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

async function getById(req, res) {
    const user = await usersRepo.getByIdFromRepo(req.query.id);

    if (!user) throw 'User Not Found';

    return res.status(200).json(omit(user, 'hash'));
}

async function update(req, res) {
    const user = await getById(req.query.id);

    if (!user) throw 'User Not Found';

    // split out password from user details
    const { password, ...params } = req.body;

    const users = await usersRepo.getAllFromRepo();

    // validate
    for (var x = 0; x < users.length; x++) {
        if (user.userName !== params.userName && users[x].userName == params.userName)
            throw `User with the userName "${params.userName}" already exists`;
    }

    // only update hashed password if entered
    if (password) {
        user.hash = bcrypt.hashSync(password, 10);
    }

    usersRepo.updateRepo(req.query.id, params);
    return res.status(200).json({});
}

function _delete(req, res) {
    usersRepo.deleteFromRepo(req.query.id);
    return res.status(200).json({});
}
