import CartItemCounter from "./CartItemCounter";
// import CartItemPrice from "./CartItemPrice";
export default function CartItem({
    image,
    title,
    price,
    deleteBtn,
    stock,
    minusProductCount,
    plusProductCount,
    count
}) {
    return (
		<div className="item-wrapper bg-beige p-1 mb-2">
			<div className="d-flex flex-aic flex-jcsb">
				<div className="mr-1">
					<img
						src={image}
						alt={title}
					/>
				</div>

				<div className="basis-60">
					<div className="mb-1 h3-style bold">
						{title}
					</div>
					<CartItemCounter
						price={price}
						stock={stock}
						minusProductCount={minusProductCount}
						plusProductCount={plusProductCount}
						value={count}
					/>

					<div>
						<button
							onClick={deleteBtn}
							className="btn btn-red-dimm">
							Remove
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
