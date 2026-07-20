
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProductById } from '../../services/productService'
import useCart from '../../hooks/useCart'

function ProductDetails() {
  const { addToCart } = useCart()
  const { id } = useParams()

  const { data: product, isLoading, isError, error } = useQuery({
  
    queryKey: ['product', id],

   
    queryFn: () => getProductById(id),
  })

  const handleAddToCart = () => {
    console.log(`Added "${product.title}" to cart (cart logic comes in Step 7)`)
  }

  if (isLoading) {
    return <p>Loading product...</p>
  }

  if (isError) {
    return <p>Something went wrong: {error.message}</p>
  }

  return (
    <div style={styles.container}>
      <img src={product.thumbnail} alt={product.title} style={styles.image} />
      <div style={styles.details}>
        <h1>{product.title}</h1>
        <p style={styles.category}>{product.category}</p>
        <p>{product.description}</p>
        <p style={styles.price}>${product.price}</p>
        <p>⭐ {product.rating?.toFixed(1) ?? 'N/A'}</p>
        <button onClick={handleAddToCart} style={styles.button}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: { display: 'flex', gap: '2rem', flexWrap: 'wrap' },
  image: { width: '300px', height: '300px', objectFit: 'contain' },
  details: { flex: 1, minWidth: '250px' },
  category: { color: '#666' },
  price: { fontSize: '1.5rem', fontWeight: 'bold' },
  button: { padding: '0.75rem 1.5rem', cursor: 'pointer', fontSize: '1rem' },
}

export default ProductDetails