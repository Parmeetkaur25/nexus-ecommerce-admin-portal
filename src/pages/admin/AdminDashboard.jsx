// src/pages/admin/AdminDashboard.jsx
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getAllProducts } from '../../services/productService'
import ErrorState from '../../components/ErrorState'
import '../../style/AdminDashboard.css'

function AdminDashboard() {
  const { data: products, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  })

  if (isLoading) {
    return (
      <div className="admin-dashboard">
        <p>Loading dashboard...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="admin-dashboard">
        <ErrorState message={error.message} onRetry={refetch} />
      </div>
    )
  }

  // ---- Derived stats, all computed from the same products array ----
  const totalProducts = products.length

  const totalInventoryValue = products
    .reduce((sum, p) => sum + p.price * p.stock, 0)
    .toFixed(2)

  const outOfStock = products.filter((p) => p.stock === 0)
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 10)

  const avgRating = (
    products.reduce((sum, p) => sum + (p.rating || 0), 0) / totalProducts
  ).toFixed(1)

  // Group products by category, count how many are in each,
  // then sort descending so the biggest categories show first.
  const categoryCounts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1
    return acc
  }, {})

  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  // Highest-rated products, for a quick "best performers" glance.
  const topRated = [...products]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5)

  // Most recently added, using DummyJSON's id as a stand-in for
  // "recent" since there's no real createdAt field on this API.
  const recentProducts = [...products]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5)

  const stats = [
    { label: 'Total products', value: totalProducts, icon: '📦' },
    { label: 'Inventory value', value: `$${Number(totalInventoryValue).toLocaleString()}`, icon: '💰' },
    { label: 'Out of stock', value: outOfStock.length, icon: '🚫', tone: outOfStock.length > 0 ? 'danger' : 'default' },
    { label: 'Average rating', value: `⭐ ${avgRating}`, icon: '📊' },
  ]

  return (
    <div className="admin-dashboard">
      {/* ---- Header ---- */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back — here's what's happening with your store today.</p>
        </div>
        <Link to="/admin/products" className="btn btn-primary">Manage Products</Link>
      </div>

      {/* ---- Top stat cards ---- */}
      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.label} className={`stat-card ${s.tone === 'danger' ? 'stat-card-danger' : ''}`}>
            <div className="stat-icon">{s.icon}</div>
            <div>
              <p className="stat-label">{s.label}</p>
              <p className="stat-value">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        {/* ---- Category breakdown ---- */}
        <div className="card panel">
          <h2>Top categories</h2>
          <div className="category-bars">
            {topCategories.map(([category, count]) => (
              <div key={category} className="category-bar-row">
                <div className="category-bar-label">
                  <span>{category}</span>
                  <span className="category-bar-count">{count}</span>
                </div>
                <div className="category-bar-track">
                  <div
                    className="category-bar-fill"
                    style={{ width: `${(count / topCategories[0][1]) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Low stock / out of stock alerts ---- */}
        <div className="card panel">
          <h2>Stock alerts</h2>
          {outOfStock.length === 0 && lowStock.length === 0 ? (
            <p className="panel-empty">All products are well stocked.</p>
          ) : (
            <ul className="alert-list">
              {outOfStock.slice(0, 3).map((p) => (
                <li key={p.id}>
                  <span className="alert-dot alert-dot-danger" />
                  <span className="alert-title">{p.title}</span>
                  <span className="alert-tag alert-tag-danger">Out of stock</span>
                </li>
              ))}
              {lowStock.slice(0, 3).map((p) => (
                <li key={p.id}>
                  <span className="alert-dot alert-dot-warning" />
                  <span className="alert-title">{p.title}</span>
                  <span className="alert-tag alert-tag-warning">{p.stock} left</span>
                </li>
              ))}
            </ul>
          )}
          <Link to="/admin/products" className="panel-link">View all products →</Link>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* ---- Recently added ---- */}
        <div className="card panel">
          <h2>Recently added</h2>
          <ul className="mini-product-list">
            {recentProducts.map((p) => (
              <li key={p.id}>
                <img src={p.thumbnail} alt={p.title} />
                <div>
                  <p className="mini-product-title">{p.title}</p>
                  <p className="mini-product-meta">{p.category} · ${p.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ---- Top rated ---- */}
        <div className="card panel">
          <h2>Top rated products</h2>
          <ul className="mini-product-list">
            {topRated.map((p) => (
              <li key={p.id}>
                <img src={p.thumbnail} alt={p.title} />
                <div>
                  <p className="mini-product-title">{p.title}</p>
                  <p className="mini-product-meta">⭐ {p.rating?.toFixed(1)} · {p.category}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---- Quick actions ---- */}
      <div className="card panel">
        <h2>Quick actions</h2>
        <div className="quick-actions">
          <Link to="/admin/products" className="quick-action">
            <span>Manage products</span>
            <span className="quick-action-arrow">→</span>
          </Link>
          <Link to="/products" className="quick-action">
            <span>View storefront</span>
            <span className="quick-action-arrow">→</span>
          </Link>
          <Link to="/cart" className="quick-action">
            <span>View cart</span>
            <span className="quick-action-arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard