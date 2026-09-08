import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const emptyForm = {
  name: "",
  category: "",
  price: "",
  stock: "",
  shortDescription: "",
  description: "",
};

function AdminPage({ currentUser, products, onAddProduct, onUpdateProduct, onDeleteProduct }) {
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function clearForm() {
    setFormData(emptyForm);
    setEditingId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const productData = {
      name: formData.name.trim(),
      category: formData.category.trim(),
      price: Number(formData.price),
      stock: Number(formData.stock),
      shortDescription: formData.shortDescription.trim(),
      description: formData.description.trim(),
      image: "/react.svg",
    };

    if (editingId === null) {
      onAddProduct(productData);
      setMessage("Product created successfully.");
    } else {
      onUpdateProduct(editingId, productData);
      setMessage("Product updated successfully.");
    }

    clearForm();
  }

  function startEditing(product) {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      shortDescription: product.shortDescription,
      description: product.description,
    });
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(product) {
    const shouldDelete = window.confirm(`Delete ${product.name}?`);

    if (shouldDelete) {
      onDeleteProduct(product.id);
      setMessage("Product deleted successfully.");

      if (editingId === product.id) {
        clearForm();
      }
    }
  }

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <section className="page-section">
        <div className="container empty-message">
          <h1>Admin access only</h1>
          <p>Login with the admin tester account to manage products.</p>
          <Link className="button" to="/login" state={{ from: "/admin" }}>
            Go to login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">Product CRUD</p>
          <h1>Admin products</h1>
        </div>

        <div className="admin-layout">
          <form className="admin-form" onSubmit={handleSubmit}>
            <h2>{editingId === null ? "Add product" : "Edit product"}</h2>

            <div className="form-field">
              <label htmlFor="productName">Product Name</label>
              <input id="productName" name="name" type="text" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-field">
              <label htmlFor="productCategory">Category</label>
              <input id="productCategory" name="category" type="text" value={formData.category} onChange={handleChange} required />
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="productPrice">Price</label>
                <input id="productPrice" name="price" type="number" min="1" value={formData.price} onChange={handleChange} required />
              </div>

              <div className="form-field">
                <label htmlFor="productStock">Stock</label>
                <input id="productStock" name="stock" type="number" min="0" value={formData.stock} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="shortDescription">Short Description</label>
              <textarea id="shortDescription" name="shortDescription" rows="2" value={formData.shortDescription} onChange={handleChange} required></textarea>
            </div>

            <div className="form-field">
              <label htmlFor="fullDescription">Full Description</label>
              <textarea id="fullDescription" name="description" rows="4" value={formData.description} onChange={handleChange} required></textarea>
            </div>

            <p className="admin-image-note">The React logo will be used as the image placeholder.</p>

            <div className="admin-form-actions">
              <button className="button" type="submit">
                {editingId === null ? "Add product" : "Save changes"}
              </button>
              {editingId !== null && (
                <button className="secondary-button" type="button" onClick={clearForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="admin-products">
            <div className="admin-list-heading">
              <h2>Product list</h2>
              <span>{products.length} products</span>
            </div>

            {message && <p className="admin-message" role="status">{message}</p>}

            {products.length === 0 ? (
              <div className="empty-admin-list">No products yet. Use the form to add one.</div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <div className="admin-product-name">
                            <img src={product.image} alt="" />
                            <span>{product.name}</span>
                          </div>
                        </td>
                        <td>{product.category}</td>
                        <td>₱{product.price.toLocaleString()}</td>
                        <td>{product.stock}</td>
                        <td>
                          <div className="table-actions">
                            <button type="button" onClick={() => startEditing(product)}>Edit</button>
                            <button className="delete-action" type="button" onClick={() => handleDelete(product)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

AdminPage.propTypes = {
  currentUser: PropTypes.shape({
    role: PropTypes.string,
  }),
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddProduct: PropTypes.func.isRequired,
  onUpdateProduct: PropTypes.func.isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
};

AdminPage.defaultProps = {
  currentUser: null,
};

export default AdminPage;
