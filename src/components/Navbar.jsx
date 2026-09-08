import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";

function Navbar({ cartCount }) {
  function getLinkClass({ isActive }) {
    return isActive ? "nav-link active" : "nav-link";
  }

  return (
    <header className="site-header">
      <div className="container nav-content">
        <Link className="brand" to="/" aria-label="Everyday Market home">
          <span className="brand-mark">E</span>
          <span>Everyday Market</span>
        </Link>

        <nav className="nav-menu" aria-label="Main navigation">
          <NavLink className={getLinkClass} to="/" end>
            Home
          </NavLink>
          <NavLink className={getLinkClass} to="/cart">
            Cart <span className="cart-count">{cartCount}</span>
          </NavLink>
          <NavLink className={getLinkClass} to="/checkout">
            Checkout
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

Navbar.propTypes = {
  cartCount: PropTypes.number,
};

Navbar.defaultProps = {
  cartCount: 0,
};

export default Navbar;
