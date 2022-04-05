import React from 'react';
import { fireEvent } from '@testing-library/react';
import Component, { Primary } from './DayRepeat.stories';
import { render } from '../utils';
import '@testing-library/jest-dom';

it('primary', async () => {
  const canvas = render(
    <Primary {...Component.args} {...(Primary.args as any)} />
  );
  await fireEvent.click(canvas.getByTestId('day-repeat-checkbox-Su'));
  await fireEvent.click(canvas.getByTestId('day-repeat-checkbox-Mo'));
  await fireEvent.click(canvas.getByTestId('day-repeat-checkbox-Su'));
  expect(await canvas.findByText('[1]')).toBeInTheDocument();
});
