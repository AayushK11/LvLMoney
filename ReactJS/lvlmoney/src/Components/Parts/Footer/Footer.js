import React, { Component } from "react";
import logo from "../../Images/lvl_dark.svg";
import "./Footer.css";

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.origin,
    };
    this.generateURLs = this.generateURLs.bind(this);
  }

  generateURLs() {
    this.setState({
  
      support: this.state.url.concat("/faq"),
      privacypolicy: this.state.url.concat("/privacypolicy"),
      termsandconditions: this.state.url.concat("/termsandconditions"),
      about: this.state.url.concat("/about"),
      register: this.state.url.concat("/register"),
  
    });
  }

  componentDidMount() {
    this.generateURLs();
  }

  render() {
    return (
      <div className="text-white bg-dark footer">
        <div className="container ">
          <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <a
              href={ window.location.origin.concat("/")}
              className="col-md-2 d-flex align-items-center justify-content mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
            >
              <img src={logo} className="footer-logo" alt="Footer logo" />
            </a>
            <ul className="nav col-md-4 justify-content-start">
              <li className="nav-item">
                <a
                  href={this.state.termsandconditions }
                  className="nav-link px-2 text-muted"
                >
                  Terms And Conditions
                </a>
              </li>
              <li className="nav-item">
                <a
                  href={ this.state.privacypolicy}
                  className="nav-link px-2 text-muted"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>

            <ul className="nav col-md-6 justify-content-end">
              <li className="nav-item">
                <a
                  href={ this.state.support}
                  className="nav-link px-2 text-muted"
                >
                  Support
                </a>
              </li>
              <li className="nav-item">
                <a
                  href={ this.state.about}
                  className="nav-link px-2 text-muted"
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://www.google.com/"
                  className="nav-link px-2 text-muted"
                >
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a
                  href={ this.state.register}
                  className="nav-link px-2 text-muted"
                >
                  Register
                </a>
              </li>
            </ul>
          </footer>
        </div>
      </div>
    );
  }
}
