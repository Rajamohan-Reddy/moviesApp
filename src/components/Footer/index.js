import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-bg-container">
    <div className="footer-icons-container">
      <FaGoogle className="footer-icon" />
      <FaTwitter className="footer-icon" />
      <FaInstagram className="footer-icon" />
      <FaYoutube className="footer-icon" />
    </div>
    <h1 className="contact-heading">Contact Us</h1>
  </div>
)

export default Footer
