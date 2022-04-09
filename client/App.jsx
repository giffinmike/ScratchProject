import React, { useEffect, useState} from 'react';
import Search from "./components/Search.jsx";
import Home from "./components/Home.jsx";
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";

import { sampleData } from "./assets/sampleData.js"

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
      main: '#E8CFC1',
      light: '#f1e2da'
    }
  },
});


export default function App() {

  const [columns, setColumns] = useState(null);

  // useEffect(()=>{
  //   axios.get("/api")
  //   .then((response) => {
  //     setColumns(response.data.map(el => <Home articles={el}/>));})
  //   .catch(err => {console.log(err)});
  // }, [])

    useEffect(()=>{
   
      setColumns(sampleData.map(el => <Home articles={el}/>));
   
  }, [])


  return (

    <ThemeProvider theme={theme}>

      <div className="main">
        <Search setColumns={setColumns}/>
        <div className="cardWrap">
          {columns}
        </div>
      </div>

    </ThemeProvider>
  );
}
