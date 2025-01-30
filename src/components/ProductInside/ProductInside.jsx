import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../store/product/productSlice';
import { setToCart } from '../../store/cart/cartSlice';
import SingleTemplate from "./SingleTemplate";
import Reviews from "./Reviews";


export default function ProductInside() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { product, status, error } = useSelector(state => state.product);
    useEffect(() => {
        dispatch(fetchProduct(id));
    }, [dispatch, id]);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleAddToBasket = () => {
        dispatch(setToCart(product));
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <section>
            <div className="container wide">
                <div className="design-block text-black mb-2">
                    <a onClick={handleGoBack}>Go Back</a>
                </div>
            </div>
            <div className="container">
                <SingleTemplate
                    image={product.images?.map((imageURL, index) => (
                        <img
                            key={index}
                            src={imageURL}
                            alt={product.title}
                        />
                    ))}
                    header={product.title}
                    description={product.description}
                    price={product.price}
                    rating={product.rating}
                    thumbnail={product.thumbnail}
                    stock={product.stock}
                    addToBasket={handleAddToBasket}
                />
                {product.reviews?.map((review, index) => (
                    <Reviews
                        key={index}
                        reviewDate={review.date}
                        reviewComment={review.comment}
                        reviewRating={review.rating}
                        reviewMail={review.reviewerEmail}
                        reviewName={review.reviewerName}
                    />
                ))}
            </div>
        </section>
    );
}
