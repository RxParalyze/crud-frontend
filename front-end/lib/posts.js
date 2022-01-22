
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const postsDir = 'http://localhost:8080/api/posts';

//Post Functions

export async function getAllPosts() {
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
  try {
      const response = fetcher(postsDir, {
          method: 'POST',
          body: post
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

export async function updatePost(post) {
  try {
      const postUrl = postsDir.concat('/', post.id);

      const response = await fetcher(postUrl, {
          method: 'PUT',
          body: post
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

export async function deletePost(post) {
  try {
      const postUrl = postsDir.concat('/', post.id);

      const response = await fetcher(postUrl, {
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