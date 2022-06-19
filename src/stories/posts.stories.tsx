import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router';

import { PostsPage } from '../pages/posts';
import { IState } from '../state/main';

export default {
  title: 'Pages/Posts',
  component: PostsPage,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    )
  ],
  parameters: {
    backgrounds: {
      default: 'page',
      values: [
        { name: 'page', value: '#F0F2F5' },
      ],
    },
  },
} as ComponentMeta<typeof PostsPage>;

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

const Template: ComponentStory<typeof PostsPage> = (args) => (
  <MemoryRouter>
    <PostsPage {...args} />
  </MemoryRouter>
)

export const Example = Template.bind({});
Example.args = {
  state: createMockState()
};
