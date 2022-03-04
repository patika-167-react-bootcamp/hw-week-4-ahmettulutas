import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// thunks
export const getCategories = createAsyncThunk(
    "categories/getCategories",
    async (arg:any) => {
        // token passed in arg
        try {
            const response = await axios.get('http://localhost:80/category', {headers: {'Authorization': `Bearer ${arg}`}})
            console.log("getting categories from the server", response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    })

export const addCategory = createAsyncThunk(
    "categories/addCategory",
    async (arg:any) => {
        // token and category body passed in arg
        const {newCategory, token} = arg;
        try {
            const response = await axios.post('http://localhost:80/category', newCategory,  {headers: {'Authorization': `Bearer ${token}`}})
            return response.data;
        } catch (error) {
            console.log(error);
        }
    })    

// categories slice
const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        loading: false,
        failed:false,
        pending:false,
        userId:null
    },
    reducers: {
        getCategoryId: (state:any,action:any) => {
            
        }
    },
    extraReducers: {
        [getCategories.pending.toString()]: (state:any) => {
            state.loading = true;
        },
        [getCategories.fulfilled.toString()]: (state:any, action: any) => {
            state.loading = false;
            state.categories = action.payload;
        },
        [getCategories.rejected.toString()]: (state:any) => {
            state.loading = false;
            state.failed = true;
        },
        [addCategory.fulfilled.toString()]: (state:any, action:any) => {
            state.categories = [...state.categories, action.payload];
        }
    }
});

export default categoriesSlice.reducer;
export const selectCategories = (state:any) => state.categories.categories;