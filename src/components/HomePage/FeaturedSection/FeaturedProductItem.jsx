import { memo } from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "../../FavoriteButton/FavoriteButton";
import CartButton from "../../CartButton/CartButton";

function FeaturedProductItem({
    image,
    title,
    price,
    count,
    id,
    category,
    thumbnail,
    stock
}) {
    return (
        <div>
            <div className="masonry-inner product-item">
                <Link to={`/product/${id}`} className="product-item-link">
                    <div style={{ height: 300 }}><img 
                            src={image} 
                            alt={title}
                            
                        /></div>
                    <div>{category}</div>
                    <div className="h3-style bold mb-2 mt-1 text-purple fg-1">
                        {title}
                    </div>
                    <div className="d-flex flex-jcsa bold text-purple font-size-l mb-1">
                        <div>Price: ${price}</div>
                        <div>Stock: {count}</div>
                    </div>
                </Link>
                <div className="favorite-wrapper d-flex flex-jcsb">
                    <CartButton
                        product={{
                            id: id,
                            title: title,
                            price: price,
                            image: image,
                            count: count,
                            category: category,
                            stock: stock,
                            thumbnail: thumbnail,
                        }}
                    />
                    <FavoriteButton
                        product={{
                            id,
                            title,
                            price,
                            thumbnail,
                            count,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default memo(FeaturedProductItem);
