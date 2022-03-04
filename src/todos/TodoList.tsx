import { useEffect } from 'react';
import {selectTodos, getTodos} from './todos/TodosSlice';
import { useDispatch,useSelector } from 'react-redux';
import { selectToken } from './auth/AuthSlice';
import Todo from './todo';

export default function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const token = useSelector(selectToken); 
  useEffect(() => { 
    dispatch(getTodos(token));
    console.log(todos);
  },[]);
  return (
    <main>
      <h1>Todo List</h1>
      {todos && todos.map((todo:any) => (
        <Todo key={todo.id} todo={todo}/>
      ))}
    </main>
  )
}
