import { ComponentStory } from '@storybook/react';
import ConfirmationDialog from './ConfirmationDialog';

export default {
  component: ConfirmationDialog,
  title: 'ConfirmationDialog',
};

export const Primary: ComponentStory<typeof ConfirmationDialog> =
  ConfirmationDialog.bind({});

Primary.args = {
  open: true,
  onClose: () => {},
  onConfirm: () => {},
  message: 'Here is my message',
};
