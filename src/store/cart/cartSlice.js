import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const updateProductStock = createAsyncThunk(
    "cart/updateProductStock",
    async (products) => {
        const updates = products.map((product) =>
            fetch(`https://dummyjson.com/products/${product.item.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    stock: product.item.stock - product.count,
                }),
            }).then((res) => res.json())
        );
        return await Promise.all(updates);
    }
);

const getInitialCartItems = () => {
    try {
        const items = localStorage.getItem("readyForBuy");
        return items ? JSON.parse(items) : [];
    } catch (error) {
        console.error("Error loading cart items:", error);
        return [];
    }
};

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: getInitialCartItems(),
        status: "idle",
        error: null,
    },
    reducers: {
        initializeCart: (state) => {
            const savedItems = localStorage.getItem("readyForBuy");
            if (savedItems) {
                state.items = JSON.parse(savedItems);
            }
        },
        setCartItems: (state, action) => {
            state.items = action.payload;
            localStorage.setItem("readyForBuy", JSON.stringify(action.payload));
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.clear();
        },

        setToCart: (state, action) => {
            const existingItem = state.items.find(
                (item) => item.item.id === action.payload.item.id
            );

            if (existingItem) {
                existingItem.count += 1;
                existingItem.price = existingItem.price =
                    Number(existingItem.item.price) * existingItem.count;
            } else {
                const newItem = {
                    item: {
                        ...action.payload.item,
                        price: Number(action.payload.item.price),
                    },
                    count: 1,
                    price: Number(action.payload.item.price),
                };
                state.items.push(newItem);
            }
            localStorage.setItem("readyForBuy", JSON.stringify(state.items));
        },
        incrementCount: (state, action) => {
            const itemToUpdate = state.items.find(
                (cartItem) => cartItem.item.id === action.payload
            );

            if (itemToUpdate) {
                itemToUpdate.count += 1;

                itemToUpdate.price =
                    itemToUpdate.item.price * itemToUpdate.count;
                localStorage.setItem(
                    "readyForBuy",
                    JSON.stringify(state.items)
                );
            }
        },
        decrementCount: (state, action) => {
            const itemToUpdate = state.items.find(
                (cartItem) => cartItem.item.id === action.payload
            );
            if (itemToUpdate && itemToUpdate.count > 1) {
                itemToUpdate.count -= 1;
                itemToUpdate.price =
                    itemToUpdate.item.price * itemToUpdate.count;
                localStorage.setItem(
                    "readyForBuy",
                    JSON.stringify(state.items)
                );
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(
                (item) => item.item.id !== action.payload
            );
            localStorage.setItem("readyForBuy", JSON.stringify(state.items));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProductStock.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateProductStock.fulfilled, (state) => {
                state.status = "succeeded";
                state.items = [];
                localStorage.clear();
            })
            .addCase(updateProductStock.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const {
    setCartItems,
    clearCart,
    incrementCount,
    decrementCount,
    removeItem,
    initializeCart,
    setToCart,
} = cartSlice.actions;

export default cartSlice.reducer;
