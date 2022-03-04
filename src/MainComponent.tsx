import AddTodo from './todos/AddTodo';
import FilterTodo from './FilterTodo';
import AddCategoryModal from './categories/AddCategoryModal';
import TodoList from './TodoList';
import Logout from './auth/Logout';
import { Grid } from "@mui/material";


export default function MainComponent() {
  return (
    <Grid sx={{border:'2px solid black', margin:"2rem auto"}}>
      <Grid item sx={{border:'2px solid black'}}><AddTodo/></Grid>
      <Grid item sx={{border:'2px solid black'}}><FilterTodo/></Grid>
      <Grid item sx={{border:'2px solid black'}}><TodoList/></Grid>
      <Grid item sx={{border:'2px solid black'}}><AddCategoryModal/></Grid>
      <Grid item sx={{border:'2px solid black'}}><Logout/></Grid>
    </Grid>
  )
}
