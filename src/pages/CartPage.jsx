import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

function CartPage({ cart, onIncrease, onDecrease, onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <section className="page-section">
        <div className="container empty-message">
          <span className="empty-icon">🛒</span>
          <h1>Your cart is empty</h1>
          <p>Add a few everyday essentials and they will appear here.</p>
          <Link className="button" to="/">
            Start shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">Your selections</p>
          <h1>Shopping cart</h1>
        </div>

        <div className="cart-layout">
          <div className="cart-list">
            {cart.map((item) => (
              <CartItem
                item={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onRemove={onRemove}
                key={item.id}
              />
            ))}
          </div>

          <aside className="order-summary">
            <h2>Order summary</h2>
            <div className="summary-row">
              <span>Items</span>
              <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>Free</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>₱{total.toLocaleString()}</strong>
            </div>
            <Link className="button button-full" to="/checkout">
              Proceed to checkout
            </Link>
            <Link className="continue-link" to="/">
              Continue shopping
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}

CartPage.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartPage;
