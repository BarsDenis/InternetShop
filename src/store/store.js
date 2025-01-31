import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/productSlice";
import cartReducer from "./cart/cartSlice";
import reviewsReducer from "./reviews/reviewsSlice";
import favoriteListReducer from "./favoriteList/favoriteListSlice";


export const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
        reviews: reviewsReducer,
        favorite: favoriteListReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["cart/initializeCart"],
            },
        }),
});
