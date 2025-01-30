import { useDispatch } from "react-redux";
import {
    incrementCount,
    decrementCount,
    removeItem,
} from "../../store/cart/cartSlice";

export default function CartItem({ item, count, price }) {
    const dispatch = useDispatch();

     const handleIncrement = () => {
        dispatch(incrementCount(item.id));
    };

    const handleDecrement = () => {
        dispatch(decrementCount(item.id));
    };
    const handleDelete = () => {
        dispatch(removeItem(item.id));
    };
    return (
        <div className="item-wrapper bg-beige p-1 mb-2">
            <div className="d-flex flex-aic flex-jcsb">
                <div className="mr-1">
                    <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="item-image"
                    />
                </div>
                <div className="basis-60">
                    <div className="mb-1 h3-style bold">{item.title}</div>
                    <div className="d-flex flex-jcsb flex-aic">
                        <div className="mb-2 d-flex">
                            <button
                                style={{
                                    width: 30,
                                    height: 30,
                                    backgroundColor: "white",
                                    color: "black",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    border: "1px solid black",
                                    marginRight: 10,
                                }}
                                onClick={handleDecrement}
                                disabled={count <= 1}
                            >
                                -
                            </button>
                            <div style={{ width: 30, height: 30 }}>{count}</div>
                            <button
                                style={{
                                    width: 30,
                                    height: 30,
                                    backgroundColor: "white",
                                    color: "black",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    border: "1px solid black",
                                }}
                                onClick={handleIncrement}
                                disabled={count >= item.stock}
                            >
                                +
                            </button>
                        </div>
                        <div className="bold mb-2 mr-2">
                            <div className="mb-1 bold h3-style">
                                Total Price:
                            </div>
                            <div className="mb-1 bold h5-style">
                                ${price.toFixed(2)}
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={handleDelete}
                            className="btn btn-red-dimm"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
