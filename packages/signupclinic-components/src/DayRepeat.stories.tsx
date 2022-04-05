import React from 'react';
import { ComponentStory } from '@storybook/react';
import DayRepeat from './DayRepeat';

export default {
  component: DayRepeat,
  title: 'DayRepeat',
  args: {},
};

function Wrapper(props) {
  const [value, setValue] = React.useState([]);
  return (
    <>
      <DayRepeat {...props} value={value} setValue={setValue} />
      {JSON.stringify(value)}
    </>
  );
}

export const Primary: ComponentStory<typeof DayRepeat> = Wrapper.bind({});
