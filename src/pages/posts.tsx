import React, { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Loader } from "../util/loader"
import { IState, Post } from "../state/main"
import { PostComponent } from "../components/post"
import { withLogging, WithLoggingProps } from "../util/withLogging"
import "../css/posts.scss"

function useSearch(posts: Post[]) {
  const [searchInput, setSearchInput] = useState('')
  const postsFiltered = posts.filter(post => {
    return post.username.toLowerCase().startsWith(searchInput)
  })
  const onSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }, [])
  return {
    posts: postsFiltered,
    searchInput,
    onSearchInputChange,
  }
}

interface PostsProps extends WithLoggingProps {
  data: Post[]
}

const Posts = withLogging(({ data, loggingPrefix }: PostsProps) => {
  const navigate = useNavigate()
  const { posts, searchInput, onSearchInputChange } = useSearch(data)
  return (
    <section className="posts">
      <div className="header">
        <h2>Posts</h2>
        <input
          className="search-input"
          type="text"
          placeholder="Search posts..."
          value={searchInput}
          onChange={onSearchInputChange}
        />
      </div>
      { posts.map(post => {
        return <PostComponent
          key={post.id}
          post={post}
          onPostClick={() => navigate(`/post/${post.id}`)}
          loggingPrefix={loggingPrefix}
        />
      })}
    </section>
  )
})
Posts.displayName = 'Posts'

interface PostsPageProps extends WithLoggingProps {
  state: IState
}

export const PostsPage = withLogging(({ state, loggingPrefix }: PostsPageProps) => {
  return (
    <Loader
      fetcher={state.fetchPosts}
      render={data => <Posts data={data} loggingPrefix={loggingPrefix} />}
    />
  )
})
PostsPage.displayName = 'PostsPage'
