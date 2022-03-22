import React, { Component } from "react";
import logo from "../../Images/lvl_dark.svg";
import "./Navbar_Login.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.origin,
      check_login: false,
    };
    this.generateURLs = this.generateURLs.bind(this);
  }

  generateURLs() {
    this.setState({
      register: this.state.url.concat("/register"),
      login: this.state.url.concat( "/login" ),
    });
  }

  componentDidMount() {
    this.generateURLs();
    // document.cookie = "username=John Doe"; test case for cookie
    let x = document.cookie;
    if (x === "") {
      this.setState({ check_login: false });
    } else {
      this.setState({ check_login: true });
    }
  }

  render() {
    return (
      <>
        <nav className="navbar sticky-top navbar-expand-md navbar-dark bg-dark">
          <div className="container">
            <a
              className="navbar-brand pe-3"
              href={window.location.origin.concat("/")}
            >
              <img src={logo} className="navbar-logo" alt="navbarLogo" />
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
              <ul
                className="navbar-nav nav nav-pills mb-3 me-auto mb-2 mb-lg-0"
                id="pills-tab"
                role="tablist"
              >
                {/* <li className="nav-item px-3 " role="presentation">
                  <a
                    className="flex-sm-fill text-sm-center nav-link "
                   
                    aria-current="page"
                    type="button"
                    
                    href={window.location.origin.concat("/")}
                  >
                    Home
                  </a>
                </li> */}
                <li className="nav-item px-3" role="presentation">
                  <button
                    className="nav-link active"
                    id="lvl-stocks-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#lvl-stocks"
                    type="button"
                    role="tab"
                    aria-controls="lvl-stocks"
                    aria-selected="true"
                  >
                    Stocks
                  </button>
                </li>
                <li className="nav-item px-3" role="presentation">
                  <button
                    className="nav-link"
                    id="lvl-funds-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#lvl-funds"
                    type="button"
                    role="tab"
                    aria-controls="lvl-funds"
                    aria-selected="false"
                  >
                    Mutual Funds
                  </button>
                </li>
                <li className="nav-item px-3" role="presentation">
                  <button
                    className="nav-link"
                    id="lvl-personal-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#lvl-personal"
                    type="button"
                    role="tab"
                    aria-controls="lvl-personal"
                    aria-selected="false"
                  >
                    Personal Finance
                  </button>
                </li>
              </ul>

              {(() => {
                if (this.state.check_login === false) {
                  return (
                    <a
                      className="btn btn-outline-info ms-3"
                      href={this.state.login}
                    >
                      login
                    </a>
                  );
                } else {
                  return (
                    <a
                      className="btn btn-outline-info ms-3"
                      href={window.location.origin.concat("/")}
                    >
                      Logout
                    </a>
                  );
                }
              })()}
            </div>
          </div>
        </nav>
      </>
    );
  }
}
