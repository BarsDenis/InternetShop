import { useEffect, useState } from "react";

export default function CartItem({
    image,
    title,
    price,
    stock,
    deleteBtn,
    handleMinus,
    handlePlus,
    count,
}) {
    const [total, setTotal] = useState(price);

    const priceSumm = useEffect(() => {
        setTotal(count * price);
    }, [count]);

    return (
        <div className="item-wrapper bg-beige p-2 mb-2">
            <div className="d-flex flex-jcsb flex-aic">
                <div className="mr-1">
                    <img src={image} alt={title} />
                </div>
                <div>
                    <div className="mv-1  h3-style bold">{title}</div>

                    <div className="d-flex flex-jcsb ">
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
                <div className="bold mb-2 mr-2">
                    <div className="mb-1 bold h3-style">Total Price:</div>
                    <div className="mb-1 bold h5-style">  ${total.toFixed(2)} </div>
                    </div>
            </div>
        </div>
    );
}
