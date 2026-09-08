import { Link, useLocation } from "react-router-dom";

function OrderSuccessPage() {
  const location = useLocation();
  const order = location.state;

  return (
    <section className="page-section">
      <div className="container success-card">
        <span className="success-icon">✓</span>
        <p className="eyebrow">Order received</p>
        <h1>Thank you{order?.customerName ? `, ${order.customerName}` : ""}!</h1>
        <p>Your order has been placed successfully. Please prepare cash for delivery.</p>
        {order?.orderNumber && (
          <p className="order-number">
            Order number: <strong>{order.orderNumber}</strong>
          </p>
        )}
        <Link className="button" to="/">
          Return home
        </Link>
      </div>
    </section>
  );
}

export default OrderSuccessPage;
