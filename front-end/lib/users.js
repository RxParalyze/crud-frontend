//User Functions


const usersDir = 'http://localhost:8080/api/users'


export async function getSortedUsersData() {
    const res = await fetcher(usersDir)
    return res
  }

export async function getAllUserIds() {
    const res = await fetcher(usersDir)

    return res.map(user => {
        return {
        params: {
            id: user.id.toString()
        }
        }
    })
}

export async function getUserData(id) {
    const userUrl = usersDir.concat('/', id)
    const res = await fetcher(userUrl)
    return res
}

export async function createUser(user) {
    return await fetcher(usersDir, {
        method: 'POST',
        body: user
    }).then(response => response.json());
}

export async function updateUser(user) {
    return await fetcher(usersDir, {
        method: 'PUT',
        body: user
    }).then(response => response.json());
}

export async function deleteUser(user) {
    return await fetcher(usersDir, {
        method: 'DELETE',
        body: user
    }).then(response => response.json());
}