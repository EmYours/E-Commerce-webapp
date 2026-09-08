import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import startingProducts from "./data/products";
import testAccounts from "./data/testAccounts";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [products, setProducts] = useState(startingProducts);
  const [cart, setCart] = useState([]);
  const [accounts, setAccounts] = useState(testAccounts);
  const [currentUser, setCurrentUser] = useState(null);

  function registerUser(newAccount) {
    const emailExists = accounts.find(
      (account) => account.email.toLowerCase() === newAccount.email.toLowerCase(),
    );

    if (emailExists) {
      return { success: false, message: "An account with this email already exists." };
    }

    const customerAccount = { ...newAccount, role: "customer" };
    setAccounts([...accounts, customerAccount]);
    setCurrentUser(customerAccount);
    return { success: true, user: customerAccount };
  }

  function loginUser(email, password) {
    const account = accounts.find(
      (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password,
    );

    if (!account) {
      return { success: false, message: "Email or password is incorrect." };
    }

    setCurrentUser(account);
    return { success: true, user: account };
  }

  function logoutUser() {
    setCurrentUser(null);
  }

  function addProduct(productData) {
    let newId = 1;

    if (products.length > 0) {
      newId = Math.max(...products.map((product) => product.id)) + 1;
    }

    const newProduct = {
      ...productData,
      id: newId,
      image: "/react.svg",
    };
    setProducts([...products, newProduct]);
  }

  function updateProduct(productId, productData) {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          return { ...product, ...productData };
        }
        return product;
      }),
    );

    setCart(
      cart.map((item) => {
        if (item.id === productId) {
          return { ...item, ...productData };
        }
        return item;
      }),
    );
  }

  function deleteProduct(productId) {
    setProducts(products.filter((product) => product.id !== productId));
    setCart(cart.filter((item) => item.id !== productId));
  }

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
      <Navbar cartCount={cartCount} currentUser={currentUser} onLogout={logoutUser} />

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
          <Route
            path="/checkout"
            element={
              <CheckoutPage
                cart={cart}
                currentUser={currentUser}
                onOrderComplete={clearCart}
              />
            }
          />
          <Route path="/login" element={<LoginPage onLogin={loginUser} />} />
          <Route
            path="/register"
            element={<RegisterPage onRegister={registerUser} hasCartItems={cart.length > 0} />}
          />
          <Route
            path="/admin"
            element={
              <AdminPage
                currentUser={currentUser}
                products={products}
                onAddProduct={addProduct}
                onUpdateProduct={updateProduct}
                onDeleteProduct={deleteProduct}
              />
            }
          />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
