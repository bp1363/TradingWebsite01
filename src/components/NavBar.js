// src/components/NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const handleRedirect = (path) => {
    window.location.href = path; // Force full reload
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo">
          <Link to="/" onClick={() => handleRedirect("/")}>
            <img src="/logo192.png" alt="Weltnexus Logo" className="logo-img" />
          </Link>
        </div>

        <ul className="nav-links-left">
          <li>
            <Link
              to="/algo-signals"
              onClick={() => handleRedirect("/algo-signals")}
            >
              Algo Signals
            </Link>
          </li>

          {/* Dropdown Tutorial Menu */}
          <li className="dropdown">
            <span className="dropdown-toggle">Tutorial</span>
            <ul className="dropdown-menu">
              <li>
                <Link
                  to="/algo-signal-setup"
                  onClick={() => handleRedirect("/algo-signal-setup")}
                >
                  AlgoSignal Setup
                </Link>
              </li>
              <li>
                <Link
                  to="/trading-view-alert"
                  onClick={() => handleRedirect("/trading-view-alert")}
                >
                  TradingView Alert
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <ul className="nav-links-right">
        <li>
          <Link to="/cart" onClick={() => handleRedirect("/cart")}>
            Cart
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
