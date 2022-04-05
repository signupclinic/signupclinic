import React, { useState } from 'react';
import { ComponentStory } from '@storybook/react';
import FreeSoloMultiSelect from './FreeSoloAutoComplete';

export default {
  component: FreeSoloMultiSelect,
  title: 'FreeSoloMultiSelect',
  args: { name: 'test', label: 'Test' },
};

function Wrapper({ defaultValue, ...props }: any) {
  const [value, setValue] = useState(defaultValue || []);
  return (
    <>
      <FreeSoloMultiSelect {...props} value={value} onChange={setValue} />
      <p>Value: {JSON.stringify(value)}</p>
    </>
  );
}

export const Primary = Wrapper.bind({});
