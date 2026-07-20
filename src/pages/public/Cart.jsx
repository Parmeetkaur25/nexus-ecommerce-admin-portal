
import { Link } from 'react-router-dom'
import useCart from '../../hooks/useCart'

function Cart() {
  const { items, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const totalPrice = items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2)


  if (items.length === 0) {
    return (
      <div>
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/products">Browse products</Link>
      </div>
    )
  }

  return (
    <div>
      <h1>Your Cart</h1>

      <div style={styles.list}>
        {items.map((item) => (
          <div key={item.id} style={styles.row}>
            <img src={item.thumbnail} alt={item.title} style={styles.image} />

            <div style={styles.info}>
              <p style={styles.title}>{item.title}</p>
              <p style={styles.price}>${item.price} each</p>
            </div>

            <div style={styles.quantityControls}>
              <button onClick={() => decreaseQuantity(item.id)} style={styles.qtyButton}>
                −
              </button>
              <span style={styles.qtyValue}>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.id)} style={styles.qtyButton}>
                +
              </button>
            </div>

  
            <p style={styles.lineTotal}>${(item.price * item.quantity).toFixed(2)}</p>

            <button onClick={() => removeFromCart(item.id)} style={styles.removeButton}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div style={styles.summary}>
        <p>Total items: {totalItems}</p>
        <p style={styles.grandTotal}>Total price: ${totalPrice}</p>
        <button onClick={clearCart} style={styles.clearButton}>
          Clear Cart
        </button>
      </div>
    </div>
  )
}

const styles = {
  list: { display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '0.75rem',
  },
  image: { width: '60px', height: '60px', objectFit: 'contain' },
  info: { flex: 1 },
  title: { margin: 0, fontWeight: 'bold' },
  price: { margin: 0, color: '#666', fontSize: '0.85rem' },
  quantityControls: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  qtyButton: { width: '28px', height: '28px', cursor: 'pointer' },
  qtyValue: { minWidth: '20px', textAlign: 'center' },
  lineTotal: { fontWeight: 'bold', minWidth: '70px', textAlign: 'right' },
  removeButton: { cursor: 'pointer', color: 'red' },
  summary: {
    marginTop: '1.5rem',
    paddingTop: '1rem',
    borderTop: '2px solid #ddd',
  },
  grandTotal: { fontSize: '1.25rem', fontWeight: 'bold' },
  clearButton: { marginTop: '0.5rem', padding: '0.5rem 1rem', cursor: 'pointer' },
}

export default Cart