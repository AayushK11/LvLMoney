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
                
              </ul>
            
              <a className="btn btn-outline-info ms-3" href={this.state.login}>Log In</a>
                
            </div>
          </div>
        </nav>
    
      </>
    );
  }
}
