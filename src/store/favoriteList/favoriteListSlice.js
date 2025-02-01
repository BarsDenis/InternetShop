import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const favoriteListSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            const exists = state.items.some(
                (item) => item.id === action.payload.id
            );
            if (!exists) {
                state.items.push(action.payload);
            }
            // localStorage.setItem("favoriteList", JSON.stringify(state.items));
        },
        removeFavorite: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
            // localStorage.setItem("favoriteList", JSON.stringify(state.items));
        },
    },
});

export const { addFavorite, removeFavorite } = favoriteListSlice.actions;

export const selectFavoriteItems = (state) => state.favorite.items;
export const selectIsInFavorite = (state, productId) => {
    return state.favorite.items.some((item) => item.id === productId);
};

export default favoriteListSlice.reducer;
