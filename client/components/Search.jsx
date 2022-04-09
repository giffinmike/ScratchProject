import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FullWidthTextField(props) {

 


const handleOnChange = event => {
    console.log('Click');
    console.log(event.target.value);


  };

  const handleOnSearch = event => {
    console.log('Click');
    console.log(event.target.value);
    if (event.key==="Enter"){
      axios({
        method: 'get',
        url: '/api/search',
        data: event.target.value,
      })
      //props.setColumns
      .then((response) => {
        setColumns(response.data.map(el => <Home articles={el}/>));
      })
      .catch(err => console.log(err));


  }
  }

  return (
    

    

    <Box 
    sx={{width: 800,
      
      height: 100,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      marginTop: 8,
      borderColor: "#FF1616",
      borderWidth: 10,

      backgroundColor: 'secondary.main'
       }}>\
        <img className="tempLogo" src="./images/Owlwithlargerfont.png" alt="temp logo"/>
    <Box
      sx={{
        width: 1000,
        maxWidth: '100%',
        m:4,
        borderColor: 'white',
        backgroundColor: 'common.main',


        borderRadis: 5,
        
        
      }}
    >
      <TextField onKeyDown={handleOnSearch} onChange={handleOnChange} fullWidth label="hoot" id="fullWidth" />
    </Box>
    </Box>
  );
}

// export default function LoadingButtons() {
//   console.log(LoadingButton)
//   return (
//     <Stack direction="row" spacing={2}>
//       <LoadingButton loading variant="outlined">
//         Submit
//       </LoadingButton>
      

//     </Stack>
//   );
// }