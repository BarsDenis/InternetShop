import { useState, useEffect, useMemo } from "react";
import FeaturedProductItem from "./FeaturedSection/FeaturedProductItem";
import { useLocation } from "react-router-dom";

export default function Furniture() {
  const [getData, setGetData] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [load, setLoad] = useState(0);
  const link = useLocation().pathname
  console.log(link)
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
          productId={product.id}
          productCat={product.category}
          productImage={<img src={product.thumbnail} alt={product.title} />}
          productHeader={product.title}
          productPrice={product.price}
          productCount={product.stock}
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
        <div className="h1-style text-center bold mb-2 text-black0alt">Furniture Products</div>
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
