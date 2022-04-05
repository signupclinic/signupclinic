import { ComponentStory } from '@storybook/react';
import Copyright from './Copyright';

export default {
  component: Copyright,
  title: 'Copyright',
};

export const Primary: ComponentStory<typeof Copyright> = Copyright.bind({});
Primary.args = {
  href: '/',
  name: 'Go town',
};
