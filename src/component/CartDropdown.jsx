import React from 'react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import './cartDropdown.css';

/**
 * CartDropdown displays the contents of the shopping cart.  It appears
 * beneath the cart icon in the navigation bar when activated.  Users can
 * review their selected items, adjust quantities and see the total cost.
 */
const CartDropdown = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, cartTotal } = useContext(CartContext);

  if (!isOpen) return null;

  return (
    <div className="cart-dropdown">
      <div className="cart-dropdown-header">
        <h4>Your Cart</h4>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      {cartItems.length === 0 ? (
        <p className="empty-msg">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-qty">Qty: {item.quantity}</span>
                <span className="cart-item-price">${item.price * item.quantity}</span>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
                title="Remove one"
              >
                −
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="cart-total">
        <span>Total:</span>
        <span>${cartTotal}</span>
      </div>
    </div>
  );
};

export default CartDropdown;