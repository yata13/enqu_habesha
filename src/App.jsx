// src/App.jsx
import './App.css';
import React, { useContext, useRef, useState } from 'react';

import SlideCard from './components/slide-card.jsx';
import Type from './components/type.jsx';
import CartDropdown from './components/CartDropdown.jsx';
import products from './data/products.js';
import { CartContext } from './components/CartContext.jsx';
import EmailOrderBar from './components/EmailOrderBar.jsx';
import './style/footer.css';
import Footer from './components/footer.jsx';

const App = () => {
  const { cartCount } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);
  const [selected, setSelected] = useState(null);

  const orderSectionRef = useRef(null);

  const scrollToOrder = () => {
    // Scroll to the "Contact & Order" section
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Normalize any item to always have `images: []`
  const handleSelectItem = (item) => {
    const images = item?.images
      ? item.images
      : item?.image
        ? [item.image]
        : [];
    setSelected({ ...item, images });
    scrollToOrder();
  };

  // Promo slider items
  const sliderImages = [
    'gold-1.jpg',
    'gold-2.png',
    'gold-3.jpg',
    'gold-4.jpg',
    'gold-5.jpg',
    'gold-6.jpg',
  ];

  const sliderItems = sliderImages.map((src, index) => ({
    id: `promo-${index}`,
    name: `Promo ${index + 1}`,
    images: [src],          // important: array, not single string
    price: '$100',
    sizes: ['S', 'M', 'L', 'XL'],
  }));

  return (
    <>
      {/* Home Hero Section */}
      <div className="home" id="home">
        <header className="header-bar brand">
          <div className="logo">
            <img className="logo-img brand-icon" src="/logo.png" alt="logo" />
            <span className="brand-text">እንቁ ሐበሻ</span>
          </div>

          <nav>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>

          <div
            className="header-icons cart-wrapper"
            onClick={() => setShowCart((prev) => !prev)}
          >
            <img className="online-shop-img" src="./shopping-cart.png" alt="cart" />
            <button className="nav-button">Shop Now</button>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </div>

          {/* Cart dropdown with onCheckout hook */}
          <CartDropdown
            isOpen={showCart}
            onClose={() => setShowCart(false)}
            onCheckout={(item) => {
              setShowCart(false);
              if (item) handleSelectItem(item); // opens order form in "existing" mode
            }}
          />
        </header>

        <div className="body">
          <section className="hero">
            <div className="hero-content">
              <h1>
                Hi, welcome to
                <br />
                <span className="app-h1">እንቁ ጥበብ</span>
              </h1>
              <p>
                For farming, celebration, Christianity and various programs,<br />
                we offer beautifully crafted Habesha dresses.<br />
                Whether it’s a wedding, cultural celebration or church ceremony,<br />
                our garments will make you shine.<br />
                ለሰርግ፣ ለሐበሻ በዓል፣ ለክርስትና የሚሠሩትን ልብሶች በልዩ
                እንቁ ጥበብ በችሎታ ስራ እንናቀቃለን።
              </p>
              <a href="#products" className="btn">Shop Collection</a>
            </div>
          </section>
        </div>
      </div>

      {/* Slider Section */}
      <div className="slideCard slider">
        <div className="slider-header">
          <h2 className="slider-title">Discover Our Latest Arrivals</h2>
          <div className="decor-line" />
        </div>

        <div className="slider-container">
          {sliderItems.concat(sliderItems).map((item, idx) => (
            <SlideCard
              key={item.id + '-' + idx}
              id={item.id}
              name={item.name}
              image={item.images[0]}
              star={'star.png'}
              price={item.price}
              sizes={item.sizes}
              onSelect={() => handleSelectItem(item)} // opens order form
            />
          ))}
        </div>
      </div>

      {/* Product grid */}
      <section id="products" className="product-section">
        <h2 className="type-header">Explore Our Collection</h2>
        <Type
          products={products}
          onSelect={(product) =>
            handleSelectItem({
              id: product.id,
              name: product.name,
              images: product.images, // pass all images to preview selector
              price: product.price,
              sizes: product.sizes,
            })
          }
        />
      </section>

      {/* Contact & Order */}
      <section id="contact" className="contact-section" ref={orderSectionRef}>
        <h2 className="contact-header">Contact & Order</h2>
        {/* EmailOrderBar should render OrderSwitcher internally */}
        <EmailOrderBar selected={selected} onClose={() => setSelected(null)} />
      </section>

      <section>
        <Footer />
      </section>
    </>
  );
};

export default App;
