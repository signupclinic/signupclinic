import React from 'react';
import { ComponentStory } from '@storybook/react';
import useClinicForm from './useClinicForm';

export default {
  component: useClinicForm,
  title: 'useClinicForm',
  args: {
    clinicTypeOptions: [
      { label: 'Heart Health', value: '1' },
      { label: 'Vision Clinic', value: '1' },
    ],
    onSubmit: console.dir,
    positionTypeOptions: [
      {
        _id: 'clinical',
        name: 'Screener',
        hasLottery: false,
      },
    ],
  },
};

function Wrapper(props: Parameters<typeof useClinicForm>[0]) {
  const [defaultValues, setDefaultValues] = React.useState({
    startTime: '2020-01-01T00:00',
    positions: [{ positionTypeId: 'clinical', limit: 3 }],
  });
  const { Form } = useClinicForm({
    defaultValues,
    ...props,
  });
  return Form;
}

export const Primary: ComponentStory<typeof Wrapper> = Wrapper.bind({});
