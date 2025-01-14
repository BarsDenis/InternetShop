import { useState, useEffect } from "react";

export default function CartItemCounter({
    price,
    value,
    minusProductCount,
    plusProductCount,
    
}) {
    // const [count, setCount] = useState(1);
    const [totalPrice, setTotalPrice] = useState(price);

    // const handleMinus = () => {
    //     count > 1 ? setCount(count - 1) : false;
    //     return minusProductCount(count);
    // };

    // const handlePlus = () => {
    //     count >= stock ? false : setCount(count + 1);
    //     return plusProductCount(count);
    // };

    useEffect(() => {
        setTotalPrice(value * price);
    }, [value]);

    return (
        <div className="d-flex flex-jcsb ">
            <div className="mb-2 d-flex">
                <button
                    onClick={minusProductCount}
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
                <div style={{ width: 30, height: 30 }}>{value}</div>
                <button
                    onClick={plusProductCount}
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
            <div className="bold mb-2 mr-2">
                <div className="mb-1 bold h3-style">Total Price:</div>
                <div className="mb-1 bold h5-style">
                    
                    ${totalPrice.toFixed(2)}
                </div>
            </div>
        </div>
    );
}
