import { useEffect, useState, useMemo } from "react";
import FeaturedProductItem from "./FeaturedProductItem";
import { useSearchParams } from "react-router-dom";
import SearchForm from "./SearchForm";
export default function FeaturedProductsWrapper() {
	const [getData, setGetData] = useState([]);
	const [fetching, setFetching] = useState(true);
	const [load, setLoad] = useState(0);
	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get("post") || "";

	useEffect(() => {
		if (fetching) {
			fetch(`https://dummyjson.com/products/?limit=6&skip=${load}`)
				.then((response) => response.json())
				.then((data) => {
					setGetData([...getData, ...data.products], data.products);
					setLoad(load + 6);
				})
				.finally(() => {
					setFetching(false);
				});
		}
	}, [fetching]);
	// console.log(
	// 	getData.forEach((cat) => console.log(cat.category))
	// );
	const products = useMemo(() => {
		return getData
			.filter((product) =>
				query === ""
					? true
					: product.title.toLowerCase().includes(query.toLowerCase())
			)
			.map((product) => {
				return (
					<FeaturedProductItem
						key={product.id}
						productId={product.id}
						productImage={
							<img
								src={product.thumbnail}
								alt={product.title}
							/>
						}
						productHeader={product.title}
						productPrice={product.price}
						productCount={product.stock}
					/>
				);
			});
	}, [getData, query]);

    
	useEffect(() => {
        const checkPosition = () => {
            const height = document.body.offsetHeight;
            const screenHeight = window.innerHeight;
            const scrolled = window.scrollY;
            const threshold = height - screenHeight / 2;
            const position = scrolled + screenHeight;
    
            if (position >= threshold && load <= getData.length) {
                setFetching(true);
            }
        };
		document.addEventListener("scroll", checkPosition);
		return () => {
			document.removeEventListener("scroll", checkPosition);
		};
	}, []);

	return (
		<>
			<div className="mv-2">
				<SearchForm
					query={query}
					setSearchParams={setSearchParams}
				/>
			</div>
			<div className="wrap-3 wrap-mh-3 wrap-mv-2 masonry text-center design-block">
				{products}
			</div>
			<div
				className="text-center text-green bold"
				style={{ display: fetching ? "block" : "none" }}>
				<p>LOADING....</p>
			</div>
		</>
	);
}
