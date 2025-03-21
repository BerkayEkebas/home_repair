import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material"; // MUI Bileşenleri Eklendi
const Navbar = () => {
      const [isNavOpen, setIsNavOpen] = useState(false);
      const [isSearchOpen, setIsSearchOpen] = useState(false);
      const [isCollapsing, setIsCollapsing] = useState(false);
      const [anchorEl, setAnchorEl] = useState(null); // Dropdown için anchorEl
      const userRole = localStorage.getItem("user");
  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleSearchBar = () => {
    if (isSearchOpen) {
      setIsCollapsing(true);
      setTimeout(() => {
        setIsCollapsing(false);
        setIsSearchOpen(false);
      }, 300);
    } else {
      setIsCollapsing(true);
      setTimeout(() => {
        setIsCollapsing(false);
        setIsSearchOpen(true);
      }, 300);
    }
  };

  useEffect(() => {
    console.log(userRole);
  }, []);

  // Dropdown Menüyü Aç/Kapat
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
             <nav className="navbar navbar-expand-md navbar-inverse">
               <button
                 className="navbar-toggler"
                 type="button"
                 onClick={handleToggle}
                 aria-controls="ForestTimemenu"
                 aria-expanded={isNavOpen}
                 aria-label="Toggle navigation"
               >
                 <span className="navbar-toggler-icon"></span>
               </button>
               <div
                 className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
                 id="ForestTimemenu"
               >
                 <ul className="navbar-nav mx-auto">
                   {/* Anasayfa Dropdown */}
                   <li 
                     className="nav-item"
                     onMouseEnter={handleMenuOpen} // Fare ile üzerine gelince açılacak
                     onMouseLeave={handleMenuClose} // Fareyi menü dışına kaydırınca kapanacak
                   >
                     <Link
                       className="nav-link color-green-hover"
                       to="/anasayfa"
                     >
                       Anasayfa
                     </Link>
                     {/* Dropdown Menüsü */}
                     <Menu
                       anchorEl={anchorEl}
                       open={Boolean(anchorEl)}
                       onClose={handleMenuClose}
                       MenuListProps={{
                         onMouseEnter: handleMenuOpen,
                         onMouseLeave: handleMenuClose,
                       }}
                     >
                       <MenuItem onClick={handleMenuClose}>
                         <Link to="/hakkimizda" className="dropdown-item">
                           Hakkımızda
                         </Link>
                       </MenuItem>
                       <MenuItem onClick={handleMenuClose}>
                         <Link to="/iletisim" className="dropdown-item">
                           İletişim
                         </Link>
                       </MenuItem>
                       <MenuItem onClick={handleMenuClose}>
                         <Link to="/yardim" className="dropdown-item">
                           Yardım
                         </Link>
                       </MenuItem>
                     </Menu>
                   </li>
   
                   <li className="nav-item">
                     <Link className="nav-link color-green-hover" to="/cumhurbaskanligi">
                       Cumhurbaşkanlığı
                     </Link>
                   </li>
                   <li className="nav-item">
                     <Link className="nav-link color-green-hover" to="/bakanliklar">
                       Bakanlıklar
                     </Link>
                   </li>
                   <li className="nav-item">
                     <Link className="nav-link color-green-hover" to="/kurumlar">
                       Kurumlar
                     </Link>
                   </li>
                   <li className="nav-item">
                     <Link className="nav-link color-green-hover" to="/resmi-gazete">
                       Resmi Gazete
                     </Link>
                   </li>
                   <li className="nav-item">
                     <Link className="nav-link color-green-hover" to="/register">
                       Register
                     </Link>
                   </li>
                 </ul>
               </div>
             </nav>
  );
};

export default Navbar;
