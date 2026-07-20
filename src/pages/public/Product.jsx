
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllProducts, searchProducts } from '../../services/productService'
import useDebounce from '../../hooks/useDebounce'
import ProductGrid from '../../components/ProductGrid'

function Products() {

  const [searchTerm, setSearchTerm] = useState('')

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const { data: products, isLoading, isError, error } = useQuery({

    queryKey: ['products', debouncedSearchTerm],

   
    queryFn: () =>
      debouncedSearchTerm
        ? searchProducts(debouncedSearchTerm)
        : getAllProducts(),
  })

  if (isLoading) {
    return <p>Loading products...</p>
  }

  if (isError) {
    return <p>Something went wrong: {error.message}</p>
  }

  return (
    <div>
      <h1>All Products</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />

      <ProductGrid products={products} />
    </div>
  )
}

const styles = {
  searchInput: {
    padding: '0.5rem',
    width: '100%',
    maxWidth: '400px',
    marginBottom: '1rem',
    fontSize: '1rem',
  },
}

export default Products