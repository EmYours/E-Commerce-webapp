import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function ProductCard({ product, onAddToCart, showAddButton }) {
  return (
    <article className="product-card">
      <Link className="product-image-link" to={`/products/${product.id}`}>
        <img className="product-image" src={product.image} alt={product.name} />
      </Link>

      <div className="product-card-body">
        <p className="product-category">{product.category}</p>
        <h2 className="product-name">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h2>
        <p className="product-description">{product.shortDescription}</p>

        <div className="product-card-footer">
          <p className="product-price">₱{product.price.toLocaleString()}</p>
          {showAddButton && (
            <button className="button button-small" type="button" onClick={() => onAddToCart(product)}>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func,
  showAddButton: PropTypes.bool,
};

ProductCard.defaultProps = {
  onAddToCart: function () {},
  showAddButton: true,
};

export default ProductCard;
