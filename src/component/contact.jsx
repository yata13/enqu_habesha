import React from 'react';
import './Footer.css'; // Import the CSS file for styling
const Footer = (props) => {
  return (
    <footer className="footer">
      {/* Main Content */}
      <div className="footer-content">
        <div className="footer-section">
          <h3>Support</h3>
          <p>
            685 Market Street,<br />
            Las Vegas, LA 95620,<br />
            United States.
          </p>
          <p>
            <i className="fas fa-envelope"></i> t.me/enquhabesha
          </p>
          <p>
            <i className="fas fa-phone"></i> (+251) 929 260 629 
          </p>
        </div>

        <div className="footer-section">
          <h3>Account</h3>
          <ul>
            <li><a href="t.me/enquhabesha">telegram</a></li>
            <li><a href="https://www.tiktok.com/@enquhabesh21">Tik Tok</a></li>
            <li><a href="">instagram</a></li>
            <li><a href="/wishlist">Wishlist</a></li>
            <li><a href="/shop">Shop</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Quick Link</h3>
          <ul>
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-of-use">Terms Of Use</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Download App</h3>
          <p>Save $3 With App & New User only</p>
          <div className="app-links">
            <img src={props.scanImg} alt="QR Code" className="qr-code" />
            <div>
              <a href="#" className="app-link">
                <img src={props.appImg} alt="Apple App Store" />
              </a>
              <a href="#" className="app-link">
                <img src= {props.playImg} alt="Google Play Store" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        {/* Social Media Icons */}
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-linkedin-in"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
        </div>

        {/* Copyright Text */}
        <p className="copyright">© 2023. All rights reserved by AxiThemes.</p>

        {/* Payment Methods */}
        <div className="payment-methods">
          <span>Accept For</span>
          <img src="https://via.placeholder.com/30" alt="PayPal" />
          <img src="https://via.placeholder.com/30" alt="MasterCard" />
          <img src="https://via.placeholder.com/30" alt="Visa" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;