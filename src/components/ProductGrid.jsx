
import ProductCard from './ProductCard'

function ProductGrid({ products }) {
 
  if (!products || products.length === 0) {
    return <p className="product-grid-empty">No products found.</p>
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
      
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid