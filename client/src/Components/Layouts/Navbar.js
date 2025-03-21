// Header.js
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { useNavContext } from "../../Context/navContext"; // Context'i import et
import axios from "axios";
import MainTop from "../Body/MainTop";

const Header = () => {
  const { setNavInfo } = useNavContext(); // Context'ten değeri al
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [adsimages, setAdsImages] = useState([]);
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleNavClick = (navItem) => {
    setNavInfo(navItem); // Tıklanan butona göre navInfo'yu ayarla 
  };

  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleSearchBar = () => {
    if (isSearchOpen) {
      setIsCollapsing(true);
      setTimeout(() => {
        setIsCollapsing(false);
        setIsSearchOpen(false);
      }, 300); // CSS transition süresiyle aynı olmalı
    } else {
      setIsCollapsing(true);
      setTimeout(() => {
        setIsCollapsing(false);
        setIsSearchOpen(true);
      }, 300); // CSS transition süresiyle aynı olmalı
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== "") {
      navigate(`/search/${searchInput.trim()}`);
    }
  };
  useEffect(() => {
    // API'den verileri çekmek için useEffect kullanıyoruz
    const fetchAds = async () => {
      try {
        const resImages = await axios.get("http://localhost:8800/api/ads/allAds");
        setAdsImages(resImages.data);

      } catch (error) {
        console.error("Error fetching most viewed announcements:", error);
      }
    };

    fetchAds();
  }, []);  // location, URL değiştikçe useEffect'i tetikler


  return (
    <>
      <div
        className={`top-search ${isCollapsing ? "collapsing" : ""} ${isSearchOpen ? "collapse show" : "collapse"
          }`}
        id="collapseExample"
        style={{
          maxHeight: isSearchOpen ? "150px" : "0",
          overflow: "hidden",
          transition: "max-height 0.5s ease-out !important",
        }}
      >
        <div className="card card-block">
          <div className="newsletter-widget text-center">
            <form className="form-inline" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="form-control"
                placeholder="Aramak istediğiniz kelimeyi giriniz"
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                <SearchIcon />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mobile-navbar" style={{ backgroundColor: "#34a346", padding: "10px 15px" }}>
        <div
          className="d-flex align-items-center justify-content-between"
          style={{ height: "50px" }}
        >
                    <div
            className="deneme d-flex align-items-center"
            style={{ cursor: "pointer", color: "white", marginLeft: '50px' }} // Arama ikonunun rengini beyaz yap
          >
            <a
            style={{ color: "white" }} 
              href="https://www.linkedin.com/company/duyurular-org/"
              data-toggle="tooltip"
              data-placement="bottom"
              title="LinkedIn"
            >
              <i className="fa fa-linkedin" />
            </a>
          </div>
          {/* Logo */}
          <div
            className="logo-container"
            style={{
              backgroundColor: "transparent", // Logo kısmının arka planını beyaz yap
              padding: "70px 70px",
              borderRadius: "5px",
              marginLeft: '5%',
            }}
          >
            <img
              src="https://cdn.imweb.me/thumbnail/20241114/974b51e91d3aa.png"
              alt="Logo"
              style={{
                maxHeight: "50px",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Search Icon */}
          <div
            className="search-container d-flex align-items-center"
            style={{ cursor: "pointer", color: "white", marginRight: '70px' }} // Arama ikonunun rengini beyaz yap
            onClick={handleSearchBar}
          >
            <SearchIcon style={{ fontSize: "24px" }} />
            <span style={{ marginLeft: "5px", fontSize: "16px" }}>Search</span>
          </div>
        </div>
      </div>




      <header className="header">
        <div className="container">
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
                <li className="nav-item">
                  <Link className="nav-link color-green-hover" to="/anasayfa" onClick={() => handleNavClick("anasayfa")}>
                    Anasayfa
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link color-green-hover" to="/cumhurbaskanligi" onClick={() => handleNavClick("cumhurbaskanligi")}>
                    Cumhurbaşkanlığı
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link color-green-hover" to="/bakanliklar" onClick={() => handleNavClick("bakanliklar")}>
                    Bakanlıklar
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link color-green-hover" to="/kurumlar" onClick={() => handleNavClick("kurumlar")}>
                    Kurumlar
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link color-green-hover" to="/resmi-gazete" onClick={() => handleNavClick("resmi-gazete")}>
                    Resmi Gazete
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link color-green-hover" to="/register" onClick={() => handleNavClick("iletisim")}>
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      




      <style>
        {`
          @media (min-width: 768px) {
            .navbar-toggler {
              display: none; 
            }
            .navbar-collapse {
              display: flex !important; 
              flex-direction: row; 
            }
            .navbar-nav {
              flex-direction: row;
              margin: 0 auto; /* Ortalamak için */
            }
            .nav-item {
              margin-left: 1rem; 
            }
          }

          @media (max-width: 767px) {
            .navbar-nav {
              flex-direction: column;
              width: 100%;
              margin: 0; /* Ortalamak için */
            }
            .nav-item {
              margin-left: 0;
              margin-bottom: 1rem;
              text-align: center; /* Mobil görünümde yazıları ortalamak için */
            }
          }
        `}
      </style>
    </>
  );
};

export default Header;
