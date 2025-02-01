import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectFavoriteItems } from "../../store/favoriteList/favoriteListSlice.js";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import CartButton from "../CartButton/CartButton";

export default function FavoriteProductList() {
    const favoriteItems = useSelector(selectFavoriteItems);

  
    if (!favoriteItems || favoriteItems.length === 0) {
        return (
            <div className="h3-style bold text-center mt-3">
                No favorite items found
            </div>
        );
    }

    const favoriteList = favoriteItems.map((item) => {
       

        return (
            <div key={item.id}>
                <div className="masonry-inner product-item">
                    <Link
                        to={`/product/${item.id}`}
                        className="product-item-link"
                    >
                        <div style={{ height: 300 }}>
                            {item.image ? (
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                            ) : (
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                            )}
                        </div>

                        <div className="h3-style bold mb-2  mt-1 text-purple fg-1">
                            <div>{item.category}</div>
                            {item.title}
                        </div>
                        <div className="d-flex flex-jcsa bold text-purple font-size-l mb-1">
                            <div>Price: ${item.price}</div>
                            <div>Stock: {item.stock}</div>
                        </div>
                    </Link>
                    <div className="favorite-wrapper d-flex flex-jcsb">
                        <CartButton
                            product={{
                                id: item.id,
                                title: item.title,
                                price: item.price,
                                image: item.image,
                                count: item.count,
                                category: item.category,
                                thumbnail: item.thumbnail,
                            }}
                        />

                        <FavoriteButton
                            product={{
                                id: item.id,
                                title: item.title,
                                price: item.price,
                                thumbnail: item.thumbnail,
                                stock: item.stock,
                                category: item.category,
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="wrap-3 wrap-mh-3 wrap-mv-2 masonry text-center design-block">
            {favoriteList}
        </div>
    );
}
