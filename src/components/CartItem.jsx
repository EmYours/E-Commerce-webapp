import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const subtotal = item.price * item.quantity;

  return (
    <article className="cart-item">
      <img className="cart-item-image" src={item.image} alt={item.name} />

      <div className="cart-item-info">
        <p className="product-category">{item.category}</p>
        <h2>
          <Link to={`/products/${item.id}`}>{item.name}</Link>
        </h2>
        <p>₱{item.price.toLocaleString()} each</p>
        <button className="text-button remove-button" type="button" onClick={() => onRemove(item.id)}>
          Remove item
        </button>
      </div>

      <div className="quantity-area">
        <span className="quantity-label">Quantity</span>
        <div className="quantity-controls">
          <button type="button" onClick={() => onDecrease(item.id)} disabled={item.quantity === 1} aria-label="Decrease quantity">
            −
          </button>
          <span>{item.quantity}</span>
          <button type="button" onClick={() => onIncrease(item.id)} disabled={item.quantity === item.stock} aria-label="Increase quantity">
            +
          </button>
        </div>
        <small>{item.stock} available</small>
      </div>

      <div className="cart-subtotal">
        <span>Subtotal</span>
        <strong>₱{subtotal.toLocaleString()}</strong>
      </div>
    </article>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItem;
