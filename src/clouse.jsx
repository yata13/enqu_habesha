import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import products from './data/products.js';
import { CartContext } from './context/CartContext.jsx';
import './clouse.css';

/**
 * Clouse is the product detail page.  It loads the product data based on
 * the route parameter and displays a larger image with selectable
 * thumbnails for different angles.  Users can add the item to their cart
 * or mark it as a favourite.  A back link allows navigation back to the
 * home page.
 */
const Clouse = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleFavourite, favourites } = useContext(CartContext);
  // Find the product by id; parseInt to ensure numeric comparison
  const product = products.find((p) => p.id === parseInt(productId));

  // When no product matches, redirect to home
  useEffect(() => {
    if (!product) {
      navigate('/');
    }
  }, [product, navigate]);

  // Default main image to the first image in the array
  const [mainImg, setMainImg] = useState(product?.images[0] || '');

  // Update main image whenever the product changes
  useEffect(() => {
    if (product) {
      setMainImg(product.images[0]);
    }
  }, [product]);

  if (!product) {
    return null;
  }

  return (
    <div className="clouse-page">
      <div className="clouse-header">
        <Link to="/" className="back-link">← Back</Link>
        <h2>{product.name}</h2>
      </div>
      <div className="clouse-content">
        <div className="clouse-main-image">
          <img src={mainImg} alt={product.name} className="clouse-img" />
        </div>
        <div className="clouse-details">
          <h3>{product.name}</h3>
          <p className="clouse-price">${product.price}</p>
          <div className="clouse-actions">
            <img
              src="heart.png"
              alt="favourite"
              className={`action-icon ${favourites.includes(product.id) ? 'active' : ''}`}
              onClick={() => toggleFavourite(product.id)}
            />
            <img
              src="cart.png"
              alt="add to cart"
              className="action-icon"
              onClick={() => addToCart(product)}
            />
          </div>
          <div className="clouse-thumbnails">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name} ${idx}`}
                className={`clouse-thumb ${mainImg === img ? 'selected' : ''}`}
                onClick={() => setMainImg(img)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clouse;
