
import ProductCard from './ProductCard'

function ProductGrid({ products }) {
 
  if (!products || products.length === 0) {
    return <p>No products found.</p>
  }

  return (
    <div style={styles.grid}>
      {products.map((product) => (
      
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '1rem',
  },
}

export default ProductGrid