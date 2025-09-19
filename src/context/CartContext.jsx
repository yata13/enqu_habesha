import React, { createContext, useState, useMemo } from 'react';

/**
 * CartContext provides global state management for the shopping cart and
 * favourites list. Components can subscribe to this context to add or remove
 * items and to retrieve totals. Storing cart items in context keeps the
 * interface responsive and avoids prop-drilling.
 */
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // cartItems holds objects of the form { id, name, price, quantity, image }
  const [cartItems, setCartItems] = useState([]);
  // favourites is an array of product ids
  const [favourites, setFavourites] = useState([]);

  /**
   * Adds a product to the cart. If the product already exists in the cart,
   * its quantity is incremented. Otherwise, it is appended to the cart with
   * an initial quantity of 1.  We assume that each product object passed
   * contains at least id, name, price and images[0].
   */
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

  /**
   * Removes an item from the cart. If quantity is greater than 1 it will
   * decrement the quantity; otherwise the item is removed entirely.
   */
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

  /**
   * Toggles a product in the favourites list. If the id already exists it
   * will be removed; otherwise it will be added.  Favourites can be used
   * later for wishlists or quick access.
   */
  const toggleFavourite = (id) => {
    setFavourites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((f) => f !== id);
      }
      return [...prev, id];
    });
  };

  /**
   * Total count of items in the cart (sum of quantities).
   */
  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  /**
   * Total price of all items in the cart.
   */
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