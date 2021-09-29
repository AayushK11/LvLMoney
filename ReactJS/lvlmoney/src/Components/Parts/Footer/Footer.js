import React, { Component } from "react";
import logo from "../../Images/lvl_dark.svg";
import "./Footer.css"

export default class Footer extends Component {
  render() {
    return (
      <div className="text-white bg-dark footer">
        <div class="container ">
          <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            

            <a
              href="https://www.google.com/"
              class="col-md-4 d-flex align-items-center justify-content mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
            >
                <img src={logo} className="footer-logo" alt="Footer logo"/>
            </a>
           
            <ul class="nav col-md-4 justify-content-end">
              <li class="nav-item">
                <a href="https://www.google.com/" class="nav-link px-2 text-muted">
               Support
                </a>
              </li>
              <li class="nav-item">
                <a href="https://www.google.com/" class="nav-link px-2 text-muted">
                  Features
                </a>
              </li>
              <li class="nav-item">
                <a href="https://www.google.com/" class="nav-link px-2 text-muted">
                  FAQs
                </a>
              </li>
              <li class="nav-item">
                <a href="https://www.google.com/" class="nav-link px-2 text-muted">
                  About
                </a>
              </li>
            </ul>
          </footer>
        </div>
      </div>
    );
  }
}
