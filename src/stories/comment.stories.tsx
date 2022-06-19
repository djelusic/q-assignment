import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentComponent } from '../components/comment';

export default {
  title: 'Components/Comment',
  component: CommentComponent,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    )
  ],
} as ComponentMeta<typeof CommentComponent>;

const Template: ComponentStory<typeof CommentComponent> = (args) => <CommentComponent {...args} />;

export const Example = Template.bind({});
Example.args = {
  comment: {
    postId: 1,
    id: 1,
    name: "id labore ex et quam laborum",
    body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
  }
};
