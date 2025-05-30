import '../styles/cart.css';

function CartPage({ cartItems, onRemove, onQuantityChange }) {
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2);

  return (
    <div className="cart-page">
      <h2>Your Cart 🛒</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={item.product.id} className="cart-item">
                <img src={`http://127.0.0.1:8000${item.product.image}`} alt={item.product.name} className="cart-thumb" />
                <div className="cart-info">
                  <h3>{item.product.name}</h3>
                  <p>${item.product.price.toFixed(2)} x {item.quantity} = ${(item.product.price * item.quantity).toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => onQuantityChange(item.product.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onQuantityChange(item.product.id, 1)}>+</button>
                  </div>
                </div>
                <div className="cart-actions">
                  <button onClick={() => onRemove(item.product.id)} className="remove-btn">🗑️</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ${total}</h3>
            <a href="/checkout" className="checkout-btn">Proceed to Checkout</a>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
