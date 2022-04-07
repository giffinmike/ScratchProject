import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList} from "react-window";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { positions } from '@mui/system';
import { left } from '@mui/system';
import Modal from '@mui/material/Modal';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';

import IconButton from '@mui/material/IconButton';

import StarIcon from '@mui/icons-material/Star';
import BookmarksIcon from '@mui/icons-material/Bookmarks';



export default function VirtualizedList(props) {
  const {articles} = props;

  function renderRow(props) {
    const { index, style } = props;

    return (
      <ListItem sx={{m: 0}} style={style} key={index} component="div" disablePadding alignItems="center">
        
        <ListItemButton onClick={()=>window.open(articles[index].link)}>
        
          <Card sx={{ 
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: "common.main",
            borderColor:"secondary.main",
            boxShadow: 8,
            border:1,
            borderRadius:5,
            minWidth: 220,
            maxWidth: 220,
            maxHeight: 200,
            minHeight: 200 }}
            display= "inline block">
           
            <Box sx={{
              maxHeight: 35,
              minHeight: 35,
              display:'grid',
              gridTemplateColumns: ' 1fr 1fr 1fr;',
              marginLeft:-6,
              marginTop:1
              }}> 
             
              <img className="sourceIcon" src={articles[index].source.favicon} alt="icon not found"/> 
              {articles[index].source.title}
        
              <CardActions>
                <IconButton sx={{ left: 25 }} size="small" variant="outlined"><BookmarksIcon/></IconButton>
              </CardActions>
            </Box>
    
            <Box sx={{
              maxHeight: 25,
              minHeight: 25 
              }}>
  
              <CardContent>
                <Typography sx={{fontSize:10}}variant="h6" component="div">
                  {articles[index].title}
                </Typography>
              </CardContent>
            </Box>
  
            <Box sx={{
              m:5,
              display: 'flex',
              justifyContent: "center",
              height:40}}
              >
              <img className="mainPhoto" src={articles[index].thumbnail} alt="icon not found"/> 
            </Box>
          </Card>
        </ListItemButton>
      </ListItem>
    );
  };


  return (
    <div>
      <Typography sx={{
        color: "white",
        fontSize:40,
        textAlign: 'center'
        }}
        variant="h6"
        component="div">
          LEFT
      </Typography>
  
      <Box
      
        sx={{
          borderRadius:"borderRadius",
          color: "#1769aa",
          boxShadow: 10,
          mt: 2,
          mr:2,
          border: 1,
          width: "100%",
          height: 590,
          maxWidth: 250,
          backgroundColor: "secondary.main",
          borderColor:"white"
        }}
        >
        <FixedSizeList
          height={570}
          width={250}
          itemSize={215}
          itemCount={articles.length-1}
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
      </Box>
    </div>
  );
}



