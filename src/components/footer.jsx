import React from "react";
import "../style/footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* The white card */}
      <div className="footer-card">
        <h3 className="footer-title">Discover the Collection</h3>

        <div className="footer-grid">
          {/* Column 1: logo and intro text */}
          <div>
            <div className="footer-logo">
              <div className="logo-icon">✨</div>
            </div>
            <p className="footer-text">
              Alii tperience Onend Habasen Elegance IheIe wrtilI Ad frve ttre
              norreistemgl w inth this Stom.
            </p>
          </div>

          {/* Column 2: quick links (as in your mock) */}
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul>
              <li>Home</li>
              <li>Absit</li>
              <li>Contact</li>
              <li>About</li>
            </ul>
          </div>

          {/* Column 3: customer service (duplicates match the mock) */}
          <div>
            <h4 className="footer-heading">Customer Service</h4>
            <ul>
              <li>FAQS</li>
              <li>Shipping</li>
              <li>Retumg</li>
              <li>Size Guide</li>
              <li>Size Guide</li>
            </ul>
          </div>

          {/* Column 4: contact & socials */}
          <div>
            <h4 className="footer-heading">Contact Us</h4>
            <div className="footer-input-wrapper">
              <input type="text" placeholder="Shop New" />
            </div>
            <div className="footer-socials">
              <i className="fab fa-facebook-f" />
              <i className="fab fa-twitter" />
              <i className="fab fa-instagram" />
              <i className="fab fa-pinterest" />
            </div>
          </div>
        </div>
      </div>

      {/* Gold bar behind with centered copyright */}
      <div className="footer-bg">
        <p className="footer-bottom">
          Copyright Sebleweslams Campfnd newewled. @mgtnall.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;
