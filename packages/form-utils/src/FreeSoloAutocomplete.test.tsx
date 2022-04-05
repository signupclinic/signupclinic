import React, { useState } from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Component, { Primary } from './FreeSoloAutoComplete.stories';
import '@testing-library/jest-dom';

async function testInput(input, defaultValue = []) {
  const canvas = render(
    <Primary
      {...Component.args}
      {...Primary.args}
      defaultValue={defaultValue}
    />
  );
  await userEvent.click(canvas.getByTestId('test-input'));
  await userEvent.keyboard(input);
  await waitFor(() => expect(canvas.getByText(/"a","b"/)).toBeInTheDocument());
}

it('splits on space', async () => {
  await testInput('a b c');
});
it('splits on comma', async () => {
  await testInput('a,b,c ');
});
it('removes white space', async () => {
  await testInput('a, b,c ');
});
