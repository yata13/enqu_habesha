import './App.css';
import React, { useContext, useState } from 'react';
import SlideCard from './component/slide-card';
import Type from './component/type';
import CartDropdown from './component/CartDropdown.jsx';
import products from './data/products.js';
import { CartContext } from './context/CartContext.jsx';
import EmailOrderBar from "./components/EmailOrderBar.jsx";

const App = () => {
  // Access cart count from context to display in the header
  const { cartCount } = useContext(CartContext);
  // Local state to control visibility of the cart dropdown
  const [showCart, setShowCart] = useState(false);
  // Track which item has been selected for the email order bar
  const [selected, setSelected] = useState(null);

  // When a slide or product is clicked, update the selected item.  The
  // item should be an object containing at least id, name and image.
  const handleSelectItem = (item) => {
    setSelected(item);
  };

  // Dummy array for the slider images; could be replaced with product images
  const sliderImages = [
    'gold-1.jpg',
    'gold-2.png',
    'gold-3.jpg',
    'gold-4.jpg',
    'gold-5.jpg',
    'gold-6.jpg'
  ];

  // Convert the simple array of image filenames into objects.  Each slide
  // gets its own id and a descriptive name.  When clicked, this object
  // will be passed to handleSelectItem.
  const sliderItems = sliderImages.map((src, index) => ({
    id: `promo-${index}`,
    name: `Promo ${index + 1}`,
    image: src,
    price: '$100',
    // Provide some default available sizes for promotional items.  In a
    // real application these could be fetched from the product data.
    sizes: ['S', 'M', 'L', 'XL'],
  }));

  return (
    <>
      {/* Home Hero Section */}
      <div className="home">
        <header className="header-bar brand">
          <div className="logo ">
            <img className="logo-img brand-icon" src="/logo.png"/>
              <span class="brand-text">እንቁ ሐበሻ</span>
          </div>
          <nav>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <div className="header-icons cart-wrapper" onClick={() => setShowCart((prev) => !prev)}>
            <button className="nav-button" >Shop <img className="online-shop-img" src="online-shopping.png" alt="shop"/></button>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}            
          </div>
          <CartDropdown isOpen={showCart} onClose={() => setShowCart(false)} />
        </header>

        <div className="body">
          <section className="hero">
            <div className="hero-content">
              <h1>Hi, welcome to 
                <br/><span>እንቁ ጥበብ</span></h1>
              <p>
                For farming, celebration, Christianity and various programs,<br />
                we offer beautifully crafted Habesha dresses.<br/> Whether it’s a wedding,
                cultural celebration or church ceremony, our garments will make you
                shine.<br /><br />
                ለሰርግ፣ ለሐበሻ በዓል፣ ለክርስትና የሚሠሩትን ልብሶች በልዩ
                እንቁ ጥበብ በችሎታ ስራ እንናቀቃለን።
              </p>
              <a href="#products" className="btn">Shop Collection</a>
            </div>
          </section>
        </div>
      </div>

      {/* Slider Section showing promotional items */}
      <div className="slideCard slider">
        <div className="slider-container">
          {sliderItems.map((item) => (
            <SlideCard
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              star={'star.png'}
              price={item.price}
              sizes={item.sizes}
              onSelect={() => handleSelectItem(item)}
            />
          ))}
          {/* Duplicate items for an infinite looping effect */}
          {sliderItems.map((item) => (
            <SlideCard
              key={`clone-${item.id}`}
              id={item.id}
              name={item.name}
              image={item.image}
              star={'star.png'}
              price={item.price}
              sizes={item.sizes}
              onSelect={() => handleSelectItem(item)}
            />
          ))}
        </div>
      </div>

      {/* Product grid section */}
      <section id="products" className="product-section">
        <h2 className="type-header">Explore Our Collection</h2>
        {/* Pass down a handler so that clicking on a product can set the selected item.
            The handler constructs an object with id, name and image (the first
            image in the product array) so that the EmailOrderBar can display
            meaningful information. */}
        <Type
          products={products}
          onSelect={(product) =>
            handleSelectItem({
              id: product.id,
              name: product.name,
              image: product.images[0]
            })
          }
        />
      </section>
      {/* Contact & Order section.  This section replaces the sticky bottom bar and
          provides a place for visitors to submit their email, message and
          chosen size.  The form is no longer fixed to the bottom of the
          viewport; instead it appears below the product grid like a
          traditional contact form. */}
      <section id="contact" className="contact-section">
        <h2 className="contact-header">Contact & Order</h2>
        <EmailOrderBar selected={selected} onClose={() => setSelected(null)} />
      </section>

      {/* Additional sections like Pics and Footer can be added here if desired */}
    </>
  );
};

export default App;
