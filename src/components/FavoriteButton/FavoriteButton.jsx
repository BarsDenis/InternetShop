import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addFavorite, removeFavorite, selectIsInFavorite } from "../../store/favoriteList/favoriteListSlice";
import { favoriteIcon, inFavoriteIcon } from "../UI/Fontawesome";

const FavoriteButton = ({ product }) => {
    const dispatch = useDispatch();
    const inFavorite = useSelector((state) => selectIsInFavorite(state, product.id));
    console.log("product", product);
    console.log("inFavorite", inFavorite);

    const handleFavorite = (e) => {
        e.preventDefault();
        if (inFavorite) {
            dispatch(removeFavorite(product.id));
        } else {
            dispatch(addFavorite(product));
        }
    };
    return (
        <div className="mr-1">
            {inFavorite ? (
                <div 
                    className="favorite-icon"
                    onClick={handleFavorite}
                >
                    {inFavoriteIcon}
                </div>
            ) : (
                <Link
                    className="favorite-icon"
                    onClick={handleFavorite}
                >
                    {favoriteIcon}
                </Link>
            )}
        </div>
    );
};

export default FavoriteButton;
