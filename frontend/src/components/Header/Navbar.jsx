import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserIcon from "../Icons/UserIcon";
import SearchIcon from "../Icons/SearchIcon";
import ShopBagIcon from "../Icons/ShopBagIcon";


const NavBar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <nav className="navbar montserratFont" style={{position: 'sticky', top:'0'}}>
      <div  className='logo'><NavItem to="/" text="EComm"/></div>
      <ul className="nav-links">
        <div className="mq-icon">
          <input type="Search Products" />
        <NavItemWithHover
          to="/search"
          icon={<SearchIcon hover={hoveredItem === "search"} />}
          handleMouseEnter={() => handleMouseEnter("search")}
          handleMouseLeave={handleMouseLeave}
        />
        <NavItemWithHover
          to="/cart"
          icon={<ShopBagIcon hover={hoveredItem === "cart"}/>}
          handleMouseEnter={() => handleMouseEnter("cart")}
          handleMouseLeave={handleMouseLeave}
        />
        <NavItemWithHover
          to="/login-signup"
          icon={<UserIcon hover={hoveredItem === "user"} />}
          handleMouseEnter={() => handleMouseEnter("user")}
          handleMouseLeave={handleMouseLeave}
        />
        
        </div>
        <div className="mq-link">
        <NavItem to="/" text="Home" />
        <NavItem to="/products" text="Products" />
        </div>
      </ul>
    </nav>
  );
};

const NavItem = ({ to, text }) => (
  <li>
    <Link to={to}>{text}</Link>
  </li>
);

const NavItemWithHover = ({ to, icon, handleMouseEnter, handleMouseLeave }) => (
  <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    <Link to={to}>{icon}</Link>
  </li>
);

export default NavBar;
