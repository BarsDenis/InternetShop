import { NavLink } from "react-router-dom";

export default function HeaderNavList ({navLink, navItem}) {
    return (
        <li>

            <NavLink to={navLink}>{navItem}</NavLink>
        </li>
    )
}