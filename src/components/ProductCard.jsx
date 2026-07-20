
import { Link } from 'react-router-dom'
import useCart from '../hooks/useCart'

function ProductCard({ product }) {
  const { id, title, price, category, thumbnail, rating } = product
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product) 
  }

  return (
    <div style={styles.card}>
      <Link to={`/product/${id}`} style={styles.link}>
        <img src={thumbnail} alt={title} style={styles.image} />
        <h3 style={styles.title}>{title}</h3>
      </Link>
      <p style={styles.category}>{category}</p>
      <p style={styles.price}>${price}</p>
      <p style={styles.rating}>⭐ {rating?.toFixed(1) ?? 'N/A'}</p>
      <button onClick={handleAddToCart} style={styles.button}>
        Add to Cart
      </button>
    </div>
  )
}

const styles = {
  card: { border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  link: { textDecoration: 'none', color: 'inherit' },
  image: { width: '100%', height: '160px', objectFit: 'contain' },
  title: { fontSize: '1rem', margin: 0 },
  category: { fontSize: '0.85rem', color: '#666', margin: 0 },
  price: { fontWeight: 'bold', margin: 0 },
  rating: { fontSize: '0.85rem', margin: 0 },
  button: { padding: '0.5rem', cursor: 'pointer' },
}

export default ProductCard