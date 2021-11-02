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
  
    });
  }

  componentDidMount() {
    this.generateURLs();
  }

  render() {
    return (
      <div className="text-white bg-dark footer">
        <div class="container ">
          <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <a
              href={ window.location.origin.concat("/")}
              class="col-md-2 d-flex align-items-center justify-content mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
            >
              <img src={logo} className="footer-logo" alt="Footer logo" />
            </a>
            <ul class="nav col-md-4 justify-content-start">
              <li class="nav-item">
                <a
                  href={this.state.termsandconditions }
                  class="nav-link px-2 text-muted"
                >
                  Terms And Conditions
                </a>
              </li>
              <li class="nav-item">
                <a
                  href={ this.state.privacypolicy}
                  class="nav-link px-2 text-muted"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>

            <ul class="nav col-md-6 justify-content-end">
              <li class="nav-item">
                <a
                  href={ this.state.support}
                  class="nav-link px-2 text-muted"
                >
                  Support
                </a>
              </li>
              <li class="nav-item">
                <a
                  href="https://www.google.com/"
                  class="nav-link px-2 text-muted"
                >
                  About
                </a>
              </li>
              <li class="nav-item">
                <a
                  href="https://www.google.com/"
                  class="nav-link px-2 text-muted"
                >
                  Login
                </a>
              </li>
              <li class="nav-item">
                <a
                  href="https://www.google.com/"
                  class="nav-link px-2 text-muted"
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
