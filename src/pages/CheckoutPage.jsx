import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

function CheckoutPage({ cart, onOrderComplete }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    payment: "Cash on Delivery",
  });
  const [errors, setErrors] = useState({});
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function validateForm() {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = formData.phone.replace(/\D/g, "");

    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Please enter your complete name.";
    }
    if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (phoneDigits.length < 10 || phoneDigits.length > 13) {
      newErrors.phone = "Phone number must contain 10 to 13 digits.";
    }
    if (formData.address.trim().length < 10) {
      newErrors.address = "Please enter a complete delivery address.";
    }
    if (formData.payment !== "Cash on Delivery") {
      newErrors.payment = "Please choose Cash on Delivery.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
      const orderNumber = `EM-${Date.now().toString().slice(-6)}`;
      onOrderComplete();
      navigate("/order-success", {
        state: { customerName: formData.fullName, orderNumber },
      });
    }
  }

  if (cart.length === 0) {
    return (
      <section className="page-section">
        <div className="container empty-message">
          <h1>Nothing to check out yet</h1>
          <p>Your cart is empty. Add a product before checking out.</p>
          <Link className="button" to="/">
            Browse products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">Almost finished</p>
          <h1>Checkout</h1>
        </div>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Delivery details</h2>

            <div className="form-field">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                required
                minLength="3"
                autoComplete="name"
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
              />
              {errors.fullName && <span className="error-message" id="fullName-error">{errors.fullName}</span>}
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <span className="error-message" id="email-error">{errors.email}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="0912 345 6789"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  minLength="10"
                  autoComplete="tel"
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && <span className="error-message" id="phone-error">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="address">Delivery Address</label>
              <textarea
                id="address"
                name="address"
                rows="4"
                value={formData.address}
                onChange={handleChange}
                required
                minLength="10"
                autoComplete="street-address"
                aria-describedby={errors.address ? "address-error" : undefined}
              ></textarea>
              {errors.address && <span className="error-message" id="address-error">{errors.address}</span>}
            </div>

            <fieldset className="payment-fieldset">
              <legend>Payment Method</legend>
              <label className="radio-card">
                <input
                  name="payment"
                  type="radio"
                  value="Cash on Delivery"
                  checked={formData.payment === "Cash on Delivery"}
                  onChange={handleChange}
                  required
                />
                <span>
                  <strong>Cash on Delivery</strong>
                  <small>Pay in cash when your order arrives.</small>
                </span>
              </label>
              {errors.payment && <span className="error-message">{errors.payment}</span>}
            </fieldset>

            <button className="button button-full" type="submit">
              Place order
            </button>
          </form>

          <aside className="order-summary checkout-summary">
            <h2>Your order</h2>
            <div className="checkout-items">
              {cart.map((item) => (
                <div className="checkout-item" key={item.id}>
                  <span>{item.name} × {item.quantity}</span>
                  <strong>₱{(item.price * item.quantity).toLocaleString()}</strong>
                </div>
              ))}
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>Free</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>₱{total.toLocaleString()}</strong>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

CheckoutPage.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  onOrderComplete: PropTypes.func.isRequired,
};

export default CheckoutPage;
