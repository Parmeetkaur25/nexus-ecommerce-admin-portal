import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";

function ProductCard({ product }) {
  const { id, title, price, category, thumbnail, rating } = product;
  const { addToCart } = useCart();

  return (
    <div style={styles.card}>
      <Link to={`/product/${id}`} style={styles.link}>
        <div style={styles.imageContainer}>
          <img src={thumbnail} alt={title} style={styles.image} />
        </div>

        <p style={styles.category}>{category}</p>

        <h3 style={styles.title}>
          {title.length > 45 ? title.substring(0, 45) + "..." : title}
        </h3>

        <div style={styles.bottom}>
          <span style={styles.price}>${price}</span>
          <span style={styles.rating}>⭐ {rating?.toFixed(1)}</span>
        </div>
      </Link>

      <button
        onClick={() => addToCart(product)}
        style={styles.button}
      >
        🛒 Add to Cart
      </button>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    transition: "all 0.35s ease",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    cursor: "pointer",
    border: "1px solid #f1f1f1",
  },

  link: {
    textDecoration: "none",
    color: "#222",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    flexGrow: 1,
  },

  imageContainer: {
    background: "#f8f9fb",
    borderRadius: "14px",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "220px",
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "contain",
    transition: "transform 0.4s ease",
  },

  category: {
    color: "#6c757d",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    margin: 0,
    fontWeight: "600",
  },

  title: {
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "1.4",
    margin: 0,
    minHeight: "50px",
  },

  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
  },

  price: {
    fontSize: "24px",
    color: "#0d6efd",
    fontWeight: "700",
  },

  rating: {
    background: "#FFF3CD",
    color: "#856404",
    padding: "5px 10px",
    borderRadius: "20px",
    fontWeight: "600",
    fontSize: "14px",
  },

  button: {
    margin: "20px",
    marginTop: "0",
    border: "none",
    borderRadius: "12px",
    padding: "14px",
    background: "linear-gradient(135deg,#4F46E5,#2563EB)",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default ProductCard;