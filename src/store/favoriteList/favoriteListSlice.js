import { createSlice } from "@reduxjs/toolkit";

const getInitialFavoriteList = () => {
    try {
        const items = localStorage.getItem("favoriteList");
        return items ? JSON.parse(items) : [];
    } catch (error) {
        console.error("Error loading favorite list:", error);
        return [];
    }
};

const favoriteListSlice = createSlice({
    name: "favorite",
    initialState: {
        items: getInitialFavoriteList(),
        status: "idle",
        error: null,
    },
    reducers: {
        addFavorite: (state, action) => {
            const exists = state.items.some(
                (item) => item.id === action.payload.id
            );
            if (!exists) {
                state.items.push(action.payload);
            }
            localStorage.setItem("favoriteList", JSON.stringify(state.items));
        },
        removeFavorite: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
            localStorage.setItem("favoriteList", JSON.stringify(state.items));
        },
    },
});

export const { addFavorite, removeFavorite } = favoriteListSlice.actions;

export const selectFavoriteItems = (state) => state.favorite.items;
export const selectIsInFavorite = (state, productId) => {
    return state.favorite.items.some((item) => {
        return Number(item.id) === Number(productId);
    });
};

export default favoriteListSlice.reducer;
