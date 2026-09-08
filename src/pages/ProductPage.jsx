import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";

function ProductPage({ products, onAddToCart }) {
  const { productId } = useParams();
  const [message, setMessage] = useState("");
  const product = products.find((item) => item.id === Number(productId));

  if (!product) {
    return (
      <section className="page-section">
        <div className="container empty-message">
          <h1>Product not found</h1>
          <p>The product you are looking for is not available.</p>
          <Link className="button" to="/">
            Back to products
          </Link>
        </div>
      </section>
    );
  }

  function handleAddToCart() {
    onAddToCart(product);
    setMessage(`${product.name} was added to your cart.`);
  }

  return (
    <section className="page-section">
      <div className="container">
        <Link className="back-link" to="/">
          ← Back to products
        </Link>

        <div className="product-details">
          <div className="product-details-image-wrap">
            <img className="product-details-image" src={product.image} alt={product.name} />
          </div>

          <div className="product-details-content">
            <p className="product-category">{product.category}</p>
            <h1>{product.name}</h1>
            <p className="details-price">₱{product.price.toLocaleString()}</p>
            <p className="details-description">{product.description}</p>

            <div className="stock-row">
              <span className="stock-dot"></span>
              <span>In stock — {product.stock} available</span>
            </div>

            <button className="button details-button" type="button" onClick={handleAddToCart}>
              Add to cart
            </button>
            {message && <p className="success-message" role="status">{message}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

ProductPage.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductPage;
