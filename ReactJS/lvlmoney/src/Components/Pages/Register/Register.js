import React, { Component } from "react";
import "./Register.css";
import { Helmet } from "react-helmet";
import logo from "../../Images/lvl_dark.svg";
import axios from "axios";
import Server_Path from "../../Parts/Server/Server.js";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.origin,
      registerstate: 0,
      FirstName: "",
      LastName: "",
      EmailID: "",
      PhoneNumber: "",
      Username: "",
      Password: "",
      Confirmpassword: "",
      tc: "",
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
        registerstate: this.state.registerstate - 1,
      });
    }

    if (event.target.id === "next") {
      if (this.validateInput()) {
        this.sendData();
      }
    }
  }

  sendData() {
    if (this.state.registerstate === 0) {
      axios
        .post(Server_Path + "register/", {
          EmailID: this.state.EmailID,
          PhoneNumber: this.state.PhoneNumber,
        })
        .then((res) => {
          // console.log(res);
          if (res.data === "Valid") {
            this.setState({
              registerstate: this.state.registerstate + 1,
            });
          }
        })
        .catch((e) => {
          console.log(e);
          if (!e.status) {
            alert("Something Went Wrong ");
          }
        });
    }
    if (this.state.registerstate === 1) {
      axios
        .post(Server_Path + "register/", {
          EmailID: this.state.EmailID,
          PhoneNumber: this.state.PhoneNumber,
          Username: this.state.Username,
          Password: this.state.Password,
          FirstName: this.state.FirstName,
          LastName: this.state.LastName,
        })
        .then((res) => {
          if (res.data === "Valid") {
            this.setState({
              registerstate: this.state.registerstate + 1,
            });
          }
        })
        .catch((e) => {
          console.log(e);
          if (!e.status) {
            alert("Something Went Wrong ");
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

    if (this.state.registerstate === 0) {
      if (String(this.state.FirstName) === "") {
        document.getElementsByTagName("label")[0].style.color = "red";
        flag = 0;
      }

      if (String(this.state.LastName) === "") {
        document.getElementsByTagName("label")[1].style.color = "red";
        flag = 0;
      }

      if (
        /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(
          String(this.state.EmailID).toLowerCase()
        ) === false
      ) {
        document.getElementsByTagName("label")[2].style.color = "red";
        flag = 0;
      }

      if (
        !Number(this.state.PhoneNumber) ||
        this.state.PhoneNumber.length !== 10
      ) {
        document.getElementsByTagName("label")[3].style.color = "red";
        flag = 0;
      }

      return flag;
    }
    if (this.state.registerstate === 1) {
      if (String(this.state.Username) === "") {
        document.getElementsByTagName("label")[0].style.color = "red";
        flag = 0;
      }

      // if (
      //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      //     String(this.state.Password).toLowerCase()
      //   ) === false
      // ) {
      //   document.getElementsByTagName("label")[1].style.color = "red";
      //   document.getElementsByTagName("label")[2].style.color = "red";
      //   flag = 0;
      // }

      if (this.state.Password !== this.state.Confirmpassword) {
        document.getElementsByTagName("label")[1].style.color = "red";
        document.getElementsByTagName("label")[2].style.color = "red";
        flag = 0;
      }

      return flag;
    }
  }

  generateURLs() {
    this.setState({
      privacypolicy: this.state.url.concat("/privacypolicy"),
      termsandconditions: this.state.url.concat("/termsandconditions"),
      login: this.state.url.concat("/login"),
    });
  }

  componentDidMount() {
    this.generateURLs();
  }

  render() {
    return (
      <>
        <Helmet>
          <title>LvLMoney | Register</title>
        </Helmet>

        <div className="container-fuild ">
          {(() => {
            if (this.state.registerstate === 0) {
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
                            <div className="mt-3 mb-4 mt-md-4 mb-md-5 light">
                              <p className="pt-3 text-white">
                                Have an account?
                                <br />
                                <a
                                  className="btn btn-outline-info  mt-2 px-4"
                                  href={this.state.login}
                                >
                                  Log In
                                </a>
                              </p>
                            </div>
                          </div>
                          <div className="col-md-7 d-flex flex-center">
                            <div className="p-4 p-md-5 flex-grow-1">
                              <h3>Register</h3>
                              <form>
                                <div className="row gx-2">
                                  <div className="mb-3 col-sm-6">
                                    <label className="form-label" for="card-name">
                                      First Name
                                    </label>
                                    <input
                                      className="form-control"
                                      autocomplete="on"
                                      onChange={this.onChange}
                                      value={this.state.FirstName}
                                      type="text"
                                      id="FirstName"
                                      name="FirstName"
                                    />
                                  </div>
                                  <div className="mb-3 col-sm-6">
                                    <label className="form-label" for="card-name">
                                      Last Name
                                    </label>
                                    <input
                                      className="form-control"
                                      autocomplete="on"
                                      onChange={this.onChange}
                                      value={this.state.LastName}
                                      type="text"
                                      id="LastName"
                                      name="LastName"
                                    />
                                  </div>
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
                                  <label className="form-label" for="card-name">
                                    Phone Number
                                  </label>
                                  <input
                                    onChange={this.onChange}
                                    value={this.state.PhoneNumber}
                                    type="tel"
                                    maxLength="10"
                                    id="PhoneNumber"
                                    name="PhoneNumber"
                                    className="form-control"
                                    autocomplete="on"
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

            if (this.state.registerstate === 1) {
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
                            <div className="mt-3 mb-4 mt-md-4 mb-md-5 light">
                              <p className="pt-3 text-white">
                                Have an account?
                                <br />
                                <a
                                  className="btn btn-outline-info  mt-2 px-4"
                                  href={this.state.login}
                                >
                                  Log In
                                </a>
                              </p>
                            </div>
                          </div>
                          <div className="col-md-7 d-flex flex-center">
                            <div className="p-4 p-md-5 flex-grow-1">
                              <h3>Register</h3>
                              <form>
                                <div className="mb-3">
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

                                <div className="row gx-2">
                                  <div className="mb-3 col-sm-6">
                                    <label
                                      className="form-label"
                                      for="card-password"
                                    >
                                      Password
                                    </label>
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
                                  <div className="mb-3 col-sm-6">
                                    <label
                                      className="form-label"
                                      for="card-confirm-password"
                                    >
                                      Confirm Password
                                    </label>
                                    <input
                                      className="form-control"
                                      type="password"
                                      name="Confirmpassword"
                                      autocomplete="on"
                                      id="Confirmpassword"
                                      onChange={this.onChange}
                                      value={this.state.Confirmpassword}
                                    />
                                  </div>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="tc"
                                  />
                                  <label
                                    className="form-label"
                                    for="card-register-checkbox"
                                  >
                                    I accept the{" "}
                                    <a href={this.state.termsandconditions}>
                                      terms
                                    </a>
                                    &nbsp; and &nbsp;
                                    <a href={this.state.privacypolicy}>
                                      privacy policy
                                    </a>
                                  </label>
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
                                      Next
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
            if (this.state.registerstate === 2) {
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
                                  Congratuations
                                </h4>
                                <p className="opacity-75 text-white">
                                  Your LvLMoney Account has been created.{" "}
                                  <br></br> Please check your email for
                                  confirmation and to set up two factor
                                  authentication.
                                </p>
                              </div>
                            </div>
                            <div className="mt-3 mb-4 mt-md-4 mb-md-5 light">
                              <p className="pt-3 text-white">
                                Please Login to continue
                                <br />
                                <a
                                  className="btn btn-outline-info  mt-2 px-4"
                                  href={this.state.login}
                                >
                                  Log In
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
