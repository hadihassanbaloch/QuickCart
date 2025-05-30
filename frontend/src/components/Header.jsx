import { Link } from 'react-router-dom';
import '../styles/header.css';
import { FaHome, FaShoppingCart } from 'react-icons/fa';
function Header({ cartCount }) {
  return (
    <header className="header">
      <div className="logo">
        <span role="img" aria-label="logo">QuickCart</span> 
      </div>
      <nav>
        <Link to="/" className="nav-link"><FaHome size={24} /></Link>
        <Link to="/cart" className="nav-link cart-icon">
          <FaShoppingCart size={24} />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </nav>
    </header>
  );
}
export default Header;
