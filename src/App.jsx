import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import startingProducts from "./data/products";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [products] = useState(startingProducts);
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    const itemInCart = cart.find((item) => item.id === product.id);

    if (itemInCart) {
      if (itemInCart.quantity < product.stock) {
        setCart(
          cart.map((item) => {
            if (item.id === product.id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          }),
        );
      }
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  function increaseQuantity(productId) {
    setCart(
      cart.map((item) => {
        if (item.id === productId && item.quantity < item.stock) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      }),
    );
  }

  function decreaseQuantity(productId) {
    setCart(
      cart.map((item) => {
        if (item.id === productId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }),
    );
  }

  function removeFromCart(productId) {
    setCart(cart.filter((item) => item.id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="app">
      <Navbar cartCount={cartCount} />

      <main>
        <Routes>
          <Route path="/" element={<HomePage products={products} onAddToCart={addToCart} />} />
          <Route
            path="/products/:productId"
            element={<ProductPage products={products} onAddToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeFromCart}
              />
            }
          />
          <Route path="/checkout" element={<CheckoutPage cart={cart} onOrderComplete={clearCart} />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
