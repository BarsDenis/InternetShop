import { createSlice } from "@reduxjs/toolkit";

export const favoriteList = createSlice({
    name: "favoriteList",
    initialState: {
        value: [],
    },
    reducers: {
        addFavorite: (state, action) => {
            state.value.push(action.payload);
        },
        removeFavorite: (state, action) => {
            state.value = state.value.filter((item) => item.id !== action.payload);
        },
    },
});

export const { actions, reducer } = favoriteList;
