import { useState } from "react";
import { useDispatch } from "react-redux";
import { addReview } from "../../store/reviews/reviewsSlice";

export default function ReviewForm({ productId }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        rating: 5,
        comment: "",
        name: "",
        email: "",
        date: new Date().toISOString(),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            addReview({
                productId,
                review: {
                    ...formData,
                    userId: 1,
                    date: new Date().toISOString(),
                },
            })
        );
        setFormData({ rating: 5, comment: "" });
    };

    return (
        <form onSubmit={handleSubmit} className="review-form">
            <div className="form-group">
                <label htmlFor="rating">Rating:</label>
                <select
                    id="rating"
                    value={formData.rating}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            rating: Number(e.target.value),
                        })
                    }
                >
                    {[5, 4, 3, 2, 1].map((num) => (
                        <option key={num} value={num}>
                            {num} Star{num !== 1 ? "s" : ""}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <div className="row flex-jcsb mb-1">
                    <div className="col">
                        <input
                            type="text"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="col">
                        <input
                            type="email"
                            placeholder="Your email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <label htmlFor="comment">Your Review:</label>
                <textarea
                    id="comment"
                    value={formData.comment}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            comment: e.target.value,
                        })
                    }
                    required
                    minLength={10}
                    rows={4}
                />
            </div>

            <button type="submit" className="btn btn-blue">
                Submit Review
            </button>
        </form>
    );
}
