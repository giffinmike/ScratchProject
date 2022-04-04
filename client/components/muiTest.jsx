import * as React from 'react';
import ReactDOM from 'react-dom';
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});

const TestComp = () => {
  return(
    <ThemeProvider theme={theme}>
      <h1>Hello Mui</h1>
    </ThemeProvider>
  ) 
};

export default TestComp;