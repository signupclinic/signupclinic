import { render, fireEvent } from '@testing-library/react';
import { Primary } from './DeleteButton.stories';

it('allows me to click', async () => {
  const canvas = render(<Primary {...(Primary.args as any)} />);
  await fireEvent.click(canvas.getByTestId('deleteicon'));
});
