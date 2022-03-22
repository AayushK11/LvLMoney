import React, { Component } from "react";
import logo from '../../Images/lvl_dark.svg';
import "./Navbar.css";



export default class Navbar extends Component  {

  constructor(props) {
    super(props);
    this.state = {
      url: window.location.origin,
    };
    this.generateURLs = this.generateURLs.bind(this);
  }

  generateURLs() {
    this.setState({
  
      register: this.state.url.concat("/register"),
      login: this.state.url.concat("/login"),
      
  
    });
  }

  componentDidMount() {
    this.generateURLs();
  }

  render() {
    return (
      <>
     
        <nav className="navbar sticky-top navbar-expand-md navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand pe-3" href={ window.location.origin.concat("/")}>
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
                  <a className="nav-link active" aria-current="page" href={ window.location.origin.concat("/")}>
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
                    Stocks
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-dark dropdown-menu-macos mx-0 border-0 shadow"
                    aria-labelledby="navbarDropdown"style={{width: "220px;"}}>
                    <li>
                      <a className="dropdown-item" href="https://www.google.com/">
                        Forecasting
                      </a>
                    </li>
                    
                    <li>
                      <a className="dropdown-item" href="https://www.google.com/">
                        Market Sentiment Analysis
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="https://www.google.com/">
                      Sector Wise Ranking
                      </a>
                    </li>

                    <li>
                      <a className="dropdown-item" href="https://www.google.com/">
                        Trading Strategies
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
                    Mutual Funds
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-dark dropdown-menu-macos mx-0 border-0 shadow "
                    aria-labelledby="navbarDropdown"  style={{width: "220px;"}}>
                    <li>
                      <a className="dropdown-item" href="https://www.google.com/">
                        Returns Calculator
                      </a>
                    </li>
                    
                    <li>
                      <a className="dropdown-item" href="https://www.google.com/">
                        Risk Profile Test
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="https://www.google.com/">
                        Fund Ranking
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="https://www.google.com/">
                        Fund Comparison
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
                    Personal Finance
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-dark dropdown-menu-macos mx-0 border-0 shadow "
                    aria-labelledby="navbarDropdown"  style={{width: "220px;"}}>
                    <li>
                      <a className="dropdown-item" href="https://www.google.com/">
                        Financial Breakdown
                      </a>
                    </li>
                    
                    <li>
                      <a className="dropdown-item" href="https://www.google.com/">
                       Blogs
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            
              <a className="btn btn-outline-info ms-3" href={this.state.login}>Log In</a>
                
            </div>
          </div>
        </nav>
    
      </>
    );
  }
}
