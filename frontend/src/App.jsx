import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import axios from 'axios';
import groupByCategory from './utils/groupByCategory';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Fetch error", err));
  }, []);

  const groupedProducts = groupByCategory(products);

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleQuantityChange = (productId, delta) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="container-app">
      <Header cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
      <Routes>
        <Route
          path="/"
          element={<HomePage products={groupedProducts} onAddToCart={handleAddToCart} />}
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cartItems}
              onRemove={handleRemoveFromCart}
              onQuantityChange={handleQuantityChange}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              cartItems={cartItems}
              onClearCart={handleClearCart}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
