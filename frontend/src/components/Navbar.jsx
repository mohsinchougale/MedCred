import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import "./Navbar.css";
import Dropdown from "./Dropdown";

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [val, setVal] = useState("");

  // if (user) console.log(user);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {
    setClick(false);
    localStorage.clear();
  };
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (user?.data?.result?.name) setVal(user.data.result.name);
  }, [user]);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        {/* <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img className="navbar-img" src={icon} alt="mohsin.jpg" />
        </Link> */}

        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          MedCred
          <i className="fab fa-firstdraft" />
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          {val ? (
            <li
              className="nav-item"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Logout <i className="fas fa-caret-down" />
              </Link>
            </li>
          ) : (
            <li
              className="nav-item"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Login <i className="fas fa-caret-down" />
              </Link>
              {dropdown && <Dropdown />}
            </li>
          )}

          <li className="nav-item">
            <Link
              to="/contact-us"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Contact us
            </Link>
          </li>
          <li>
            <Link
              to="/sign-up"
              className="nav-links-mobile"
              onClick={closeMobileMenu}
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
