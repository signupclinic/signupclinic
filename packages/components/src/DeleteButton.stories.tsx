import { ComponentStory } from '@storybook/react';
import DeleteButton from './DeleteButton';

export default {
  component: DeleteButton,
  title: 'DeleteButton',
};

export const Primary: ComponentStory<typeof DeleteButton> = DeleteButton.bind(
  {}
);
