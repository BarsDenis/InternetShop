import SingleTemplate from "./singleTemplate";
import Reviews from "./Reviews";
import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

export default function ProductInside() {
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

	const reviews = product.reviews?.map((review, index) => {
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
	});

	const storageArr = JSON.parse(localStorage.getItem("readyForBuy")) || [];
	const storage = useCallback(() => {
		storageArr.push(product);
		const test = JSON.stringify(storageArr);
		localStorage.setItem("readyForBuy", test);
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
