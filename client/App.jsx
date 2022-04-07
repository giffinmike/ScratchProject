import React, { useEffect, useState } from 'react';
import Search from "./components/Search.jsx";
import Home from "./components/Home.jsx";
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#2B2012',
      darker: '#053e85',
    },
    secondary: {
      main: '#D67747',
      light: '#462210',
    },
    common: {
      main: '#E8CFC1'
    }



  },
});




export default function App() {

  return (
  <ThemeProvider theme={theme}>

    <div className="main">
   <Search />
      <div className="cardWrap">
      <Home  />
      <Home/>
      <Home/>
      <Home/>
      <Home />
      </div>

    </div>
    </ThemeProvider>





  );
}
