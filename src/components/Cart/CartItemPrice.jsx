import { useState, useEffect } from "react";

export default function CartItemPrice({ total}) {
   
   
   

    return (
        <div className="bold mb-2 mr-2">
            <div className="mb-1 bold h3-style">Total Price:</div>
            <div className="mb-1 bold h5-style"> ${total} </div>
        </div>
    );
}
