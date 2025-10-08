import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Clouse from './clouse.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Import the CartProvider from the correct location.  The cart context
// lives under the components folder, not a non‑existent `context` folder.
import { CartProvider } from './components/CartContext.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Define application routes.  The /clouse route accepts a productId parameter
// so that individual products can be displayed with their own image galleries.
const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/clouse/:productId', element: <Clouse /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);
