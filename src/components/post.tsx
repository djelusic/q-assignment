import { useCallback, useState } from 'react'

import { Post } from '../state/main'
import { withLogging, WithLoggingProps } from '../util/withLogging'
import { CommentComponent } from './comment'
import '../css/post.scss'

interface PostProps extends WithLoggingProps {
  post: Post
  alwaysShowComments?: boolean
  onPostClick?: () => void
}

export const PostComponent = withLogging(({ post, alwaysShowComments, onPostClick, loggingPrefix }: PostProps) => {
  const [showComments, setShowComments] = useState(false)
  const toggleShowComments = useCallback(() => {
    setShowComments(!showComments);
  }, [showComments])

  const hasComments = post.comments?.length ?? 0 > 0
  return (
    <article className="post">
      <div onClick={() => onPostClick?.()}>
        <div className="user">
          <span className="avatar">
            {post.username[0].toUpperCase()}
          </span>
          <span className="username">{post.username}</span>
        </div>
        <h4 className="title">{post.title}</h4>
        <p className="body">{post.body}</p>
      </div>
      { hasComments && !alwaysShowComments ?
        <div className="comments-button" onClick={toggleShowComments}>
          {showComments ? 'Hide comments' : `Show comments (${post.comments?.length})`}
        </div>
        : null}
      { hasComments && (showComments || alwaysShowComments) ?
        <div className="comments">
          <h4>Comments</h4>
          {post.comments?.map(comment => {
            return (
              <CommentComponent
                key={comment.id}
                comment={comment}
                loggingPrefix={loggingPrefix}
              />
            )
          })}
        </div> : null
      }
    </article>
  )
})
PostComponent.displayName = 'Post'
