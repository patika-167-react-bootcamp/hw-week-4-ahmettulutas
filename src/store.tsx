import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./auth/AuthSlice";
import categoriesSlice from "./categories/CategoriesSlice";
import statusSlice from "./status/StatusSlice";
import todoSlice from "./todos/TodosSlice";
const store = configureStore({
    reducer:{
        auth: loginSlice,
        categories: categoriesSlice,
        status: statusSlice,
        todo: todoSlice
    }
})
export default store; 
