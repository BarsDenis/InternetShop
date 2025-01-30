import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectIsInCart } from "../../store/product/productSlice";
import { setToCart } from "../../store/cart/cartSlice";
import ImgProductSlider from "./ImgProductSlider";

export default function SingleTemplate({
    header,
    description,
    price,
    image,
    rating,
    thumbnail,
    stock,
}) {
    const dispatch = useDispatch();
    const id = useParams().id;
    const inCart = useSelector((state) => selectIsInCart(state, id));

    const handleAddToCart = () => {
        dispatch(
            setToCart({
                item: {
                    id,
                    title: header,
                    price,
                    thumbnail,
                    stock,
                },
                count: 1,
                price,
            })
        );
    };

    return (
        <>
            <div className="row">
                <div className="col basis-30">
                    <ImgProductSlider image={image} />
                </div>
                <div className="col">
                    <div className="mb-2 bold">
                        <h1>{header}</h1>
                    </div>
                    <div className="mb-2">
                        <p>{description}</p>
                    </div>
                    <div className="d-flex flex-jcsb">
                        <div className="mb-2 bold text-red">
                            <p>${price}</p>
                        </div>
                        <div className="bold text-green">
                            <p>Rating {rating}</p>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="mb-2 bold mr-2">
                            {inCart ? (
                                <div className="d-flex flex-aic">
                                    <div className="mr-1">Already in cart!</div>
                                    <Link
                                        to="/cart"
                                        className="btn btn-blue-inverted"
                                    >
                                        Go to Cart
                                    </Link>
                                </div>
                            ) : (
                                <button
                                    className="btn btn-blue-inverted"
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
