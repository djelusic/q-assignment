import { Routes, Route, Navigate } from "react-router-dom"
import { useMemo } from "react"

import { PostsPage } from './pages/posts'
import { PostPage } from './pages/post'
import { createState, IState } from "./state/main"
import { withLogging, WithLoggingProps } from "./util/withLogging"
import './css/app.scss'


interface AppProps extends WithLoggingProps {
  state: IState
}

export const App = withLogging(({ state, loggingPrefix }: AppProps) => {
  return (
    <div className="App">
      <Routes>
        <Route path="/posts" element={<PostsPage state={state} loggingPrefix={loggingPrefix} />} />
        <Route path="/post/:id" element={<PostPage state={state} loggingPrefix={loggingPrefix} />} />
        <Route path="*" element={<Navigate to="/posts" replace />} />
      </Routes>
    </div>
  );
})
App.displayName = 'App'

export const AppWithDefaultState = withLogging(({ loggingPrefix }: WithLoggingProps) => {
  const state = useMemo(() => {
    return createState()
  }, [])
  return (
    <App state={state} loggingPrefix={loggingPrefix} />
  )
})
AppWithDefaultState.displayName = 'AppWithDefaultState'
