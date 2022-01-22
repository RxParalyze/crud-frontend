
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const postsDir = 'http://localhost:8080/api/posts'

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


export async function createPost(post) {
  return await fetcher(postDir, {
    method: 'POST',
    body: post
  }).then(response => response.json());
}

export async function updatePost(post) {
  return await fetcher(postDir, {
    method: 'PUT',
    body: post
  }).then(response => response.json());
}

export async function deletePost(post) {
  return await fetcher(postDir, {
    method: 'DELETE',
    body: post
  }).then(response => response.json());
}