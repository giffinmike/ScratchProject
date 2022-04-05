import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StarBorderPurple500SharpIcon from '@mui/icons-material/StarBorderPurple500Sharp';

export default function ImgMediaCard() {
  return (
    <div>
    <div className="cardWrap">
    <Card sx={{ maxWidth: 345 }} display= "inline block">
        <CardContent>
            <Typography variant="h4" component="div">
                Headline</Typography>
        </CardContent>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="./images/owl.png"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Bias: Left
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined">Read</Button>
        <Button size="small" variant="outlined">Share</Button>
        <Button size="small" variant="outlined">Save</Button>
      </CardActions>
    </Card>
     <Card sx={{ maxWidth: 345 }} display= "inline block">
     <CardContent>
         <Typography variant="h4" component="div">
             Headline</Typography>
     </CardContent>
   <CardMedia
     component="img"
     alt="green iguana"
     height="140"
     image="./images/owl.png"
   />
   <CardContent>
     <Typography gutterBottom variant="h5" component="div">
       Bias: Left
     </Typography>
     <Typography variant="body2" color="text.secondary">
       Lizards are a widespread group of squamate reptiles, with over 6,000
       species, ranging across all continents except Antarctica
     </Typography>
   </CardContent>
   <CardActions>
     <Button size="small" variant="outlined">Read</Button>
     <Button size="small" variant="outlined">Share</Button>
     <Button size="small" variant="outlined">Save</Button>
   </CardActions>
 </Card>
 </div>
 </div>
  );
}

