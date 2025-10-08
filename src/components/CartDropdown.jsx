// CartDropdown.jsx
import React, { useContext } from 'react';
import { CartContext } from './CartContext.jsx';
import '../style/cartDropdown.css';

const CartDropdown = ({ isOpen, onClose, onCheckout }) => {
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

      {cartItems.length > 0 && (
        <div className="cart-actions">
          <button
            className="checkout-btn"
            onClick={() => onCheckout?.(cartItems[0])}  
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
