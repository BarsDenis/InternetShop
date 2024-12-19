import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

export default function Cart() {
    const [empty, setEmpty] = useState(true);
    const [cartlist, setCartList] = useState([]);
    const deleteAllCart = () => {
        localStorage.clear();
        setCartList([]);
    };
    useEffect(() => {
        setCartList(JSON.parse(localStorage.getItem("readyForBuy")));
        if (cartlist === null) {
            // localStorage.setItem("readyForBuy", JSON.stringify([]));
            setEmpty(true);
        }
        console.log("unside", cartlist);
    }, []);

    const deleteBtn = (e) => {
        let btn = e.target;
        let parent = btn.closest(".item-wrapper");
        let title = parent.querySelector(".h3-style").innerText;
        let filter = cartlist.filter((item) => item.title !== title);
        localStorage.setItem("readyForBuy", JSON.stringify(filter));
        setCartList(filter);
        console.log("delete", cartlist);
    };

    const cartArr = cartlist?.map((item, index) => {
        return (
            <CartItem
                key={index}
                image={item.thumbnail}
                title={item.title}
                price={item.price}
                stock={item.stock}
                deleteBtn={deleteBtn}
            />
        );
    });

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
                            onClick={deleteAllCart}
                        >
                            Clear All
                        </button>
                    )}
                </div>
                {cartArr?.length > 0 ? (
                    cartArr
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
