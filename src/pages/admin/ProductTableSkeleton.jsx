import '../../style/ProductTableSkeleton.css'

function ProductTableSkeleton({ rows = 6 }) {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Image</th><th>Name</th><th>Category</th>
          <th>Price</th><th>Stock</th><th>Rating</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>

        {Array(rows).fill(null).map((_, i) => (
          <tr key={i} className="skeleton-row">
            <td><div className="skeleton-block skeleton-image" /></td>
            <td><div className="skeleton-block skeleton-text-lg" /></td>
            <td><div className="skeleton-block skeleton-text-sm" /></td>
            <td><div className="skeleton-block skeleton-text-sm" /></td>
            <td><div className="skeleton-block skeleton-text-sm" /></td>
            <td><div className="skeleton-block skeleton-text-sm" /></td>
            <td><div className="skeleton-block skeleton-text-lg" /></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ProductTableSkeleton