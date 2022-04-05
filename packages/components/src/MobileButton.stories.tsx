import React from 'react';
import { ComponentStory } from '@storybook/react';
import DeleteIcon from '@mui/icons-material/Delete';
import MobileButton from './MobileButton';

export default {
  component: MobileButton,
  title: 'MobileButton',
};

export const Primary: ComponentStory<typeof MobileButton> = MobileButton.bind(
  {}
);
Primary.args = {
  open: false,
  title: 'Button',
  Icon: <DeleteIcon />,
};
