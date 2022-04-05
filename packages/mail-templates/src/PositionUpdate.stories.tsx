import { ComponentStory } from '@storybook/react';
import PositionUpdate from './PositionUpdate';
import { baseStoryArgs } from './utils';

export default {
  component: PositionUpdate,
  title: 'Mail/PositionUpdate',
};

export const Primary: ComponentStory<typeof PositionUpdate> =
  PositionUpdate.bind({});
Primary.args = {
  ...baseStoryArgs,
  message: 'How is it going',
  confirmed: true,
  lengthMinutes: 60,
  positionName: 'Position Name',
  startTime: new Date(),
  timezone: 'America/Los_Angeles',
  href: 'https://signupclinic.com',
};
