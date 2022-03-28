import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./auth/AuthSlice";
import categoriesSlice from "./categories/CategoriesSlice";
import todoSlice from "./todos/TodosSlice";
import filterSlice from "./filter/FilterSlice";
const store = configureStore({
    reducer:{
        auth: loginSlice,
        categories: categoriesSlice,
        todo: todoSlice,
        filter: filterSlice
    }
})
export default store; 
