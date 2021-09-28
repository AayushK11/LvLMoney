import React, { Component } from "react";
import logo from '../../Images/lvl_dark.svg';
import "./Navbar.css";



export default class Navbar extends Component {
  render() {
    return (
      <>
     
        <nav className="navbar sticky-top navbar-expand-md navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand pe-3" href="https://www.google.com/">
            <img src={logo} className="navbar-logo" alt="navbarLogo"/>
           
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item px-3">
                  <a className="nav-link active" aria-current="page" href="https://www.google.com/">
                    Home
                  </a>
                </li>
                <li className="nav-item px-3 dropdown">
                  <a
                    className="nav-link active dropdown-toggle"
                    href="https://www.google.com/"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Investments
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-dark dropdown-menu-macos mx-0 border-0 shadow"
                    aria-labelledby="navbarDropdown"style={{width: "220px;"}}>
                    <li>
                      <a className="dropdown-item" href="https://www.google.com/">
                        Stocks
                      </a>
                    </li>
                    
                    <li>
                      <a className="dropdown-item" href="https://www.google.com/">
                        Mutual Funds
                      </a>
                    </li>
                    

                    <li>
                      <a className="dropdown-item" href="https://www.google.com/">
                        Financial Plan
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item px-3 dropdown">
                  <a
                    className="nav-link active dropdown-toggle"
                    href="https://www.google.com/"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Calculators
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-dark dropdown-menu-macos mx-0 border-0 shadow "
                    aria-labelledby="navbarDropdown"  style={{width: "220px;"}}>
                    <li>
                      <a className="dropdown-item" href="https://www.google.com/">
                        SIP Calculator
                      </a>
                    </li>
                    
                    <li>
                      <a className="dropdown-item" href="https://www.google.com/">
                        Tax Calculator
                      </a>
                    </li>
                    
                  </ul>
                </li>
                <li className="nav-item px-3">
                  <a className="nav-link active" aria-current="page" href="https://www.google.com/">
                    Blogs
                  </a>
                </li>
              </ul>
            
              <button type="button" class="btn btn-outline-info ms-3">Login</button>
                
            </div>
          </div>
        </nav>
    
      </>
    );
  }
}
