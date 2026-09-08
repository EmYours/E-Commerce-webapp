import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="page-section">
      <div className="container empty-message">
        <p className="error-code">404</p>
        <h1>Page not found</h1>
        <p>The page you requested does not exist.</p>
        <Link className="button" to="/">
          Go to home
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
