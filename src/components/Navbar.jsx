import { Link, useNavigate } from 'react-router-dom'
import { FaArrowRight, FaShoppingBag } from 'react-icons/fa'
import useAuth from '../hooks/useAuth'
import useCart from '../hooks/useCart'
import '../style/Navbar.css'

function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const { items } = useCart()
  const navigate = useNavigate()

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="site-header">
      <div className="announcement-bar">
        <span>Thoughtful finds, delivered to your door.</span>
        <Link to="/products">Discover what’s new <FaArrowRight aria-hidden="true" /></Link>
      </div>
      <nav className="navbar" aria-label="Main navigation">
        <Link to="/" className="navbar-brand" aria-label="Nexus home">
          <span className="brand-mark">N</span>
          <span className="brand-name">Nexus<small>GOOD THINGS, FOUND.</small></span>
        </Link>

        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/products">Shop</Link>
          {isAuthenticated && <Link to="/admin">Admin</Link>}
        </div>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="nav-login">Logout</button>
          ) : (
            <Link to="/login" className="nav-login">Login</Link>
          )}
          <Link to="/cart" className="cart-link" aria-label={`Shopping bag, ${itemCount} items`}>
            <FaShoppingBag aria-hidden="true" />
            <span>Bag</span>
            <span className="cart-count">{itemCount}</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
