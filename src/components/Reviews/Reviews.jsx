import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchReviews,
    selectAllReviews,
    selectReviewsStatus,
    selectReviewsError,
    clearReviews,
} from "../../store/reviews/reviewsSlice";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";

import "./reviewsModule/reviewsModule.scss";

export default function Reviews({ productId }) {
    const dispatch = useDispatch();
    const reviews = useSelector(selectAllReviews);
    const status = useSelector(selectReviewsStatus);
    const error = useSelector(selectReviewsError);

    useEffect(() => {
        dispatch(fetchReviews(productId));

        return () => {
            dispatch(clearReviews());
        };
    }, [productId, dispatch]);

    if (status === "loading") {
        return <div className="reviews-loading">Loading reviews...</div>;
    }

    if (status === "failed") {
        return <div className="reviews-error">Error: {error}</div>;
    }

    return (
        <div className="reviews-section">
            <h2>Customer Reviews</h2>
            <ReviewForm productId={productId} />

            {reviews.length === 0 ? (
                <p>No NEW reviews yet. Be the first to review this product!</p>
            ) : (
                <div className="reviews-list">
                    {reviews.map((review) => (
                        <ReviewItem key={review.id} review={review} />
                    ))}
                </div>
            )}
        </div>
    );
}
