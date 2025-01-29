import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer } from "./favoriteList/favoriteList.slice";

const reducerList = combineReducers({
  favoriteList: reducer,
});

export const store = configureStore({
  reducer: {
    reducer: reducerList,
  },
});
