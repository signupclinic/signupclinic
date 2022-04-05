import React from 'react';
import { ThemeProvider } from 'signupclinic-components';
import { SnackbarProvider } from 'notistack';
export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  actions: { argTypesRegex: '^on.*' },
};

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <SnackbarProvider maxSnack={3}>
        <Story />
      </SnackbarProvider>
    </ThemeProvider>
  ),
];
