import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImgProductSlider from "./ImgProductSlider";

export default function SingleTemplate({
    header,
    description,
    price,
    image,
    rating,
    addToBasket,
}) {
    const [inCart, setInCart] = useState(false);

    const id = useParams().id;


    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("readyForBuy"));
        const alreadyInCart = cart?.find((product) => product.item.id == id);
        alreadyInCart ? setInCart(true) : setInCart(false);
    }, [id]);


    const addToCart = () => {
        addToBasket();
        setInCart(true);
    };

    return (
        <>
            <div className="row">
                <div className="col basis-30">
                    <ImgProductSlider image={image} />
                </div>
                <div className="col">
                    <div className="mb-2 bold">
                        <h1> {header}</h1>
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
                                    onClick={addToCart}
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
