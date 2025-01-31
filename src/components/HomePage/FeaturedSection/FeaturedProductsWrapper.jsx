import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FeaturedProductItem from "./FeaturedProductItem";
import SearchForm from "../SearchForm";

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


    const products = getData
        .filter((product) =>
            query === ""
                ? true
                : product.title.toLowerCase().includes(query.toLowerCase())
        )
        .map((product) => {
            return (
                <FeaturedProductItem
                    key={product.id}
                    id={product.id}
                    image={product.thumbnail}  
                    title={product.title}
                    price={product.price}
                    count={product.stock}
                    thumbnail={product.thumbnail}
                    stock={product.stock}
                />
            );
        });

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
                <SearchForm query={query} setSearchParams={setSearchParams} />
            </div>
            <div className="wrap-3 wrap-mh-3 wrap-mv-2 masonry text-center design-block">
                {products}
            </div>
            <div
                className="text-center text-green bold"
                style={{ display: fetching ? "block" : "none" }}
            >
                <p>LOADING....</p>
            </div>
        </>
    );
}
