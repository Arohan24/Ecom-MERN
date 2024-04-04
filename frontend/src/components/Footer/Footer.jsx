import React from 'react'
import { FaFacebook ,FaTwitter,FaInstagram} from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Footer = () => {
    const year= new Date().getFullYear();
  return (
    <div className='containerFooter'>
        <div className='footer-group'>
            <h3>Follow Us</h3>
            <ul className="footerIcons">
                <li><a href="#"><FaFacebook color='yellow' size={30}/></a></li>
                <li><a href="#"><FaTwitter color='yellow' size={30}/></a></li>
                <li><a href="#"><FaInstagram color='yellow' size={30}/></a></li>
            </ul>
        </div>
        
        <div className='footer-group'>  
            <h3>Copyright</h3>
            <p>&copy;{year} All rights reserved | Design by <span>Arohan Harsh Dubey</span></p>
        </div>
         
        <div className='footer-group nav-links'>
        <NavItem to="/about" text="About Us" />
        <NavItem to="/contact" text="Contact Us" />
        </div>
    </div>
  )
}
const NavItem = ({ to, text }) => (
    <li>
      <Link to={to}>{text}</Link>
    </li>
  );
export default Footer
