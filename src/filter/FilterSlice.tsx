import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name:"filter",
    initialState:{
        categoryId:0,
        statusId:0
    },
    reducers:{
        editFilter: (state:any, action:any) => {
            state = action.payload;
        },
        resetFilter: (state:any) => {
            state = "";
        }
    }
})
export const { editFilter, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
export const selectFilter = (state:any) => state.filter;

/* export const selectAllCards = (state) => state.allCardsSlice.allCards;
export const filteredCardsSelector = (state) => {
  const searchTerm = selectSearchTerm(state);
  const allCards = selectAllCards(state);
  return allCards.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}; */