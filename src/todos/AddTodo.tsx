import {useState, useEffect} from 'react';
import {TextField, Typography} from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from 'react-redux';
import {addTodo, getTodos} from './TodosSlice';
import OptionButtons from '../components/OptionButtons';
import { getCategories, getStatus, selectCategories } from '../categories/CategoriesSlice';

export default function AddTodo() {
  const dispatch = useDispatch(); 
  const categories = useSelector(selectCategories);
  useEffect(() =>{
    dispatch(getCategories());

  },[])
  const [todoBody, setTodoBody] = useState({title:"", categoryId:0,statusId:0,color:"red"});
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
   <Grid sx={{display:"flex", flexDirection:"column"}} container >
    <Grid sx={{width:"100%"}} item >
      <Typography sx={{fontSize:30}}>Add a Todo</Typography>
    </Grid>
    <Grid sx={{m:1}} item>
      <form onSubmit={handleSubmit} style={{margin:"1rem",display:"flex",flexDirection:"row", justifyContent:"center"}}>
        <TextField value={todoBody.title} name="title" onChange={handleChange}  id="outlined-basic" label="Add a Todo" variant="outlined" />
        <OptionButtons categoryId={todoBody.categoryId} statusId={todoBody.statusId} handleChange={handleChange} />
        <Button type="submit" variant="contained" color="success">+</Button>
      </form>
    </Grid>
   </Grid>
  )
}