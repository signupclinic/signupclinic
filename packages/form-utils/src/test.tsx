import React from 'react';
import {
  screen,
  render,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';

export function testForm(
  Form: React.ComponentType<{ onSubmit: (data: any) => void }>
) {
  const mockSubmit = jest.fn();
  render(<Form onSubmit={mockSubmit} />);
  const testSubmit = async (data, { label = 'submit' } = {}) => {
    fireEvent.click(screen.getByText(new RegExp(label, 'i')));
    await waitFor(() => {
      expect(mockSubmit).lastCalledWith(data, expect.anything());
    });
  };
  return testSubmit;
}

export function fillTextField(name, value, type = 'textbox') {
  const textField = screen.getByRole(type, {
    name: new RegExp(name, 'i'),
  });
  fireEvent.input(textField, { target: { value } });
  return textField;
}

export function fillTextFieldById(id, value) {
  const textField = screen.getByTestId(id);
  fireEvent.input(textField, { target: { value } });
  return textField;
}

export function fillAutoComplete(name, value) {
  const autocomplete = screen.getByRole('combobox', {
    name: new RegExp(`^${name}$`, 'i'),
  });
  const input = within(autocomplete).getByRole('textbox');
  fireEvent.change(input, { target: { value } });
  fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
  fireEvent.keyDown(autocomplete, { key: 'Enter' });
}
