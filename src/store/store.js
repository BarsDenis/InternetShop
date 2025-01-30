import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/productSlice";
import cartReducer from "./cart/cartSlice";
import reviewsReducer from "./reviews/reviewsSlice";

export const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
        reviews: reviewsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["cart/initializeCart"],
            },
        }),
});
