import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';

/**
 * Type component has been refactored into a generic product grid.  It
 * accepts a list of products via props and renders each one as a card
 * with an image, title, price and action icons for adding to cart and
 * toggling favourites.  Clicking on the image navigates to a product
 * detail page (the Clouse component) where additional angles can be
 * explored.
 */
const Type = ({ products = [], onSelect }) => {
  const { addToCart, toggleFavourite, favourites } = useContext(CartContext);

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div
          key={product.id}
          className="product-card"
          /* When the card is clicked, call the onSelect handler (if provided) to
             allow the parent to update the selected item for the email order bar. */
          onClick={() => {
            if (typeof onSelect === 'function') {
              onSelect(product);
            }
          }}
        >
          {/* Link to product detail page.  This link remains functional but
              clicking anywhere on the card will also trigger onSelect above. */}
          <Link to={`/clouse/${product.id}`} className="product-image-wrapper">
            <img
              className="product-img"
              src={product.images[0]}
              alt={product.name}
            />
          </Link>
          <div className="product-card-body">
            <h4 className="product-name">{product.name}</h4>
            <p className="product-price">${product.price}</p>
            <div className="product-actions">
              <img
                src="heart.png"
                alt="favourite"
                className={`action-icon ${
                  favourites.includes(product.id) ? 'active' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavourite(product.id);
                }}
              />
              <img
                src="cart.png"
                alt="cart"
                className="action-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Type;