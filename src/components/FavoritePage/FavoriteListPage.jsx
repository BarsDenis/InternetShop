import FavoriteProductList from "./FavoriteProductList";

export default function FavoriteListPage({ favoriteList }) {
    return (
        <section>
            <div className="container">
                <div className="text-center bold mb-2">
                    <h1>Favorite List</h1>
                </div>
                <FavoriteProductList />
            </div>
        </section>
    );
}
