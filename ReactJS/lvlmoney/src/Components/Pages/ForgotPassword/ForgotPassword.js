import React, { Component } from "react";
import { Helmet } from "react-helmet";
import logo from "../../Images/lvl_dark.svg";
import axios from "axios";
import Server_Path from "../../Parts/Server/Server.js";
import "./ForgotPassword.css";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.origin,
      FPLevel: 0,
      Username: "",
      EmailID: "",
      TOTP: "",
    };
    this.generateURLs = this.generateURLs.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.sendData = this.sendData.bind(this);
  }
  componentDidMount() {
    this.generateURLs();
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onClick(event) {
    event.preventDefault();

    if (event.target.id === "previous") {
      this.setState({
        FPLevel: this.state.FPLevel - 1,
      });
    }

    if (event.target.id === "next") {
      if (this.validateInput()) {
        this.sendData();
      }
    }
  }
  sendData() {
    if (this.state.FPLevel === 0) {
      axios
        .post(Server_Path.concat("forgotpassword/"), {
          Username: this.state.Username,
          Email: this.state.EmailID,
        })
        .then((res) => {
          if (res.data["Status"] === "2FA") {
            this.setState({
              FPLevel: this.state.FPLevel + 1,
            });

            
          } else if (res.data["Status"] === true) {
            this.setState({
              FPLevel: this.state.FPLevel + 2,
            });
          }
          else {
            alert("Invalid Username or EmailID");
          }
          
        
        })
        .catch((e) => {
          console.log(e);
          if (!e.Status) {
            alert("Something Went Wrong");
          }
        });
    }
    if (this.state.FPLevel === 1) {
      axios
        .post(Server_Path.concat("forgotpassword/"), {
          Username: this.state.Username,
          Email: this.state.EmailID,
          TwoFA: this.state.TOTP,
        })
        .then((res) => {
          if (res.data["Status"] === true) {
            this.setState({
              FPLevel: this.state.FPLevel + 1,
            });
          } else if (res.data["Status"] === false) {
            alert("Invalid TOTP");
          }
        })
        .catch((e) => {
          console.log(e);
          if (!e.Status) {
            alert("Something Went Wrong");
          }
        });
    }
  }
  validateInput() {
    var flag = 1;

    Array.from(document.getElementsByTagName("label")).forEach(function (
      element
    ) {
      element.style.color = "#cccce4";
    });

    if (this.state.FPLevel === 0) {
      if (String(this.state.Username) === "") {
        document.getElementsByTagName("label")[0].style.color = "red";
        flag = 0;
      }

      if (String(this.state.EmailID) === "") {
        document.getElementsByTagName("label")[1].style.color = "red";
        flag = 0;
      }
    }
    if (this.state.FPLevel === 1) {
      if (String(this.state.TOTP) === "") {
        document.getElementsByTagName("label")[0].style.color = "red";
        flag = 0;
      }
    }

    return flag;
  }
  generateURLs() {
    this.setState({
      privacypolicy: this.state.url.concat("/privacypolicy"),
      termsandconditions: this.state.url.concat("/termsandconditions"),
      register: this.state.url.concat("/register"),
      login: this.state.url.concat("/login"),
      forgotpassword: this.state.url.concat("/forgotpassword"),
    });
  }
  render() {
    return (
      <>
        <Helmet>
          <title>LvLMoney | Forgot Password</title>
        </Helmet>

        <div className="container-fuild ">
          {(() => {
            if (this.state.FPLevel === 0) {
              return (
                <div className="row min-vh-100  forgotpassword d-flex align-items-center justify-content-center g-0 ">
                  <div className="col-lg-8 col-xxl-5 py-3 position-relative  ">
                    <div className="card overflow-hidden z-index-1  rightdiv ">
                      <div className="card-body p-0 ">
                        <div className="row g-0 h-100 ">
                          <div className="col-md-5 text-center bg-dark ">
                            <div className="position-relative p-4 pt-md-5 pb-md-7 dark">
                              <div className="bg-holder bg-auth-card-shape"></div>

                              <div className="z-index-1 position-relative">
                                <a
                                  className="mb-4 d-inline-block"
                                  href={window.location.origin.concat("/")}
                                >
                                  <img
                                    src={logo}
                                    className="navbar-logo"
                                    alt="navbarLogo"
                                  />
                                </a>
                                <p className="opacity-75 text-white">
                                  With the power of AI, you can now focus on
                                  your life, while leaving investing on us!
                                </p>
                              </div>
                            </div>
                            <div className="mt-3 mb-4 mt-md-4 mb-md-5 light">
                           
                                
                                <br />
                                <a
                                  className="btn btn-outline-info  mt-2 px-4"
                                  href={this.state.login}
                                >
                                  Log In
                                </a>
                             
                            </div>
                          </div>
                          <div className="col-md-7 d-flex flex-center">
                            <div className="p-4 p-md-5 flex-grow-1">
                              <h3>Forgot Password</h3>
                              <form>
                                <div className="mb-3 ">
                                  <label className="form-label" for="card-name">
                                    User Name
                                  </label>
                                  <input
                                    className="form-control"
                                    autocomplete="on"
                                    onChange={this.onChange}
                                    value={this.state.Username}
                                    type="text"
                                    id="Username"
                                    name="Username"
                                  />
                                </div>

                                <div className="mb-3">
                                  <label className="form-label" for="card-email">
                                    Email address
                                  </label>
                                  <input
                                    className="form-control"
                                    autocomplete="on"
                                    onChange={this.onChange}
                                    value={this.state.EmailID}
                                    type="email"
                                    id="EmailID"
                                    name="EmailID"
                                  />
                                </div>

                                <div className="mb-3">
                                  <button
                                    className="btn btn-primary d-block w-100 mt-3"
                                    type="submit"
                                    name="submit"
                                    id="next"
                                    onClick={this.onClick}
                                  >
                                    Next
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            if (this.state.FPLevel === 1) {
              return (
                <div className="row min-vh-100  register d-flex align-items-center justify-content-center g-0 ">
                  <div className="col-lg-8 col-xxl-5 py-3 position-relative  ">
                    <div className="card overflow-hidden z-index-1  rightdiv ">
                      <div className="card-body p-0 ">
                        <div className="row g-0 h-100 ">
                          <div className="col-md-5 text-center bg-dark ">
                            <div className="position-relative p-4 pt-md-5 pb-md-7 dark">
                              <div className="bg-holder bg-auth-card-shape"></div>

                              <div className="z-index-1 position-relative">
                                <a
                                  className="mb-4 d-inline-block"
                                  href={window.location.origin.concat("/")}
                                >
                                  <img
                                    src={logo}
                                    className="navbar-logo"
                                    alt="navbarLogo"
                                  />
                                </a>
                                <p className="opacity-75 text-white">
                                  With the power of AI, you can now focus on
                                  your life, while leaving investing on us!
                                </p>
                              </div>
                            </div>
                            
                          </div>
                          <div className="col-md-7 d-flex flex-center">
                            <div className="p-4 p-md-5 flex-grow-1">
                              <h3>Forgot Password</h3>
                              <form>
                                <div className="mb-3">
                                  <label className="form-label" for="card-name">
                                    TOTP
                                  </label>
                                  <input
                                    className="form-control"
                                    autocomplete="on"
                                    onChange={this.onChange}
                                    value={this.state.TOTP}
                                    type="text"
                                    id="TOTP"
                                    name="TOTP"
                                  />
                                </div>

                                <div className="row gx-2">
                                  <div className="mb-3 col-sm-6">
                                    <button
                                      className="btn btn-primary d-block w-100 mt-3"
                                      type="submit"
                                      name="submit"
                                      id="previous"
                                      onClick={this.onClick}
                                    >
                                      Back
                                    </button>
                                  </div>
                                  <div className="mb-3 col-sm-6">
                                    <button
                                      className="btn btn-primary d-block w-100 mt-3"
                                      type="submit"
                                      name="submit"
                                      id="next"
                                      onClick={this.onClick}
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            if (this.state.FPLevel === 2) {
              return (
                <div className="row min-vh-100  register d-flex align-items-center justify-content-center g-0 ">
                  <div className="col-lg-8 col-xxl-5 py-3 position-relative  ">
                    <div className="card overflow-hidden z-index-1 rightdiv ">
                      <div className="card-body p-0 ">
                        <div className="row g-0 h-100 ">
                          <div className="col-md-12 text-center bg-dark ">
                            <div className="position-relative p-4 pt-md-5 pb-md-7 dark">
                              <div className="bg-holder bg-auth-card-shape"></div>

                              <div className="z-index-1 position-relative">
                                <a
                                  className="mb-4 d-inline-block"
                                  href={window.location.origin.concat("/")}
                                >
                                  <img
                                    src={logo}
                                    className="navbar-logo"
                                    alt="navbarLogo"
                                  />
                                </a>
                                <h4 className="opacity-100 text-white">
                                Reset your password
                                </h4>
                                <p className="opacity-75 text-white">
                                A password reset link was sent. Click the link in the email to create a new password.
                                </p>
                              </div>
                            </div>
                            <div className="mt-3 mb-4 mt-md-4 mb-md-5 light">
                              <p className="pt-3 text-white">
                              Return to Home
                                <br />
                                <a
                                  className="btn btn-primary  mt-2 px-4"
                                  href={window.location.origin.concat("/")}
                                >
                                  Home
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })()}
        </div>
      </>
    );
  }
}
