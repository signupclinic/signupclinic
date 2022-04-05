import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Zoom } from '@mui/material';
import { theme as baseTheme } from '@j718/components';

export default function InnerTheme({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={baseTheme}>
      <ThemeProvider
        theme={(theme) =>
          createTheme({
            ...theme,
            ...{
              palette: {
                ...(theme as any).palette,
                background: { paper: 'white' },
              },
              zIndex: {
                drawer: 1180,
                appBar: 1200,
              },
              typography: {
                h4: {
                  marginBottom: 10,
                  marginTop: 10,
                },
              },
              components: {
                MuiTooltip: {
                  defaultProps: {
                    arrow: true,
                    enterDelay: 100,
                    enterNextDelay: 300,
                    TransitionComponent: Zoom,
                  },
                },
                MuiMenu: {
                  defaultProps: {
                    TransitionComponent: Zoom,
                  },
                },
                MuiPopover: {
                  defaultProps: {
                    TransitionComponent: Zoom,
                  },
                },
                MuiDialog: {
                  defaultProps: {
                    fullWidth: true,
                    maxWidth: 'lg',
                  },
                },
                MuiAutocomplete: {
                  styleOverrides: {
                    root: {
                      paddingRight: 8,
                    },
                  },
                },
                MuiTextField: {
                  styleOverrides: {
                    root: {
                      margin: 4,
                      flexGrow: 1,
                      backgroundColor: 'white',
                    },
                  },
                  defaultProps: {
                    autoComplete: 'off',
                    fullWidth: true,
                    variant: 'outlined',
                    size: 'small',
                  },
                },
                MuiCardHeader: {
                  styleOverrides: {
                    root: {
                      paddingTop: 4,
                      paddingBottom: 4,
                    },
                  },
                },

                MuiChip: {
                  defaultProps: {
                    size: 'small',
                  },
                },
                MuiButton: {
                  defaultProps: {
                    variant: 'contained',
                  },
                },
              },
            },
          })
        }
      >
        {children}
      </ThemeProvider>
    </ThemeProvider>
  );
}
