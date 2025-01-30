import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { removeItem } from '../cart/cartSlice';


export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
    async (id) => {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        return data;
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: {},
        status: 'idle',
        error: null,
        inCart: false,
        cartItems: JSON.parse(localStorage.getItem("readyForBuy")) || [] 
    },
    reducers: {
        setInCart: (state, action) => {
            state.inCart = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.product = action.payload;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(removeItem, (state, action) => {
                state.inCart = false;
            });
    }
});


export const selectIsInCart = (state, productId) => {
    return state.cart.items.some(item => item.item.id === productId);
};

export const { setInCart  } = productSlice.actions;
export default productSlice.reducer;
