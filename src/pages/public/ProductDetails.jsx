import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../services/productService";
import useCart from "../../hooks/useCart";
import "../../style/ProductDetails.css";

function ProductDetails() {
  const { addToCart } = useCart();
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  if (isLoading) {
    return <h2 className="loading">Loading Product...</h2>;
  }

  if (isError) {
    return <h2 className="error">{error.message}</h2>;
  }

  return (
    <div className="product-details-container">
      <div className="product-image-box">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
        />
      </div>

      <div className="product-info">
        <span className="product-category">
          {product.category}
        </span>

        <h1>{product.title}</h1>

        <div className="rating-price">
          <span className="rating">
            ⭐ {product.rating?.toFixed(1)}
          </span>

          <span className="price">
            ${product.price}
          </span>
        </div>

        <p className="description">
          {product.description}
        </p>

        <button
          className="add-cart-btn"
          onClick={() => addToCart(product)}
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;