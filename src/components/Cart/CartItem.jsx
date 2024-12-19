import { useState } from "react";

export default function CartItem({ image, title, price, stock, deleteBtn }) {
    const [count, setCount] = useState(1);
    const handleMinus = () => {
        count > 1 ? setCount(count - 1) : false;
    };

    const handlePlus = () => {
        count >= stock ? false : setCount(count + 1);
    };



    return (
        <div className="item-wrapper bg-beige p-2 mb-2">
            <div className="d-flex flex-aic">
                <div className="mr-1">
                    <img src={image} alt={title} />
                </div>
                <div>
                    <div className="mb-1 h3-style bold">{title}</div>
                    <div className="bold mb-2">${price * count}</div>
                    <div className="mb-2 d-flex">
                        <button
                            onClick={handleMinus}
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
                        >
                            -
                        </button>
                        <div style={{ width: 30, height: 30 }}>{count}</div>
                        <button
                            onClick={handlePlus}
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
                        >
                            +
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={deleteBtn}
                            className="btn btn-red-dimm"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
