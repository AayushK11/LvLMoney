import React, { Component } from "react";
import "./Login.css";
import { Helmet } from "react-helmet";
import logo from "../../Images/lvl_dark.svg";
import axios from "axios";
import Server_Path from "../../Parts/Server/Server.js";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.origin,
      LoginLevel: 0,
      Username: "",
      Password: "",
      TwoFA: "",
    };
    this.generateURLs = this.generateURLs.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.sendData = this.sendData.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onClick(event) {
    event.preventDefault();

    if (event.target.id === "previous") {
      this.setState({
        LoginLevel: this.state.LoginLevel - 1,
      });
    }

    if (event.target.id === "next") {
      if (this.validateInput()) {
        this.sendData();
      }
    }
  }
  sendData() {
    if (this.state.LoginLevel === 0) {
      axios
        .post(Server_Path.concat("login/"), {
          Username: this.state.Username,
          Password: this.state.Password,
        })
        .then((res) => {
          if (res.data["Status"] === true ) {
            if (res.data["TwoFA"] === true) {
              this.setState({
                LoginLevel: this.state.LoginLevel + 1,
              });
              
            }
            if (res.data["TwoFA"] === false) {
              document.cookie = "username=".concat(this.state.Username);
              this.props.history.push("/dashboard");
            }
          } else if (res.data["Status"] === false) {
            alert("Invalid Details");
          }
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
          if (!e.Status) {
            alert("Something Went Wrong");
          }
        });
    }
    if (this.state.LoginLevel === 1) {
      axios
        .post(Server_Path.concat("login/"), {
          Username: this.state.Username,
          Password: this.state.Password,
          TwoFA: this.state.TwoFA,
        })
        .then((res) => {
          if (res.data["Status"] === true) {
            document.cookie = "username=".concat(this.state.Username);
            this.props.history.push("/dashboard");
          } else if (res.data["Status"] === false) {
            alert("Invalid Details");
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

    if (this.state.LoginLevel === 0) {
      if (String(this.state.Username) === "") {
        document.getElementsByTagName("label")[0].style.color = "red";
        flag = 0;
      }

      if (String(this.state.Password) === "") {
        document.getElementsByTagName("label")[1].style.color = "red";
        flag = 0;
      }
    }
    if (this.state.LoginLevel === 1) {
      if (String(this.state.TwoFA) === "") {
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
      forgotpassword: this.state.url.concat("/forgotpassword"),
      dashboard: this.state.url.concat("/dashboard"),
    });
  }

  componentDidMount() {
    this.generateURLs();
  }

  render() {
    return (
      <>
        <Helmet>
          <title>LvLMoney | Login</title>
        </Helmet>
        {(() => {
          if (this.state.LoginLevel === 0) {
            return (
              <div className="container-fuild ">
                <div className="row min-vh-100 login d-flex align-items-center justify-content-center g-0 ">
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
                                  With the power of AI, you can now focus on your
                                  life, while leaving investing on us!
                                </p>
                              </div>
                            </div>
                            <div className="mt-3 mb-4 mt-md-4 mb-md-5 light">
                              <p className="pt-3 text-white">
                                Don't have an account?
                                <br />
                                <a
                                  className="btn btn-outline-info  mt-2 px-4"
                                  href={this.state.register}
                                >
                                  Get started!
                                </a>
                              </p>
                              <p className="mb-0 mt-4 mt-md-5 fs--1 fw-semi-bold text-white opacity-75">
                                Read our&nbsp;
                                <a
                                  className="text-decoration-underline text-white"
                                  href={this.state.termsandconditions}
                                >
                                  terms
                                </a>
                                &nbsp;and&nbsp;
                                <a
                                  className="text-decoration-underline text-white"
                                  href={this.state.privacypolicy}
                                >
                                  privacy policy
                                </a>
                              </p>
                            </div>
                          </div>
                          <div className="col-md-7 d-flex flex-center">
                            <div className="p-4 p-md-5 flex-grow-1">
                              <div className="row flex-between-center">
                                <div className="col-auto">
                                  <h3>Account Login</h3>
                                </div>
                              </div>
                              <form>
                                <div className="mb-3">
                                  <label className="form-label" for="card-email">
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
                                  <div className="d-flex justify-content-between">
                                    <label className="form-label" for="card-password">
                                      Password
                                    </label>
                                  </div>
                                  <input
                                    className="form-control"
                                    type="password"
                                    autocomplete="on"
                                    name="Password"
                                    onChange={this.onChange}
                                    value={this.state.Password}
                                    id="Password"
                                  />
                                </div>
                                <div className="row flex-between-center">
                                  <div className="col-auto">
                                    <div className="form-check mb-0">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="card-checkbox"
                                      />
                                      <label
                                        className="form-check-label mb-0"
                                        for="card-checkbox"
                                      >
                                        Remember me
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col-auto">
                                    <a className="fs--1" href={this.state.forgotpassword}>
                                      Forgot Password?
                                    </a>
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <button
                                    className="btn btn-primary d-block w-100 mt-3"
                                    type="submit"
                                    name="submit"
                                    id="next"
                                    onClick={this.onClick}
                                  >
                                    Log in
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
              </div>
            );
          }
          if (this.state.LoginLevel === 1) {
            return (
              <div className="container-fuild ">
                <div className="row min-vh-100 login d-flex align-items-center justify-content-center g-0 ">
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
                                  With the power of AI, you can now focus on your
                                  life, while leaving investing on us!
                                </p>
                              </div>
                            </div>
                            <div className="mt-3 mb-4 mt-md-4 mb-md-5 light">
                              <p className="pt-3 text-white">
                                Don't have an account?
                                <br />
                                <a
                                  className="btn btn-outline-info  mt-2 px-4"
                                  href={this.state.register}
                                >
                                  Get started!
                                </a>
                              </p>
                              <p className="mb-0 mt-4 mt-md-5 fs--1 fw-semi-bold text-white opacity-75">
                                Read our&nbsp;
                                <a
                                  className="text-decoration-underline text-white"
                                  href={this.state.termsandconditions}
                                >
                                  terms
                                </a>
                                &nbsp;and&nbsp;
                                <a
                                  className="text-decoration-underline text-white"
                                  href={this.state.privacypolicy}
                                >
                                  privacy policy
                                </a>
                              </p>
                            </div>
                          </div>
                          <div className="col-md-7 d-flex flex-center">
                            <div className="p-4 p-md-5 flex-grow-1">
                              <div className="row flex-between-center">
                                <div className="col-auto">
                                  <h3>Account Login</h3>
                                </div>
                              </div>
                              <form>
                               
                              <div className="mb-3 ">
                                    <label className="form-label" for="card-name">
                                      TOTP 
                                    </label>
                                    <input
                                      className="form-control"
                                      autocomplete="on"
                                      onChange={this.onChange}
                                      value={this.state.TwoFA}
                                      type="text"
                                      id="TwoFA"
                                      name="TwoFA"
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
                                    Verify
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
              </div>
            );
          }
        })()}
      </>
    );
  }
}
