import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
export const getTodos = createAsyncThunk(
    "todos/getTodos",
     async (arg:any) => {
         try {
                const response = await axios.get('http://localhost:80/todo', {headers: {'Authorization': `Bearer ${arg}`}})
                console.log("getting todos from the server", response.data);
                return response.data;
            } catch (error) {
                console.log(error);
            }
        }
)
export const addTodo = createAsyncThunk(
    "todos/addTodo",
    async (arg:any) => {
        // token and todo body passed in arg
        const {todoBody, token} = arg;
        try {
            const response = await axios.post('http://localhost:80/todo', todoBody, {headers: {'Authorization': `Bearer ${token}`}})
            console.log("adding todo to the server", response.data);
            return response.data;
        } catch (error) {
            
            console.log("olmadı", error);
            }
        }
)




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
        [addTodo.pending.toString()]: (state:any) => {
            state.pending = true;
        },
        [addTodo.fulfilled.toString()]: (state:any, action: any) => {
            state.pending = false;
            // HOCAYA SORULACAK ! //
            state.todos.push(action.payload);
        },
        [addTodo.rejected.toString()]: (state:any) => {
            state.pending = false;
            state.failed = true;
        }
    }
})
export default todoSlice.reducer;
export const selectTodos = (state:any) => state.todo.todos;

