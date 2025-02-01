import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsInCart, setToCart } from "../../store/cart/cartSlice";
import { cartIcon, inCartIcon } from "../UI/Fontawesome";

const CartButton = ({ product }) => {
    const dispatch = useDispatch();
    const inCart = useSelector((state) => selectIsInCart(state, product.id));

    const handleCart = () => {
        const cartItem = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            count: product.count,
            category: product.category,
            stock: product.stock,
            thumbnail: product.thumbnail,
        };

        dispatch(
            setToCart({
                item: cartItem
            })
        );
    };

    return (
        <div className="ml-1">
            {inCart ? (
                <Link to={`/cart`} className="inCart-icon">
                    {inCartIcon}
                </Link>
            ) : (
                <div
                    className="favorite-icon"
                    onClick={handleCart}
                    style={{ cursor: 'pointer' }}
                >
                    {cartIcon}
                </div>
            )}
        </div>
    );
};

export default CartButton;
