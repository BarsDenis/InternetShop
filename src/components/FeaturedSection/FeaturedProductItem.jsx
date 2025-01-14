import { memo } from "react";
import { Link } from "react-router-dom";

function FeaturedProductItem({
  productImage,
  productHeader,
  productPrice,
  productCount,
  productId,
  productCat
}) {
  return (
    <div>
      <Link to={`/product/${productId}`} className="masonry-inner">
        <div style={{height: 300}}>{productImage}</div>
        <div>{productCat}</div>
        <div className="h3-style bold mb-2 text-purple">{productHeader}</div>
        <div className="d-flex flex-jcsa bold text-red font-size-l">
          <div>Price: ${productPrice}</div>
          <div>Stock: {productCount}</div>
        </div>
      </Link>
    </div>
  );
}

export default memo(FeaturedProductItem);