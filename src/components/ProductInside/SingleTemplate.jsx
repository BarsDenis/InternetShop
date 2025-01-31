import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectIsInCart, setToCart } from "../../store/cart/cartSlice";
import ImgProductSlider from "./ImgProductSlider";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

export default function SingleTemplate({
    header,
    description,
    price,
    image,
    rating,
    thumbnail,
    stock,
    category,
    count,
}) {
    const dispatch = useDispatch();
    const id = useParams().id;
    const inCart = useSelector((state) => selectIsInCart(state, Number(id)));
    console.log(inCart);

    const handleCart = () => {
        const productData  = {
            id: Number(id),
            title: header,
            price: Number(price),
            thumbnail: thumbnail,
            count: 1,
            stock: Number(stock),
            category: category || ""
        };

        dispatch(
            setToCart({
                item: productData
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
                    <div className="d-flex flex-jcsb flex-aic mb-2">
                        <div className="bold">
                            <h1>{header}</h1>
                        </div>
                        <div className="ml-2 ">
                            <FavoriteButton
                                product={{
                                    id,
                                    title: header,
                                    price,
                                    thumbnail,
                                    stock,
                                }}
                            />
                        </div>
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
                                    onClick={handleCart}
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
