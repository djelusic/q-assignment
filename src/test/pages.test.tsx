import { render, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { PostsPage } from '../pages/posts'
import { PostPage } from '../pages/post'
import { IState } from '../state/main'
import { MemoryRouter } from 'react-router'

function createMockState(): IState {
  return {
    fetchPosts: async () => {
      return [
        {
          id: 1,
          userId: 1,
          username: 'User1',
          title: 'Title1',
          body: 'Body1',
          comments: [
            {
              postId: 1,
              id: 1,
              name: 'Name1',
              body: 'Body1',
            },
          ],
        },
        {
          id: 2,
          userId: 1,
          username: 'User1',
          title: 'Title2',
          body: 'Body2',
        },
      ]
    },
    fetchPost: async (postId: number) => {
      return {
        id: 1,
        userId: 1,
        username: 'User1',
        title: 'Title1',
        body: 'Body1',
        comments: [
          {
            postId: 1,
            id: 1,
            name: 'Name1',
            body: 'Body1',
          },
        ],
      }
    }
  }
}

test('posts', async () => {
  const { container } = render(
    <MemoryRouter>
      <PostsPage state={createMockState()} loggingPrefix={'Test'} />
    </MemoryRouter>
  )
  await waitFor(() => screen.getByText('Posts'))
  const posts = container.getElementsByClassName('post')
  expect(posts.length).toBe(2)

  expect(posts[0]).toHaveTextContent('Title1')
  expect(posts[0]).toHaveTextContent('Body1')
  expect(posts[0]).toHaveTextContent('User1')
  expect(posts[0]).toHaveTextContent('Show comments (1)')

  expect(posts[1]).toHaveTextContent('Title2')
  expect(posts[1]).toHaveTextContent('Body2')
  expect(posts[1]).toHaveTextContent('User1')
  expect(posts[1]).not.toHaveTextContent('Show comments (1)')
})

test('post', async () => {
  const { container } = render(
    <MemoryRouter>
      <PostPage state={createMockState()} loggingPrefix={'Test'} />
    </MemoryRouter>
  )
  await waitFor(() => screen.getByText('Post'))
  const posts = container.getElementsByClassName('post')
  expect(posts.length).toBe(1)

  expect(posts[0]).toHaveTextContent('Title1')
  expect(posts[0]).toHaveTextContent('Body1')
  expect(posts[0]).toHaveTextContent('User1')
  expect(posts[0]).not.toHaveTextContent('Show comments (1)')
  expect(posts[0]).toHaveTextContent('Comments')

  const comments = posts[0].getElementsByClassName('comment')
  expect(comments.length).toBe(1)
})
