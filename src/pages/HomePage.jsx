import { useState } from "react";
import PropTypes from "prop-types";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

function HomePage({ products, onAddToCart }) {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const categories = ["All"];
  products.forEach((product) => {
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const firstProductIndex = (currentPage - 1) * productsPerPage;
  const visibleProducts = filteredProducts.slice(firstProductIndex, firstProductIndex + productsPerPage);

  function handleSearch(event) {
    setSearchText(event.target.value);
    setCurrentPage(1);
  }

  function handleCategory(event) {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  }

  function handlePageChange(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: "smooth" });
  }

  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <p className="eyebrow">Useful. Simple. Everyday.</p>
          <h1>Good things for daily life.</h1>
          <p className="hero-text">
            A small collection of practical items chosen for work, home, and weekends.
          </p>
          <a className="button" href="#products">
            Browse products
          </a>
        </div>
      </section>

      <section className="product-section" id="products">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Our collection</p>
              <h2>Shop everyday essentials</h2>
            </div>
            <p>{filteredProducts.length} products found</p>
          </div>

          <div className="filters">
            <div className="filter-field search-field">
              <label htmlFor="search">Search products</label>
              <input
                id="search"
                type="search"
                placeholder="Try “bottle” or “watch”"
                value={searchText}
                onChange={handleSearch}
              />
            </div>

            <div className="filter-field">
              <label htmlFor="category">Category</label>
              <select id="category" value={selectedCategory} onChange={handleCategory}>
                {categories.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <ProductCard product={product} onAddToCart={onAddToCart} key={product.id} />
              ))}
            </div>
          ) : (
            <div className="empty-message">
              <h2>No products found</h2>
              <p>Try a different name or category.</p>
            </div>
          )}

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </section>
    </>
  );
}

HomePage.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default HomePage;
