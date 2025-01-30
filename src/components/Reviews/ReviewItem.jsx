export default function ReviewItem({ review }) {
    return (
        <div className="review-item p-2 bg-beige mb-2">
            <div className="text-red mb-1 d-flex flex-jcsb">
                <div className="review-date text-red">
                    {new Date(review.date).toLocaleDateString()}
                </div>
                <div className="review-name text-red">{review.name}</div>
            </div>
            <div className="review-comment text-center bold">
                {review.comment}
            </div>
            <div className="review-header">
                <div className="review-rating">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                </div>
                <div className="review-email text-blue">{review.email}</div>
            </div>
        </div>
    );
}
