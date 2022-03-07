import React, {useState} from 'react'
import { Button, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';


export default function FilterTodo() {
  const [filter, setFilter] = useState({statusId:"", categoryId:""});
  const handleChange = (event:any) => {
    setFilter(event.target.value);
  };
  return (
  <Grid container>
    <Grid item xs={2}>
      <Typography>Filter Todos</Typography>
    </Grid>
    <Grid item xs={8}>
     {/*  <CategorySelection handleChange={handle/> */}
    </Grid>
    <Grid item xs={2}>
      <Button sx={{m:"1 auto", height:"100%"}} variant="contained" color="error">X</Button>
{/*     <CategorySelection statusId={filter.statusId} {handleChange={handleChange}/> */}
    </Grid>
  </Grid>
  )
}
