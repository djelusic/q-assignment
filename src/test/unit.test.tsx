import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { PostComponent } from '../components/post'

test('post', async () => {
  const { asFragment } = render(
    <PostComponent post={{
      id: 1,
      userId: 1,
      username: 'User',
      title: 'Title',
      body: 'Body',
      comments: [
        {
          postId: 1,
          id: 1,
          name: 'Name',
          body: 'Body',
        },
      ],
    }} loggingPrefix="Test" />
  )
  expect(asFragment()).toMatchSnapshot()
  
  expect(screen.getByText('Show comments (1)')).toBeInTheDocument()
  expect(screen.queryByText('Hide comments')).toBeNull()
  expect(screen.queryByText('Comments')).toBeNull()

  fireEvent.click(screen.getByText('Show comments (1)'))
  expect(screen.queryByText('Show comments (1)')).toBeNull()
  expect(screen.getByText('Hide comments')).toBeInTheDocument()
  expect(screen.getByText('Comments')).toBeInTheDocument()
})
