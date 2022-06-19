export interface Comment {
  postId: number
  id: number
  name: string
  body: string
}

export interface Post {
  id: number
  userId: number
  username: string
  title: string
  body: string
  comments?: Comment[]
}

export interface User {
  id: number
  username: string
}

export interface IState {
  fetchPosts: () => Promise<Post[]>
  fetchPost: (postId: number) => Promise<Post>
}

export function createState(): IState {
  let posts: { [key: number]: Post } = {};
  let postsLoaded = false;

  async function fetchPosts() {
    if (postsLoaded) {
      return Object.values(posts)
    }
    const ps = await fetchData<Post[]>('posts')
    const us = await fetchData<User[]>('users')
    const cs = await fetchData<Comment[]>('comments')
    posts = {}
    ps.forEach(p => {
      const u = us.find(u => u.id === p.userId)
      if (u) {
        p.username = u.username
      }
      const pcs = cs.filter(c => c.postId === p.id)
      p.comments = pcs
      posts[p.id] = p
    })
    postsLoaded = true
    return Object.values(posts)
  }

  async function fetchPost(postId: number) {
    const post = posts?.[postId]
    if (post) {
      return post
    }
    const p = await fetchData<Post>(`posts/${postId}`)
    const u = await fetchData<User>(`users/${p.userId}`)
    const cs = await fetchData<Comment[]>(`posts/${postId}/comments`)
    p.username = u.username
    p.comments = cs
    posts[p.id] = p
    return p
  }

  async function fetchData<T>(path: string) {
    const baseUrl = 'https://jsonplaceholder.typicode.com'
    const response = await fetch(`${baseUrl}/${path}`)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return (await response.json()) as T
  }

  return {
    fetchPosts,
    fetchPost,
  }
}
