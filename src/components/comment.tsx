import { Comment } from "../state/main";
import { withLogging, WithLoggingProps } from "../util/withLogging";
import '../css/comment.scss'

interface CommentProps extends WithLoggingProps {
  comment: Comment
}

export const CommentComponent = withLogging(({ comment }: CommentProps) => {
  return (
    <article className="comment">
      <div className="avatar-container">
        <span className="avatar">
          {comment.name[0].toUpperCase()}
        </span>
      </div>
      <div className="body-container">
        <h4 className="name">{comment.name}</h4>
        <p className="body">{comment.body}</p>
      </div>
    </article>
  )
})
CommentComponent.displayName = 'Comment'
