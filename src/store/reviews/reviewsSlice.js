import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const mockReviews = [
    {
        id: 1,
        productId: 1,
        userId: 1,
        rating: 5,
        comment: "Great product! Exactly what I needed.",
        date: "2024-01-15T10:00:00.000Z"
    },
    {
        id: 2,
        productId: 1,
        userId: 2,
        rating: 4,
        comment: "Good quality, but shipping took longer than expected.",
        date: "2024-01-14T15:30:00.000Z"
    }
];

export const fetchReviews = createAsyncThunk(
    'reviews/fetchReviews',
    async (productId) => {
        try {
            return mockReviews.filter(review => review.productId === productId);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            throw error;
        }
    }
);

export const addReview = createAsyncThunk(
    'reviews/addReview',
    async ({ productId, review }) => {
        try {
            const newReview = {
                id: Date.now(), 
                productId,
                ...review,
                date: new Date().toISOString()
            };
            return newReview;
        } catch (error) {
            console.error('Error adding review:', error);
            throw error;
        }
    }
);

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {
        clearReviews: (state) => {
            state.items = [];
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addReview.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items.push(action.payload);
            })
            .addCase(addReview.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const selectAllReviews = (state) => state.reviews.items;
export const selectReviewsStatus = (state) => state.reviews.status;
export const selectReviewsError = (state) => state.reviews.error;

export const { clearReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
