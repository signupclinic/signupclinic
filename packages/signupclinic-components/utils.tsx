import React from 'react';
import { render as defaultRender } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';

export const render = (component) => defaultRender(<SnackbarProvider>{component}</SnackbarProvider>);
