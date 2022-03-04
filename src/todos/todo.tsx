import { ListItem, ListItemText } from '@mui/material';
import React, {useEffect} from 'react';
import {FormControl, InputLabel, Select, MenuItem, Grid} from '@mui/material';
import { selectToken } from './auth/AuthSlice';
import {selectCategories} from './categories/CategoriesSlice';
import {  useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
export default function Todo({todo, categoryId}:any) {
  const token = useSelector(selectToken)
  const [statusforTodo, setStatusforTodo] = useState([]);
  const categories = useSelector(selectCategories);
  useEffect(() => {
      axios.get(`http://localhost:80/status?categoryId=${categoryId}`,{headers: {'Authorization': `Bearer ${token}`}} ).then(response => {
        setStatusforTodo(response.data);
        console.log(todo.categoryId);
      })
  }, [categoryId]);
    const handleChange= (e:any) => {
        console.log(e.target.value);
    }
  return (        
    <ListItem>
        <ListItemText>{todo.title}</ListItemText>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Categories</InputLabel>
        <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        name="categoryId"
        value={todo.categoryId}  
        onChange={handleChange}
        defaultValue={todo.categoryId}
        >
           {
              categories && categories.map((item:any) => (
                <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
              ))
            }
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
        <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        name="statusId"
        value={todo.statusId}
        onChange={handleChange}
        defaultValue={todo.statusId}
        >
         {
        statusforTodo && statusforTodo.map((item:any) => (
         <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>))
         } 
      </Select>
      </FormControl>
    </ListItem>

  )
}
