import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Clouse from './clouse.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';

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
