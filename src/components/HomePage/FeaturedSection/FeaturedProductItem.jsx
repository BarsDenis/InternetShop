import { memo } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function FeaturedProductItem({
  productImage,
  productHeader,
  productPrice,
  productCount,
  productId,
  productCat,
}) {
  const favoriteIcon = <FontAwesomeIcon icon={faHeart} />;
  const cartIcon = <FontAwesomeIcon icon={faCartShopping} />;

  return (
    <div>
      <div className="masonry-inner product-item">
        <Link to={`/product/${productId}`} className="product-item-link">
          <div style={{ height: 300 }}>{productImage}</div>
          <div>{productCat}</div>
          <div className="h3-style bold mb-2  mt-1 text-purple fg-1">
            {productHeader}
          </div>
          <div className="d-flex flex-jcsa bold text-purple font-size-l mb-1">
            <div>Price: ${productPrice}</div>
            <div>Stock: {productCount}</div>
          </div>
        </Link>
        <div className="favorite-wrapper d-flex flex-jcsb">
          <div className="ml-1">
            <Link to={`/product/${productId}`} className="favorite-icon">
              {cartIcon}
            </Link>
          </div>
          <div className="mr-1">
            <Link to={`/product/${productId}`} className="favorite-icon">
              {favoriteIcon}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(FeaturedProductItem);
