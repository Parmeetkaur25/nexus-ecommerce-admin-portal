import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import useCart from '../hooks/useCart'
import '../style/ProductCard.css'

function ProductCard({ product }) {
  const { id, title, price, category, thumbnail, rating } = product
  const { addToCart } = useCart()
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(price)

  return (
    <article className="product-card">
      <Link to={`/product/${id}`} className="product-card-link">
        <div className="product-card-image">
          <img src={thumbnail} alt={title} loading="lazy" />
          <span className="product-card-rating">★ {rating?.toFixed(1)}</span>
        </div>
        <div className="product-card-info">
          <p className="product-card-category">{category}</p>
          <h3>{title}</h3>
          <strong className="product-card-price">{formattedPrice}</strong>
        </div>
      </Link>
      <button
        type="button"
        className="product-card-add"
        onClick={() => addToCart(product)}
        aria-label={`Add ${title} to bag`}
      >
        <span>Add to bag</span><FaPlus aria-hidden="true" />
      </button>
    </article>
  )
}

export default ProductCard
