// src/components/EmailOrderBar.jsx
//
// This component acts as a simple wrapper around the order forms. When a
// product is selected in the application, it renders the appropriate
// order form for that selection. The heavy lifting of handling the
// various modes (existing style vs. custom design) and submitting the
// form data to Formspree is delegated to the `OrderSwitcher`
// component. When nothing is selected, the bar remains hidden.

import React from 'react';
import OrderSwitcher from './OrderSwitcher.jsx';

/**
 * EmailOrderBar is responsible for displaying the order section when a
 * product has been selected by the user. It forwards the selected
 * product and an optional onClose callback to the `OrderSwitcher`
 * component. If no product is selected, it returns null so that
 * nothing is displayed.
 *
 * @param {Object} props
 * @param {Object|null} props.selected - The currently selected product.
 * @param {Function} props.onClose - Callback invoked when the user
 *   closes or completes the order form.
 */
export default function EmailOrderBar({ selected, onClose }) {
  // Do not render anything when no product is selected.
  if (!selected) {
    return null;
  }

  // Render the order form wrapper. All form logic lives within
  // OrderSwitcher; this component simply passes through props.
  return <OrderSwitcher selected={selected} onClose={onClose} />;
}
