import  {useState} from 'react'
import { Button, Grid, Typography } from '@mui/material';
import OptionButtons from '../components/OptionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, editFilter } from './FilterSlice';
export default function FilterTodo() {
  const filterState = useSelector(selectFilter);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({...filterState});
  const handleChange = (event:any) => {
    const {name, value} = event.target;
    setFilter((prev:any) => ({...prev, [name]:value}));
    console.log(filter);
    dispatch(editFilter(filter));
  };
  return (
  <Grid container>
    <Grid item xs={2}>
      <Typography>Filter Todos</Typography>
    </Grid>
    <Grid item xs={8}>
      <OptionButtons statusId={filter.statusId} categoryId={filter.categoryId} handleChange={handleChange} />
    </Grid>
    <Grid item xs={2}>
      <Button sx={{m:"1 auto", height:"100%"}} variant="contained" color="error">X</Button>
    </Grid>
  </Grid>
  )
}
