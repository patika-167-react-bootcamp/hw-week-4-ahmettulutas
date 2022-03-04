import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Helper function to get the token from the local storage;
function getCookie(name:any) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts?.pop()?.split(';')?.shift();
  }
// login thunk
export const login = createAsyncThunk(
    "auth/login",
    async (arg:any) => {
        let userId;
        await axios.post("http://localhost:80/auth/login", arg).then(data => {
         console.log(data);
         document.cookie = `token=${data.data.token}`;
         userId = data.data.userId;
    })
    const token = getCookie('token'); 
    return token;
})

// register thunk
export const register = createAsyncThunk(
    "auth/register",
    async (arg:any) => {
       await axios.post("http://localhost:80/auth/register", arg).then(data => {
         console.log(data);
         document.cookie = `token=${data.data.token}`;
    })
    const token = getCookie('token'); 
    return token;
})
// auth slice that controls the token and the success of the login;
const authSlice = createSlice({
    name: "auth",
    initialState: {
        success:getCookie('token') ? true : false,
        loading: false,
        failed:false,
        token:getCookie('token'),
    },
    reducers:{
        logOut: (state:any) => {
            state.success = false;
            state.token = null;
            document.cookie = "";
        }
    },
    extraReducers: {
        [login.pending.toString()]: (state:any) => {
            state.loading = true;
        },
        [login.fulfilled.toString()]: (state:any, action: any) => {
            state.loading = false;
            state.success = true;
            state.token = action.payload;

        },
        [login.rejected.toString()]: (state:any) => {
            state.loading = false;
            state.failed = true;
        },
        [register.pending.toString()]: (state:any) => {
            state.loading = true;
        },
        [register.fulfilled.toString()]: (state:any, action: any) => {
            state.loading = false;
            state.success = true;
            state.token = action.payload;
        },
        [register.rejected.toString()]: (state:any) => {
            state.loading = false;
            state.failed = true;
        }

    }
})
export default authSlice.reducer;
// selectors
export const selectToken = (state:any) => state.auth.token;
export const selectSuccess = (state:any) => state.auth.success;
export const selectUserId = (state:any) => state.auth.userId;
export const {logOut} = authSlice.actions;
