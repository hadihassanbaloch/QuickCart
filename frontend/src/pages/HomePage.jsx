import ProductGrid from "../components/ProductGrid";
function HomePage({ products, onAddToCart }) {
    return (
        <>
            {products.map(group => (
                <div key={group.category} className="category-section">
                    <h2 >{group.category}</h2>
                    <ProductGrid
                        products={group.items}
                        onAddToCart={onAddToCart} />
                </div>
            ))}
        </>
    )
}
export default HomePage;