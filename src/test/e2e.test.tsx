import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { MemoryRouter } from 'react-router'
import { render, waitFor, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom'
import { AppWithDefaultState } from '../App'

const apiBaseURL = `https://jsonplaceholder.typicode.com`

const server = setupServer(
  rest.get(`${apiBaseURL}/posts`, (req, res, ctx) => {
    return res(ctx.json([
      {
        id: 1,
        userId: 1,
        title: 'Title1',
        body: 'Body1',
      },
    ]))
  }),
  rest.get(`${apiBaseURL}/users`, (req, res, ctx) => {
    return res(ctx.json([
      {
        id: 1,
        username: 'User1',
      },
    ]))
  }),
  rest.get(`${apiBaseURL}/comments`, (req, res, ctx) => {
    return res(ctx.json([
      {
        postId: 1,
        id: 1,
        name: 'Name1',
        body: 'Body1',
      },
    ]))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function App() {
  const history = createMemoryHistory()
  return (
    <MemoryRouter>
      <AppWithDefaultState loggingPrefix={'Test'} />
    </MemoryRouter>
  )
}

test('happy path', async () => {
  const { container } = render(<App />)
  await waitFor(() => screen.getByText('Posts'))

  const posts = container.getElementsByClassName('post')
  expect(posts.length).toBe(1)
  expect(posts[0]).toHaveTextContent('Title1')
  expect(posts[0]).toHaveTextContent('Body1')
  expect(posts[0]).toHaveTextContent('User1')
  expect(posts[0]).toHaveTextContent('Show comments (1)')

  // userEvent.click(screen.getByText('Body1'))
  // await waitFor(() => screen.getByText('Post'))
  // expect(screen.getByText('Comments')).toReturn()
})

test('server error', async () => {
  server.use(
    rest.get(`${apiBaseURL}/posts`, (req, res, ctx) => {
      return res(ctx.status(502, 'bad gateway'))
    }),
  )
  render(<App />)
  await waitFor(() => screen.getByText('Error', { exact: false }))
  expect(screen.getByText('Error', { exact: false })).toHaveTextContent('bad gateway')
})
