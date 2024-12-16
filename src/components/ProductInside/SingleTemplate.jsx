import { Link } from "react-router-dom";

export default function SingleTemplate({
    header,
    description,
    price,
    image,
    rating,
    addToBasket
}) {
    return (
        <>
            <div className="row">
                <div className="col">{image}</div>
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
                            <button className="btn btn-blue-inverted" onClick={addToBasket}>
                                Add to Basket
                            </button>
                        </div>
                        <div className="mb-2 bold">
                            <Link to="/cart" className="btn btn-blue-inverted">
                                Go to Cart
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}