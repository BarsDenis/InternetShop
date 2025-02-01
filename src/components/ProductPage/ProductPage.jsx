import Reviews from "../Reviews/Reviews";

export default function ProductPage() {
    const { id } = useParams();

    return (
        <div className="product-page">
            <Reviews productId={id} />
        </div>
    );
}
