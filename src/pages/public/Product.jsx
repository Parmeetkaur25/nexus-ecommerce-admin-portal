import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getAllProducts,
  searchProducts,
} from "../../services/productService";
import useDebounce from "../../hooks/useDebounce";
import ProductGrid from "../../components/ProductGrid";
import "../../style/Product.css";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", debouncedSearchTerm],
    queryFn: () =>
      debouncedSearchTerm
        ? searchProducts(debouncedSearchTerm)
        : getAllProducts(),
  });

  if (isLoading) {
    return <h2 className="loading">Loading Products...</h2>;
  }

  if (isError) {
    return <h2 className="error">{error.message}</h2>;
  }

  return (
    <div className="products-page">

      <div className="products-header">
        <h1>Explore Our Products</h1>
        <p>
          Discover premium products carefully selected just for you.
        </p>

        <div className="search-box">
          <span className="search-icon">🔍</span>

          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <ProductGrid products={products} />

    </div>
  );
}

export default Products;