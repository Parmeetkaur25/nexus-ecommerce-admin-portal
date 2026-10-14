
function ProductRow({ product, onEdit, onDelete }) {
  const { id, thumbnail, title, category, price, stock, rating } = product

  return (
    <tr className="product-row">
      <td>
        <img src={thumbnail} alt={title} className="product-row-image" />
      </td>
      <td className="product-row-title">{title}</td>
      <td>{category}</td>
      <td>${price}</td>
      <td>
        
        <span className={stock === 0 ? 'stock-badge stock-out' : 'stock-badge'}>
          {stock}
        </span>
      </td>
      <td>⭐ {rating?.toFixed(1) ?? 'N/A'}</td>
      <td className="product-row-actions">
        <button onClick={() => onEdit(product)} className="btn btn-outline btn-sm">
          Edit
        </button>
        <button onClick={() => onDelete(product.id)} className="btn btn-danger btn-sm">
          Delete
        </button>
      </td>
    </tr>
  )
}

export default ProductRow