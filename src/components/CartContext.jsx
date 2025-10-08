import React, { createContext, useState, useMemo } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.images[0]
        }
      ];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (!existing) return prev;
      if (existing.quantity > 1) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const toggleFavourite = (id) => {
    setFavourites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((f) => f !== id);
      }
      return [...prev, id];
    });
  };

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [cartItems]
  );

  const value = {
    cartItems,
    favourites,
    addToCart,
    removeFromCart,
    toggleFavourite,
    cartCount,
    cartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};