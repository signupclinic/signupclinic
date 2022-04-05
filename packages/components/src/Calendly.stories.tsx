import { ComponentStory } from '@storybook/react';
import Calendly from './Calendly';

export default {
  component: Calendly,
  title: 'Calendly',
};

export const Primary: ComponentStory<typeof Calendly> = Calendly.bind({});
