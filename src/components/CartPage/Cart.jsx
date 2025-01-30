import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart, updateProductStock, initializeCart } from "../../store/cart/cartSlice";
import CartItem from "./CartItem";


export default function Cart() {
    const dispatch = useDispatch();

    const { items, status } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(initializeCart());
    }, [dispatch]);

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleBuyItems = () => {
        dispatch(updateProductStock(items));
        items.forEach((product) => {
            fetch(`https://dummyjson.com/products/${product.item.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    stock: `${product.item.stock - product.count} `,
                }),
            })
                .then((res) => res.json())
                .then(console.log);
        });
    };

    const cartArr = items?.map(({ item, count, price }) => (
        <CartItem key={item.id} item={item} count={count} price={price} />
    ));

    return (
        <section>
            <div className="container">
                <div className="text-center bold mb-2">
                    <h2>Cart</h2>
                </div>
                <div className="mb-2 text-right">
                    {cartArr?.length > 0 && (
                        <button
                            className="btn btn-red-dimm"
                            onClick={handleClearCart}
                        >
                            Clear All
                        </button>
                    )}
                </div>
                {cartArr?.length > 0 ? (
                    <>
                        {cartArr}
                        <div className="text-center">
                            <button
                                onClick={handleBuyItems}
                                disabled={status === "loading"}
                                className="btn btn-blue"
                            >
                                {status === "loading" ? "Processing..." : "Buy"}
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center bold mb-2">
                        <div className="mb-2 text-red">
                            <h2>Cart is empty</h2>
                        </div>
                        <div>
                            <Link to="/" className="btn btn-blue-inverted">
                                Go to Shop
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
