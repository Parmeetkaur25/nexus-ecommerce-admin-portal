import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import "../../style/Cart.css";

function Cart() {
  const {
    items,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-card">
          <h1>🛒 Your Cart is Empty</h1>
          <p>
            Looks like you haven't added any products yet.
          </p>

          <Link to="/products" className="shop-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">

      <h1 className="cart-title">Shopping Cart</h1>

      <div className="cart-layout">

        <div className="cart-items">

          {items.map((item) => (
            <div className="cart-card" key={item.id}>

              <img
                src={item.thumbnail}
                alt={item.title}
                className="cart-image"
              />

              <div className="cart-info">
                <h3>{item.title}</h3>
                <p>${item.price} each</p>
              </div>

              <div className="qty-box">

                <button
                  onClick={() =>
                    decreaseQuantity(item.id)
                  }
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    increaseQuantity(item.id)
                  }
                >
                  +
                </button>

              </div>

              <h3 className="item-total">
                $
                {(item.price * item.quantity).toFixed(
                  2
                )}
              </h3>

              <button
                className="remove-btn"
                onClick={() =>
                  removeFromCart(item.id)
                }
              >
                Remove
              </button>

            </div>
          ))}

        </div>

        <div className="cart-summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="summary-row">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>

          <button className="checkout-btn">
            Proceed to Checkout
          </button>

          <button
            className="clear-btn"
            onClick={clearCart}
          >
            Clear Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default Cart;