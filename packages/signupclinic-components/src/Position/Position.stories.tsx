import React from 'react';
import { ComponentStory } from '@storybook/react';
import { execPath } from 'process';
import Position from './Position';
import { SignupStatus } from './utils';
import { Titles } from './PositionButton';

export default {
  component: Position,
  title: 'Position',
  args: {
    name: 'Position',
    limit: 3,
    signupStatus: SignupStatus.Open,
    isModifiable: true,
    hasLottery: true,
    students: [{ fullName: 'Jacob Clarke', email: 'jacobclarek718@gmail.com' }],
  },
};

export const Primary: Partial<ComponentStory<typeof Position>> = {
  args: {
    hasLottery: false,
  },
};

export const OpenWithLottery: Partial<ComponentStory<typeof Position>> = {
  args: {
    signupStatus: SignupStatus.Open,
    hasLottery: true,
  },
};

export const WithTrainings: Partial<ComponentStory<typeof Position>> = {
  args: { trainings: ['Test'] },
};

export const WithoutTrainings: Partial<ComponentStory<typeof Position>> = {};
