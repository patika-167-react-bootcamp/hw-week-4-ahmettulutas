import { selectTodos, getTodos, filteredTodos } from '../todos/TodosSlice';
import { useSelector, useDispatch } from 'react-redux';
import Todo from './todo';
import { Container, Typography } from '@mui/material';
export default function TodoList() {
  const todos = useSelector(selectTodos);
  return (
    <Container sx={{overflow:"scroll", maxHeight:"550px"}}>
      <Typography sx={{fontSize:30}}>Todo List</Typography>
      {todos && todos.map((todo:any) => (
        <Todo key={todo.id} todo={todo}/>
      ))}
    </Container>
  )
}
