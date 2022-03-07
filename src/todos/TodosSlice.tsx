import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { selectFilter } from "../filter/FilterSlice";
import axios from "axios";
function getCookie(name:any) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts?.pop()?.split(';')?.shift();
  }
let token = getCookie('token')
/* ----------------TODO THUNKS-------------------- */
export const getTodos = createAsyncThunk(
    "todos/getTodos",
     async () => {
         try {
            const response = await axios.get('http://localhost:80/todo', {headers: {'Authorization': `Bearer ${token}`}})
            console.log("getting todos from the server...", response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
})
export const addTodo = createAsyncThunk(
    "todos/addTodo",
    async (arg:any) => {
        // todo body passed in arg
        try {
            const response = await axios.post('http://localhost:80/todo', arg, {headers: {'Authorization': `Bearer ${token}`}})
            console.log("adding todo to the server...", response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            }
})
export const updateTodo = createAsyncThunk(
    "todos/addTodo",
    async (arg:any) => {
        // id and todo body passed in arg
        const {id, todoBody} = arg;
        try {
            const response = await axios.put(`http://localhost:80/todo/${id}`, todoBody, {headers: {'Authorization': `Bearer ${token}`}})
            console.log("updating todo in the server...", response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            }
})
export const deleteTodo = createAsyncThunk(
    "todos/deleteTodo",
    async (arg:any) => {
        // id passed in arg
        try {
            const response = await axios.delete(`http://localhost:80/todo/${arg}`, {headers: {'Authorization': `Bearer ${token}`}})
            console.log("deleting todo from the server...", response.data);
            return arg;
        } catch (error) {
            console.log(error);
            }
})
/* ---------------------- TODO SLICE ------------------------ */
const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        loading: false,
        failed:false,
        pending:false,
        userId:null
    },
    reducers: {},
    extraReducers: {
        [addTodo.pending.toString()]: (state:any) => {
            state.pending = true;
        },
        [addTodo.fulfilled.toString()]: (state:any, action: any) => {
            state.pending = false;
            state.todos = [...state.todos, action.payload];
        },
        [addTodo.rejected.toString()]: (state:any) => {
            state.pending = false;
            state.failed = true;
        },
        [getTodos.pending.toString()]: (state:any) => {
            state.loading = true;
        },
        [getTodos.fulfilled.toString()]: (state:any, action: any) => {
            state.loading = false;
            state.todos = action.payload;
        },
        [getTodos.rejected.toString()]: (state:any) => {
            state.loading = false;
            state.failed = true;
        },
        [updateTodo.pending.toString()]: (state:any) => {
            state.pending = true;

        },
        [updateTodo.fulfilled.toString()]: (state:any, action: any) => {
            state.pending = false;
            state.todos = state.todos.map((todo:any) => {
                if(todo.id === action.payload.id){
                    return action.payload;
                }
                return todo;
            }
            )}
        },
        [updateTodo.rejected.toString()]: (state:any) => {
            state.pending = false;
            state.failed = true;
        },
        [deleteTodo.pending.toString()]: (state:any) => {
            state.pending = true;
        },
        [deleteTodo.fulfilled.toString()]: (state:any, action:any) => {
            state.pending = false;
            state.todos = state.todos.filter((item:any) => item.id !== action.payload);
        },
        [deleteTodo.rejected.toString()]: (state:any) => {
            state.pending = false;
            state.failed = true;
        }   

})
export default todoSlice.reducer;
export const selectTodos = (state:any) => state.todo.todos;
export const filteredTodos = (state:any) => {
    const filter = selectFilter(state);
    const allTodos = selectTodos(state);
    return allTodos.filter((item:any) => item.categoryId === filter.categoryId || item.statusId === filter.statusId)
}

