# Everyday Market

Everyday Market is a simple e-commerce website made with React and Vite. Product, cart, and order data stay in memory and reset when the page is refreshed. The project does not use a backend, database, Axios, or external API.

## Features

- 10 hardcoded products with local images
- Product search and category filter
- Four-product pagination
- Product details page with price and stock
- Add to cart, remove item, and quantity controls
- Per-item subtotal, cart total, and cart counter
- Controlled checkout form
- HTML and custom JavaScript validation
- Cash on Delivery payment method
- Order confirmation page that clears the cart
- Responsive layout for desktop, tablet, and mobile
- Six React Router routes, including the not-found page

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
- Props pass product and cart data into reusable components. PropTypes check the expected prop types.

## GitHub and Vercel deployment

1. Create a new empty GitHub repository.
2. In this project folder, run:

```bash
git init
git add .
git commit -m "Build Everyday Market e-commerce app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

3. Sign in to [Vercel](https://vercel.com/), select **Add New Project**, and import the GitHub repository.
4. Keep Vercel's detected Vite settings and select **Deploy**.

The included `vercel.json` sends direct visits such as `/cart` and `/products/1` back to React Router.
