// src/components/ProductPage/ProductPage.jsx
import Reviews from '../Reviews/Reviews';

export default function ProductPage() {
    const { id } = useParams();
    
    return (
        <div className="product-page">
            {/* Other product details */}
            <Reviews productId={id} />
        </div>
    );
}
