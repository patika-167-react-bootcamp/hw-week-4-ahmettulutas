import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// token getter function 
function getCookie(name:any) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts?.pop()?.split(';')?.shift();
  }
let token = getCookie('token')
// thunks for categories
export const getCategories = createAsyncThunk(
    "categories/getCategories",
    async () => {
        // token passed in arg
        try {
            const response = await axios.get('http://localhost:80/category', {headers: {'Authorization': `Bearer ${token}`}})
            console.log("getting categories from the server", response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    })

export const addCategory = createAsyncThunk(
    "categories/addCategory",
    async (arg:any) => {      
        try {
            const response = await axios.post('http://localhost:80/category', arg,  {headers: {'Authorization': `Bearer ${token}`}})
            return response.data;
        } catch (error) {
            console.log(error);
        }
})   
export const updateCategory = createAsyncThunk(
    "categories/updateCategory",
    async (arg:any) => {
        // id, token and category body passed in arg
        const {id, editedCategory} = arg;
        try {
            console.log(id, editedCategory,token)
            const response = await axios.put(`http://localhost:80/category/${id}`, editedCategory, {headers: {'Authorization': `Bearer ${token}`}})
            console.log("updating category in the server...", response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }

})
export const deleteCategory = createAsyncThunk(
    "categories/deleteCategory",
    async (arg:any) => {
        // categoryId passed in arg
        try {
            const response = await axios.delete(`http://localhost:80/category/${arg}`, {headers: {'Authorization': `Bearer ${token}`}})
            console.log("deleting category from the server...", response.data);
            return arg;
        } catch (error) {
            console.log(error);
        }
        
})


// thunks for status
export const getStatus = createAsyncThunk(
    "status/getStatus", 
    async(arg:any) => {
        // categoryId passed in arg
        try {
            const response = await axios.get(`http://localhost/status?categoryId=${arg}`,  {headers: {'Authorization': `Bearer ${token}`}})
            console.log("getting status...", response.data);
            return response.data;
            
        } catch (error) {
            console.log(error);
        }
}) 
export const addStatus = createAsyncThunk(
    "categories/addStatus",
    async (arg:any) => {
        // newStatus body passed in arg;
        const {categoryId} = arg;
        try {
            const response = await axios.post(`http://localhost:80/status?categoryId=${categoryId}`, arg, {headers: {'Authorization': `Bearer ${token}`}})
            console.log("adding status to the server...", response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
})
export const updateStatus = createAsyncThunk(
    "categories/updateStatus",
    async (arg:any) => {
        // id, token and category body passed in arg
        const {id, editedStatus} = arg;
        try {
            const response = await axios.put(`http://localhost:80/status/${id}`, editedStatus, {headers: {'Authorization': `Bearer ${token}`}})
            console.log("updating status in the server...", response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
})
export const deleteStatus = createAsyncThunk(
    "categories/deleteStatus",
    async (arg:any) => {
        // statusId passed in arg
        try {
            const response = await axios.delete(`http://localhost:80/status/${arg}`, {headers: {'Authorization': `Bearer ${token}`}})
            console.log("deleting status from the server...", response.data);
            return arg;
        } catch (error) {
            console.log(error);
        }
})


// categories slice
const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        categories:{
            categoriesList: [],
            statusList:{}       
        },
        loading: false,
        failed:false,
        pending:false,
    },
    reducers: {},
    extraReducers: {
        [getCategories.pending.toString()]: (state:any) => {
            state.loading = true;
        },
        [getCategories.fulfilled.toString()]: (state:any, action: any) => {
            state.loading = false;
            state.categories.categoriesList = action.payload;
        },
        [getCategories.rejected.toString()]: (state:any) => {
            state.loading = false;
            state.failed = true;
        },
        [addCategory.pending.toString()]: (state:any) => {
            state.pending = true;
        },
        [addCategory.fulfilled.toString()]: (state:any, action:any) => {
            state.categories.categoriesList = [...state.categories.categoriesList, action.payload];
        },
        [addCategory.rejected.toString()]: (state:any) => {
            state.failed = true;
            state.loading = false;
        },
        [updateCategory.pending.toString()]: (state:any) => {
            state.pending = true;
        },
        [updateCategory.fulfilled.toString()]: (state:any, action:any) => {
            state.pending = false;
            state.categories.categoriesList = state.categories.categoriesList.map((category:any) => {
                if(category.id === action.payload.id) {
                    return action.payload;
                }
                return category;
            });
        },
        [updateCategory.rejected.toString()]: (state:any) => {
            state.pending = false;
            state.failed = true;
        },
        [deleteCategory.pending.toString()]: (state:any) => {
            state.pending = true;
        },
        [deleteCategory.fulfilled.toString()]: (state:any, action:any) => {
            state.pending = false;
            state.categories.categoriesList = state.categories.categoriesList.filter((category:any) => category.id !== action.payload);
        },
        [deleteCategory.rejected.toString()]: (state:any) => {
            state.pending = false;
            state.failed = true;
        },
        [getStatus.pending.toString()]: (state:any) => {
            state.loading = true;
        },
        [getStatus.fulfilled.toString()]: (state:any, action: any) => {
            state.loading = false;
            const categoryId = action.payload[0].categoryId;
            state.categories.statusList = {...state.categories.statusList, [categoryId]: action.payload};      
        },
        [getStatus.rejected.toString()]: (state:any) => {
            state.loading = false;
            state.failed = true;
        },
        [addStatus.pending.toString()]: (state:any) => {
            state.pending = true;
        },
        [addStatus.fulfilled.toString()]: (state:any, action:any) => {
            state.pending = false;
            const categoryId = action.payload.categoryId;
            state.categories.statusList = {...state.categories.statusList, [categoryId]: [...state.categories.statusList[categoryId], action.payload]};
        },
        [addStatus.rejected.toString()]: (state:any) => {
            state.pending = false;
            state.failed = true;
        },
        [updateStatus.pending.toString()]: (state:any) => {
            state.pending = true;
        },
        [updateStatus.fulfilled.toString()]: (state:any, action:any) => {
            state.pending = false;
            const categoryId = action.payload.categoryId;
            state.categories.statusList = {...state.categories.statusList, [categoryId]: state.categories.statusList[categoryId].map((status:any) => {
                if(status.id === action.payload.id) {
                    return action.payload;
                }
                return status;
            })};
        },
        [updateStatus.rejected.toString()]: (state:any) => {
            state.pending = false;
            state.failed = true;
        },
        [deleteStatus.pending.toString()]: (state:any) => {
            state.pending = true;
        },
        [deleteStatus.fulfilled.toString()]: (state:any, action:any) => {
            let {statusList} = state.categories
            state.pending = false;
            const categoryId = action.payload;
            statusList = {...statusList, 
                [categoryId]: statusList[categoryId].filter((status:any) => status.id !== action.payload)};
            state.categories.statusList = statusList;  
        },
        [deleteStatus.rejected.toString()]: (state:any) => {
            state.pending = false;
            state.failed = true;
        }

        

    }
});

export default categoriesSlice.reducer;
// selectors
export const selectCategories = (state:any) => state.categories.categories.categoriesList;
export const selectStatus = (state:any) => state.categories.categories.statusList;
