import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

export default function Cart() {
	const [cartlist, setCartList] = useState([]);
	const [productCount, setProductCount] = useState({});
	useEffect(() => {
		setCartList(JSON.parse(localStorage.getItem("readyForBuy")));
	}, [productCount]);
  
	const deleteAllCart = () => {
		localStorage.clear();
		setCartList([]);
	};

	const minusProductCount = (e) => {
		let btn = e.target;
		let parent = btn.closest(".item-wrapper");
		let title = parent.querySelector(".h3-style").innerText;

		cartlist.forEach((product) => {
			if (product.item.title === title && product.count > 1) {
				setProductCount(product.count--);
			}
		});
		localStorage.setItem("readyForBuy", JSON.stringify(cartlist));
	};

	const plusProductCount = (e) => {
		let btn = e.target;
		let parent = btn.closest(".item-wrapper");
		let title = parent.querySelector(".h3-style").innerText;

		cartlist.forEach((product) => {
			if (
				product.item.title === title &&
				product.count < product.item.stock
			) {
				setProductCount(product.count++);
			}
		});
		const local = JSON.stringify(cartlist);
		localStorage.setItem("readyForBuy", local);
	};

	const deleteBtn = (e) => {
		let btn = e.target;
		let parent = btn.closest(".item-wrapper");
		let title = parent.querySelector(".h3-style").innerText;
		let filter = cartlist.filter((product) => product.item.title !== title);
		localStorage.setItem("readyForBuy", JSON.stringify(filter));
		setCartList(filter);
	};

	const cartArr = cartlist?.map(({ item, count, price }, index) => {
    // console.log("cartlist",cartlist);
      console.log("item", item);

		return (
			<CartItem
				count={count}
				price={price}
				key={index}
				image={item.thumbnail}
				title={item.title}
				// price={item.price}
				stock={item.stock}
				deleteBtn={deleteBtn}
				minusProductCount={minusProductCount}
				plusProductCount={plusProductCount}
			/>
		);
	});

  

	const buyItems = () => {
		localStorage.clear();
		setCartList([]);
		cartlist.forEach((product) => {
			fetch(`https://dummyjson.com/products/${product.item.id}`, {
				method: "PUT" /* or PATCH */,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					stock: `${product.item.stock - product.count} `,
				}),
			})
				.then((res) => res.json())
				.then(console.log);
		});
	};

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
							onClick={deleteAllCart}>
							Clear All
						</button>
					)}
				</div>
				{cartArr?.length > 0 ? (
					cartArr && (
						<>
							{cartArr}
							<div className="text-center">
								<button
									onClick={buyItems}
									className="btn btn-blue">
									Buy
								</button>
							</div>
						</>
					)
				) : (
					<div className="text-center bold mb-2">
						<div className="mb-2 text-red">
							<h2>Cart is empty</h2>
						</div>
						<div>
							<Link
								to="/"
								className="btn btn-blue-inverted">
								Go to Shop
							</Link>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
