# The E-Commerce

The E-Commerce is a simple e-commerce website made with React and Vite. Product, cart, account, and order data stay in memory and reset when the page is refreshed. The project does not use a backend, database, Axios, or external API.

Live website: [everyday-market-ecommerce-beta.vercel.app](https://everyday-market-ecommerce-beta.vercel.app)

## Features

- 8 editable placeholder products with one React logo image
- Product search and category filter
- Four-product pagination
- Product details page with price and stock
- Add to cart, remove item, and quantity controls
- Per-item subtotal, cart total, and cart counter
- Controlled checkout form
- In-memory registration, login, and logout
- Automatic checkout autofill for logged-in customers
- HTML and custom JavaScript validation
- Cash on Delivery payment method
- Order confirmation page that clears the cart
- Responsive layout for desktop, tablet, and mobile
- Admin product CRUD page for creating, viewing, editing, and deleting products
- Nine React Router routes, including the not-found page

## Tester accounts

| Customer | Email | Password |
| --- | --- | --- |
| Admin Tester | `admin@ecommerce.test` | `admin123` |
| Customer Tester | `customer@ecommerce.test` | `customer123` |

Use the admin account to test product CRUD. Use the customer account to test cart ordering and checkout autofill. You can also register another temporary customer account.

## Run the project

```bash
npm install
npm run dev
```

Open the local address shown in the terminal.

## Build the project

```bash
npm run build
npm run preview
```

## Main code to explain

- `src/App.jsx` holds the product and cart state. The cart functions add products, update quantities, remove items, and clear the cart.
- `src/pages/HomePage.jsx` filters products and shows four products per page.
- `src/pages/CartPage.jsx` calculates each subtotal and the full order total.
- `src/pages/CheckoutPage.jsx` controls every form input with `useState`, validates the values, clears the cart, and opens the success page.
- `src/pages/LoginPage.jsx` and `src/pages/RegisterPage.jsx` manage the customer forms. Accounts are stored in `App.jsx` with `useState`, so they reset on refresh as required by the activity.
- Props pass product and cart data into reusable components. PropTypes check the expected prop types.

## GitHub and Vercel deployment

1. Create a new empty GitHub repository.
2. In this project folder, run:

```bash
git init
git add .
git commit -m "Build The E-Commerce web app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

3. Sign in to [Vercel](https://vercel.com/), select **Add New Project**, and import the GitHub repository.
4. Keep Vercel's detected Vite settings and select **Deploy**.

The included `vercel.json` sends direct visits such as `/cart` and `/products/1` back to React Router.
