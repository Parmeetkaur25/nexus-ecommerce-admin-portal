
import { Link, useNavigate } from 'react-router-dom'
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
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Nexus</Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart ({itemCount})</Link>

      
        {isAuthenticated ? (
          <>
            <Link to="/admin">Admin</Link>
            <button onClick={handleLogout} className="btn btn-ghost">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-ghost">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar