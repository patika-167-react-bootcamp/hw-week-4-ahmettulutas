import {useState, useEffect} from 'react';
import {TextField, Typography} from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {useDispatch} from 'react-redux';
import {addTodo} from './TodosSlice';
import OptionButtons from '../components/OptionButtons';
import { getCategories } from '../categories/CategoriesSlice';

export default function AddTodo() {
  const dispatch = useDispatch();  
  const [todoBody, setTodoBody] = useState({title:"", categoryId:2,statusId:0,color:"red"});
  useEffect(() => {
    dispatch(getCategories());
    
  },[todoBody.categoryId])
  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setTodoBody(prev => ({...prev, [name]: value}));
  }
  const handleSubmit = (e:any) => {
      e.preventDefault();
      dispatch(addTodo(todoBody));
      setTodoBody({title:"", categoryId:1,statusId:1,color:"red"});
  } 
  return (
   <Grid container >
    <Grid item xs={1}>
      <Typography>Add a Todo</Typography>
    </Grid>
    <Grid item xs={9}>
      <form onSubmit={handleSubmit} style={{display:"flex", alignItems:"center", flexDirection:"row", width:"100%"}}>
        <TextField value={todoBody.title} name="title" onChange={handleChange} sx={{m:1}} id="outlined-basic" label="Add a Todo" variant="outlined" />
        <OptionButtons categoryId={todoBody.categoryId} statusId={todoBody.statusId} handleChange={handleChange} />
        <Button type="submit" sx={{height:"100%"}} variant="contained" color="success">+</Button>
      </form>
    </Grid>
   </Grid>
  )
}