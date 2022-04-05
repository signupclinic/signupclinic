import React from 'react';
import Component, { Primary, OpenWithLottery } from './Position.stories';
import { render } from '../../utils';
import { Titles } from './PositionButton';
import '@testing-library/jest-dom';

it('primary', async () => {
  const canvas = render(
    <Component.component {...Component.args} {...Primary.args} />
  );
  expect(canvas.getByText(/1\/3/)).toBeInTheDocument();
  expect(canvas.getByText(/Jacob Clarke/)).toBeInTheDocument();
  expect(canvas.getByLabelText(Titles.OPEN)).toBeInTheDocument();
});

it('open with lottery', async () => {
  const canvas = render(
    <Component.component {...Component.args} {...OpenWithLottery.args} />
  );
  expect(canvas.getByText(/-\/3/)).toBeInTheDocument();
  expect(canvas.getByLabelText(Titles.HAS_LOTTERY_OPEN)).toBeInTheDocument();
});
