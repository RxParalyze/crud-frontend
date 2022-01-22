
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const usersDir = 'http://localhost:8080/api/users';

//User Functions

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
    try {
        const response = fetcher(usersDir, {
            method: 'POST',
            body: user
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    }
    catch(err) {
        console.log(err);
    }
}

export async function updateUser(user) {
    try {
        const userUrl = usersDir.concat('/', user.id);

        const response = await fetcher(userUrl, {
            method: 'PUT',
            body: user
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    }
    catch(err) {
        console.log(err);
    }
}

export async function deleteUser(user) {
    try {
        const userUrl = usersDir.concat('/', user.id);

        const response = await fetcher(userUrl, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    }
    catch(err) {
        console.log(err);
    }
}