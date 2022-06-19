import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PostComponent } from '../components/post';

export default {
  title: 'Components/Post',
  component: PostComponent,
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
} as ComponentMeta<typeof PostComponent>;

const Template: ComponentStory<typeof PostComponent> = (args) => <PostComponent {...args} />;

export const NoComments = Template.bind({});
NoComments.args = {
  post: {
    id: 1,
    userId: 1,
    username: 'Bret',
    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
  }
};

export const WithComments = Template.bind({});
WithComments.args = {
  post: {
    id: 1,
    userId: 1,
    username: 'Bret',
    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
    comments: [
      {
        postId: 1,
        id: 1,
        name: "id labore ex et quam laborum",
        body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
      },
      {
        postId: 1,
        id: 2,
        name: "quo vero reiciendis velit similique earum",
        body: "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
      },
    ]
  },
  alwaysShowComments: true,
};

export const WithCollapsableComments = Template.bind({});
WithCollapsableComments.args = {
  post: {
    id: 1,
    userId: 1,
    username: 'Bret',
    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
    comments: [
      {
        postId: 1,
        id: 1,
        name: "id labore ex et quam laborum",
        body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
      },
      {
        postId: 1,
        id: 2,
        name: "quo vero reiciendis velit similique earum",
        body: "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
      },
    ]
  },
};
