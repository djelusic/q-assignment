import { useCallback } from "react";
import { useParams } from "react-router";

import { IState, Post } from "../state/main";
import { PostComponent } from "../components/post"
import { Loader } from "../util/loader"
import { withLogging, WithLoggingProps } from "../util/withLogging";

interface PostPageComponentProps extends WithLoggingProps {
  data: Post
}

const PostPageComponent = withLogging(({ data, loggingPrefix }: PostPageComponentProps) => {
  return (
    <>
      <h2>Post</h2>
      <PostComponent
        post={data}
        alwaysShowComments
        loggingPrefix={loggingPrefix}
      />
    </>
  )
})
PostPageComponent.displayName = 'PostPageComponent'

interface PostPageProps extends WithLoggingProps {
  state: IState
}

export const PostPage = withLogging(({ state, loggingPrefix }: PostPageProps) => {
  const { id } = useParams()
  const fetcher = useCallback(() => {
    return state.fetchPost(parseInt(id ?? '0'))
  }, [id, state.fetchPost])
  return (
    <Loader
      fetcher={fetcher}
      render={(data => <PostPageComponent data={data} loggingPrefix={loggingPrefix} />)}
    />
  )
})
PostPage.displayName = 'PostPage'
