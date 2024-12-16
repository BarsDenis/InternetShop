import FeaturedProductsWrapper from "./FeaturedProductsWrapper";

export default function FeaturedSection () {
    
    return (
        <section>
            <div className="container">
                <div className="text-center text-black-alt bold">
                    <h1>FEATURED PRODUCTS</h1>
                </div>
                <FeaturedProductsWrapper/>
            </div>
        </section>
    )
}