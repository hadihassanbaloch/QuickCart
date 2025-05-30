import '../styles/product.css'
function ProductCard({product, onAddToCart}) {
    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={`http://127.0.0.1:8000${product.image}`} alt={product.name} className='product-image'/>
            </div>
            <div className='card-content'>
                <button className="add-to-cart" onClick={() => onAddToCart(product)}>Add To Cart</button>
                <h1 className="product-name">{product.name}</h1>
                <span className="product-price">${product.price}</span>
            </div>                     
        </div>
    )
}
export default ProductCard;