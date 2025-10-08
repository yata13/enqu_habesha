import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import products from './data/products.js';
// Import CartContext from the components directory.  In the previous version
// the context was incorrectly referenced from a non‑existent `context`
// directory.  Keeping all context logic in `components` avoids broken
// imports and bundler failures.
import { CartContext } from './components/CartContext.jsx';
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
  // Selected size defaults to empty.  When the user picks a size we
  // update this state.  You could persist it to the cart if desired.
  const [selectedSize, setSelectedSize] = useState('');

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
      {/* Header with back link and title */}
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
          {/* Description placeholder – feel free to replace with real copy */}
          <p className="clouse-desc">
            Experience the elegance of Habesha with the intricate craft and
            delicate embroidery. Each gown is hand‑woven using fine fabrics
            and timeless patterns to create a look that is both modern and
            traditional.
          </p>
          {/* Size selector */}
          <div className="size-selector">
            <span className="size-label">Sizes:</span>
            {['S', 'M', 'L', 'XL'].map((size) => (
              <button
                key={size}
                type="button"
                className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
          {/* Actions: favourite, add to cart */}
          <div className="clouse-actions">
            <i
              className={`fas fa-heart action-icon ${favourites.includes(product.id) ? 'active' : ''}`}
              onClick={() => toggleFavourite(product.id)}
            />
            <button
              type="button"
              className="add-cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
          {/* Thumbnail previews */}
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
      {/* Related products section */}
      <div className="related-section">
        <h3 className="related-title">Discover the Collection</h3>
        <div className="related-grid">
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((p) => (
              <div
                key={p.id}
                className="related-item"
                onClick={() => navigate(`/clouse/${p.id}`)}
              >
                <img src={p.images[0]} alt={p.name} className="related-img" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Clouse;
