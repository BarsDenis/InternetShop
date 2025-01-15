import SingleTemplate from "./SingleTemplate";
import Reviews from "./Reviews";
import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState, useMemo } from "react";

export default function ProductInside() {
	// localStorage.clear()
	const id = useParams().id;
	const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	};
	const [product, setProduct] = useState({});

	useEffect(() => {
		fetch(`https://dummyjson.com/products/${id}`)
			.then((response) => response.json())
			.then((data) => {
				setProduct(data);
			});
	}, []);
	const reviews = useMemo(
		() =>
			product.reviews?.map((review, index) => {
				return (
					<Reviews
						key={index}
						reviewDate={review.date}
						reviewComment={review.comment}
						reviewRating={review.rating}
						reviewMail={review.reviewerEmail}
						reviewName={review.reviewerName}
					/>
				);
			}),
		[product.reviews]
	);

	const storageArr = JSON.parse(localStorage.getItem("readyForBuy")) || [];
	const storage = useCallback(() => {
		storageArr.push(product);
		const convertToObj = storageArr.map((product) => {
			return {
				item: product,
				count: 1,
				price: product.price,
			};
		});
		console.log("test", convertToObj);
		const local = JSON.stringify(convertToObj);
		console.log("local", local);
		localStorage.setItem("readyForBuy", local);
	}, [product]);

	return (
		<section>
			<div className="container wide">
				<div className="design-block text-black mb-2">
					<a onClick={goBack}>Go Back</a>
				</div>
			</div>
			<div className="container">
				<SingleTemplate
					image={product.images?.map((imageURL, index) => {
						return (
							<img
								key={index}
								src={imageURL}
								alt={product.title}
							/>
						);
					})}
					header={product.title}
					description={product.description}
					price={product.price}
					rating={product.rating}
					addToBasket={storage}
				/>
				{reviews}
			</div>
		</section>
	);
}
