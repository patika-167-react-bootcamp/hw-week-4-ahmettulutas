import { useEffect } from 'react';
import { selectTodos, getTodos } from '../todos/TodosSlice';
import { useSelector, useDispatch } from 'react-redux';
import Todo from './todo';
import {selectToken} from '../auth/AuthSlice';
export default function TodoList() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const todos = useSelector(selectTodos);
  return (
    <main>
      <h1>Todo List</h1>
      {todos && todos.map((todo:any) => (
        <Todo key={todo.id} todo={todo}/>
      ))}
    </main>
  )
}
