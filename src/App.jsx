import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Beauty from "./components/Beauty";
import Fragrances from "./components/Fragrances";
import Layout from "./components/Layout";
import SingleProductPage from "./components/SingleProductPage";
import Groceries from "./components/Groceries";
import Furniture from "./components/Furniture";
import Cart from "./components/CartPage/Cart";
import FavoriteListPage from "./components/FavoritePage/FavoriteListPage";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="" element={<Home />} />
        <Route path="/product/:id" element={<SingleProductPage />} />
        <Route path="/beauty" element={<Beauty />} />
        <Route path="/fragrances" element={<Fragrances />} />
        <Route path="/groceries" element={<Groceries />} />
        <Route path="/furniture" element={<Furniture />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorite-list" element={<FavoriteListPage />} />

      </Route>
    </Routes>
  );
}
