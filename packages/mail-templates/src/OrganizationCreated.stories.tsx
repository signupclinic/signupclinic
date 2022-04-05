import { ComponentStory } from '@storybook/react';
import OrganizationCreated from './OrganizationCreated';
import { baseStoryArgs } from './utils';

export default {
  component: OrganizationCreated,
  title: 'Mail/OrganizationCreated',
};

export const Primary: ComponentStory<typeof OrganizationCreated> =
  OrganizationCreated.bind({});
Primary.args = {
  ...baseStoryArgs,
  displayName: 'New Organization',
  name: 'org',
  ownerEmail: 'jacobclarke718@gmail.com',
  firstName: 'Jacob',
  href: 'https://signupclinic.com',
};
