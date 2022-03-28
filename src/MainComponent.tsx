import AddTodo from './todos/AddTodo';
import FilterTodo from './filter/FilterTodo';
import AddCategoryModal from './categories/AddCategoryModal';
import TodoList from './todos/TodoList';
import { Grid } from "@mui/material";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTodos } from './todos/TodosSlice';
import { getCategories } from './categories/CategoriesSlice';

export default function MainComponent() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodos()); 
    
  },[])
  return (
    <Grid sx={{border:'2px solid black', margin:"2rem auto"}}>
      <Grid item sx={{border:'2px solid black'}}><AddTodo/></Grid>
      <Grid item sx={{border:'2px solid black'}}><FilterTodo/></Grid>
      <Grid item sx={{border:'2px solid black'}}><TodoList/></Grid>
      <Grid item sx={{border:'2px solid black'}}><AddCategoryModal/></Grid>
    </Grid>
  )
}
