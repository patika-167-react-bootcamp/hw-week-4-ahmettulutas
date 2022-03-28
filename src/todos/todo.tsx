import {Button, ListItem, TextField,} from '@mui/material';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import OptionButtons from '../components/OptionButtons';
import {updateTodo, deleteTodo, getTodos} from './TodosSlice';
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from '@mui/icons-material/Save';

export default function Todo({todo}:any) {
  const [todoBody, setTodoBody] = useState({id:todo.id,title:todo.title,categoryId:todo.categoryId,statusId:todo.statusId});
  const dispatch = useDispatch();
  const handleChange= (e:any) => {
      const {name, value} = e.target;
        setTodoBody(prev => ({...prev, [name]: value}));
      }
  const handleUpdate = (e:any) => {
    const {id} = todo; // gets todo id from the todo object;
        dispatch(updateTodo({id, todoBody}));
        e.preventDefault();
      }
  const handleDelete = (e:any) => {
    const {id} = todo; // gets todo id from the todo object;
        dispatch(deleteTodo(id));
        e.preventDefault();     
      }
  return (        
    <ListItem key={todo.id} sx={{display:"flex", justifyContent:"space-between", alignItems:"stretch"}}>
        <TextField name="title" onChange={handleChange} value={todoBody.title}></TextField>
        <OptionButtons categoryId={todoBody.categoryId} statusId={todoBody.statusId} handleChange={handleChange} />
        <Button 
          startIcon={<SaveIcon/>} 
          onClick={handleUpdate}
          variant="contained"
          color="success">
        </Button>
        <Button
          size="small" 
          startIcon={<DeleteIcon />}
          color="error"
          onClick={()=> handleDelete(todoBody.id)}
          variant="contained">
        </Button>
    </ListItem>

  )
}
