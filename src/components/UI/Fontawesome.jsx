import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
    faCartShopping,
    faCartArrowDown,
    faHeartCircleCheck,
} from "@fortawesome/free-solid-svg-icons";


export const favoriteIcon = <FontAwesomeIcon icon={faHeart} />;
export const inFavoriteIcon = <FontAwesomeIcon icon={faHeartCircleCheck} />;
export const cartIcon = <FontAwesomeIcon icon={faCartShopping} />;
export const inCartIcon = <FontAwesomeIcon icon={faCartArrowDown} />;