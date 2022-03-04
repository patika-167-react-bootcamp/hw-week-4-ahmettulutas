import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getStatus = createAsyncThunk(
    "status/getStatus",
    async(arg:any) => {
        const {token, categoryId} = arg;
        try {
            const response = await axios.get(`http://localhost/status?categoryId=${categoryId}`, {headers: {'Authorization': `Bearer ${token}`}})
            console.log("getting status from the server", response);
            return response.data;
            
        }
        catch (error) {
            console.log(error);
        }
})  
const statusSlice = createSlice({
    name: "status",
    initialState: {
        status: [],
        loading: false,
        failed:false,
        pending:false
    },
    reducers: {},
    extraReducers: {
        [getStatus.pending.toString()]: (state:any) => {
            state.loading = true;
        },
        [getStatus.fulfilled.toString()]: (state:any, action: any) => {
            state.loading = false;
            state.status = action.payload;
        },
        [getStatus.rejected.toString()]: (state:any) => {
            state.loading = false;
            state.failed = true;
        }
    }
})
export default statusSlice.reducer;
export const selectStatus = (state:any) => state.status.status;
