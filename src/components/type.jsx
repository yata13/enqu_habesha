import React, { useContext } from 'react';

// Import styles scoped to the Type component
import '../style/type.css';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext.jsx';

const Type = ({ products = [], onSelect }) => {
  const { addToCart, toggleFavourite, favourites } = useContext(CartContext);

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div
          key={product.id}
          className="product-card"
                  onClick={() => {
            if (typeof onSelect === 'function') {
              onSelect(product);
            }
          }}
        >
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
              <i
                className={`fas fa-heart action-icon ${
                  favourites.includes(product.id) ? 'active' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavourite(product.id);
                }}
              />
              <i
                className="fas fa-shopping-cart action-icon"
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