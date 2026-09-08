import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";

function Navbar({ cartCount, currentUser, onLogout }) {
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
          {currentUser ? (
            <div className="account-menu">
              <span className="account-name">Hi, {currentUser.fullName.split(" ")[0]}</span>
              <button className="logout-button" type="button" onClick={onLogout}>
                Logout
              </button>
            </div>
          ) : (
            <NavLink className={getLinkClass} to="/login">
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

Navbar.propTypes = {
  cartCount: PropTypes.number,
  currentUser: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
  }),
  onLogout: PropTypes.func,
};

Navbar.defaultProps = {
  cartCount: 0,
  currentUser: null,
  onLogout: function () {},
};

export default Navbar;
