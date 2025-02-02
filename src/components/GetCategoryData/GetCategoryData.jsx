import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import FeaturedProductItem from "../HomePage/FeaturedSection/FeaturedProductItem";

export default function GetCategoryData() {
    const [getData, setGetData] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [load, setLoad] = useState(0);
    const link = useLocation().pathname;
    const category = link.split("/").pop();

    useEffect(() => {
        if (fetching) {
            fetch(
                `https://dummyjson.com/products/category/${link}/?limit=8&skip=${load}`
            )
                .then((response) => response.json())
                .then((data) => {
                    setGetData([...getData, ...data.products], data.products);
                    setLoad(load + 8);
                })
                .finally(() => {
                    setFetching(false);
                });
        }
    }, [fetching, link]);

    const products = useMemo(() => {
        return getData.map((product) => {
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
    }, [getData]);

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

    useEffect(() => {
        document.addEventListener("scroll", checkPosition);
        return () => {
            document.removeEventListener("scroll", checkPosition);
        };
    }, [checkPosition]);
    return (
        <>
            <section>
                <div className="container">
                    <div className="h1-style text-center bold mb-2 text-black0alt">
                        {category.toUpperCase()} PRODUCTS
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
                </div>
            </section>
        </>
    );
}
