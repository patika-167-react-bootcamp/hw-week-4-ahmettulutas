import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./auth/AuthSlice";
import categoriesSlice from "./categories/CategoriesSlice";
import todoSlice from "./todos/TodosSlice";
const store = configureStore({
    reducer:{
        auth: loginSlice,
        categories: categoriesSlice,
        todo: todoSlice
    }
})
export default store; 
