
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const postsDir = 'http://localhost:8080/api/posts'
const usersDir = 'http://localhost:8080/api/users'

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

//Post Functions

export async function getSortedPostsData() {
  const res = await fetcher(postsDir)
  return res
}

export async function getAllPostIds() {
  const res = await fetcher(postsDir)

  return res.map(post => {
    return {
      params: {
        id: post.id.toString()
      }
    }
  })
}

export async function getPostData(id) {
  const postUrl = postsDir.concat('/', id)
  const res = await fetcher(postUrl)
  return res
}

export async function getUserPostIds() {
  const res = await getAllPostIds()

}

export async function getUserPostData(id) {
  const postUrl = postsDir.concat('/', id)
  const res = await fetcher(postUrl)
  return res
}

export async function createPost(post) {
  return await fetcher(postUrl, post);
}