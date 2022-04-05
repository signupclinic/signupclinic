import { ComponentStory } from '@storybook/react';
import ClinicReminder from './ClinicReminder';
import { baseStoryArgs } from './utils';

export default {
  component: ClinicReminder,
  title: 'Mail/ClinicReminder',
};

export const Primary: ComponentStory<typeof ClinicReminder> =
  ClinicReminder.bind({});
Primary.args = {
  ...baseStoryArgs,
  message: 'How is it going',
  clinics: [
    {
      lengthMinutes: 60,
      name: 'Clinic 1',
      startTime: new Date(),
    },
  ],
};
