import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#475C7A',
    },
    secondary: {
      main: '#D8737F',
    },
    // background: {
    //   paper: '#EFEFFF',
    // },
    warning: {
      main: '#685D78',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '10px',
        },
      },
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
  },
});

export default theme;
