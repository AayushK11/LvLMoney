import React, { Component } from "react";
import "./Twofa.css";
import { Helmet } from "react-helmet";
import logo from "../../Images/lvl_dark.svg";
import axios from "axios";
import QRCode from "qrcode.react";
import Server_Path from "../../Parts/Server/Server.js";

export default class Twofa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.href,
      TwoFactorLevel: 0,
      Username: "",
      Password: "",
      Link: "",
      TOTP: "",
    };
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
        TwoFactorLevel: this.state.TwoFactorLevel - 1,
      });
    }

    if (event.target.id === "next") {
      if (this.validateInput()) {
        if (
          this.state.TwoFactorLevel === 0 ||
          this.state.TwoFactorLevel === 2
        ) {
          this.sendData();
        } else {
          this.setState({
            TwoFactorLevel: this.state.TwoFactorLevel + 1,
          });
        }
      }
    }
  }

  validateInput() {
    var flag = 1;

    Array.from(document.getElementsByTagName("label")).forEach(function (
      element
    ) {
      element.style.color = "#cccce4";
    });

    if (this.state.TwoFactorLevel === 0) {
      if (String(this.state.Username) === "") {
        document.getElementsByTagName("label")[0].style.color = "red";
        flag = 0;
      }

      if (String(this.state.Password) === "") {
        document.getElementsByTagName("label")[1].style.color = "red";
        flag = 0;
      }

      return flag;
    }
    if (this.state.TwoFactorLevel === 1) {
      return flag;
    }
    if (this.state.TwoFactorLevel === 2) {
      if (!Number(this.state.TOTP) || this.state.TOTP.length !== 6) {
        document.getElementsByTagName("label")[0].style.color = "red";
        flag = 0;
      }

      return flag;
    }
  }
  sendData() {
    if (this.state.TwoFactorLevel === 0) {
      axios
        .post(Server_Path.concat("register/"), {
          Username: this.state.Username,
          Password: this.state.Password,
        })
        .then((res) => {
          console.log(res);
          this.setState({
            Link: res.data,
            TwoFactorLevel: this.state.TwoFactorLevel + 1,
          });
        })
        .catch((e) => {
          console.log(e);
          if (!e.Status) {
            alert("Something Went Wrong");
          }
        });
      }
      if (this.state.TwoFactorLevel === 2) {
        axios
          .post(Server_Path.concat("register/"), {
            Username: this.state.Username,
              Password: this.state.Password,
                TOTP: this.state.TOTP,
          })
          .then((res) => {
              if (res.data === "Valid") {
                  this.setState({
                      TwoFactorLevel: this.state.TwoFactorLevel + 1,
                  });
              }
              else { alert("Invalid TOTP") }
          })
          .catch((e) => {
            console.log(e);
            if (!e.Status) {
              alert("Something Went Wrong");
            }
          });
      }
  }

  render() {
    return (
      <>
        <Helmet>
          <title>LvLMoney | Register</title>
        </Helmet>

        <div className="container-fuild ">
          {(() => {
            if (this.state.TwoFactorLevel === 0) {
              return (
                <div class="row min-vh-100  register d-flex align-items-center justify-content-center g-0 ">
                  <div class="col-lg-8 col-xxl-5 py-3 position-relative  ">
                    <div class="card overflow-hidden z-index-1  rightdiv ">
                      <div class="card-body p-0 ">
                        <div class="row g-0 h-100 ">
                          <div class="col-md-5 text-center bg-dark ">
                            <div class="position-relative p-4 pt-md-5 pb-md-7 dark">
                              <div class="bg-holder bg-auth-card-shape"></div>

                              <div class="z-index-1 position-relative">
                                <a
                                  class="mb-4 d-inline-block"
                                  href={window.location.origin.concat("/")}
                                >
                                  <img
                                    src={logo}
                                    className="navbar-logo"
                                    alt="navbarLogo"
                                  />
                                </a>
                                <p class="opacity-75 text-white">
                                  With the power of AI, you can now focus on
                                  your life, while leaving investing on us!
                                </p>
                              </div>
                            </div>
                            <div class="mt-3 mb-4 mt-md-4 mb-md-5 light">
                              <p class="pt-3 text-white">
                                Have an account?
                                <br />
                                <a
                                  class="btn btn-outline-info  mt-2 px-4"
                                  href={this.state.login}
                                >
                                  Log In
                                </a>
                              </p>
                            </div>
                          </div>
                          <div class="col-md-7 d-flex flex-center">
                            <div class="p-4 p-md-5 flex-grow-1">
                              <h3>Two Factor</h3>
                              <form>
                                <div class="mb-3 ">
                                  <label class="form-label" for="card-name">
                                    Username
                                  </label>
                                  <input
                                    class="form-control"
                                    autocomplete="on"
                                    onChange={this.onChange}
                                    value={this.state.Username}
                                    type="text"
                                    id="Username"
                                    name="Username"
                                  />
                                </div>
                                <div class="mb-3 ">
                                  <label class="form-label" for="card-name">
                                    Password
                                  </label>
                                  <input
                                    class="form-control"
                                    autocomplete="on"
                                    onChange={this.onChange}
                                    value={this.state.Password}
                                    type="Password"
                                    id="Password"
                                    name="Password"
                                  />
                                </div>

                                <div class="mb-3">
                                  <button
                                    class="btn btn-primary d-block w-100 mt-3"
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
              );
            }
            if (this.state.TwoFactorLevel === 1) {
              return (
                <div class="row min-vh-100  register d-flex align-items-center justify-content-center g-0 ">
                  <div class="col-lg-8 col-xxl-5 py-3 position-relative  ">
                    <div class="card overflow-hidden z-index-1  rightdiv ">
                      <div class="card-body p-0 ">
                        <div class="row g-0 h-100 ">
                          <div class="col-md-5 text-center bg-dark ">
                            <div class="position-relative p-4 pt-md-5 pb-md-7 dark">
                              <div class="bg-holder bg-auth-card-shape"></div>

                              <div class="z-index-1 position-relative">
                                <a
                                  class="mb-4 d-inline-block"
                                  href={window.location.origin.concat("/")}
                                >
                                  <img
                                    src={logo}
                                    className="navbar-logo"
                                    alt="navbarLogo"
                                  />
                                </a>
                                <p class="opacity-75 text-white">
                                  With the power of AI, you can now focus on
                                  your life, while leaving investing on us!
                                </p>
                              </div>
                            </div>
                            <div class="mt-3 mb-4 mt-md-4 mb-md-5 light">
                              <p class="pt-3 text-white">
                                Have an account?
                                <br />
                                <a
                                  class="btn btn-outline-info  mt-2 px-4"
                                  href={this.state.login}
                                >
                                  Log In
                                </a>
                              </p>
                            </div>
                          </div>
                          <div class="col-md-7 d-flex flex-center">
                            <div class="p-4 p-md-5 flex-grow-1">
                              <h3>Two Factor</h3>
                              <h5>Add An Authenticator</h5>
                              <form>
                                <div class="mb-3 d-flex justify-content-around align-items-center">
                                  <QRCode
                                    id={this.state.Link}
                                    value={this.state.Link}
                                    size={290}
                                    includeMargin={true}
                                  />
                                </div>

                                <div class="mb-3">
                                  <button
                                    class="btn btn-primary d-block w-100 mt-3"
                                    type="submit"
                                    name="submit"
                                    id="next"
                                    onClick={this.onClick}
                                  >
                                    Continue
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
            if (this.state.TwoFactorLevel === 2) {
                return (
                  <div class="row min-vh-100  register d-flex align-items-center justify-content-center g-0 ">
                    <div class="col-lg-8 col-xxl-5 py-3 position-relative  ">
                      <div class="card overflow-hidden z-index-1  rightdiv ">
                        <div class="card-body p-0 ">
                          <div class="row g-0 h-100 ">
                            <div class="col-md-5 text-center bg-dark ">
                              <div class="position-relative p-4 pt-md-5 pb-md-7 dark">
                                <div class="bg-holder bg-auth-card-shape"></div>
  
                                <div class="z-index-1 position-relative">
                                  <a
                                    class="mb-4 d-inline-block"
                                    href={window.location.origin.concat("/")}
                                  >
                                    <img
                                      src={logo}
                                      className="navbar-logo"
                                      alt="navbarLogo"
                                    />
                                  </a>
                                  <p class="opacity-75 text-white">
                                    With the power of AI, you can now focus on
                                    your life, while leaving investing on us!
                                  </p>
                                </div>
                              </div>
                              <div class="mt-3 mb-4 mt-md-4 mb-md-5 light">
                                <p class="pt-3 text-white">
                                  Have an account?
                                  <br />
                                  <a
                                    class="btn btn-outline-info  mt-2 px-4"
                                    href={this.state.login}
                                  >
                                    Log In
                                  </a>
                                </p>
                              </div>
                            </div>
                            <div class="col-md-7 d-flex flex-center">
                              <div class="p-4 p-md-5 flex-grow-1">
                                <h3>Two Factor</h3>
                                <form>
                                  <div class="mb-3 ">
                                    <label class="form-label" for="card-name">
                                      TOTP 
                                    </label>
                                    <input
                                      class="form-control"
                                      autocomplete="on"
                                      onChange={this.onChange}
                                      value={this.state.TOTP}
                                      type="text"
                                      id="TOTP"
                                      name="TOTP"
                                    />
                                  </div>
                                  
  
                                  <div class="mb-3">
                                    <button
                                      class="btn btn-primary d-block w-100 mt-3"
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
                );
              }
            if (this.state.TwoFactorLevel === 3) {
              return (
                <div class="row min-vh-100  register d-flex align-items-center justify-content-center g-0 ">
                  <div class="col-lg-8 col-xxl-5 py-3 position-relative  ">
                    <div class="card overflow-hidden z-index-1 rightdiv ">
                      <div class="card-body p-0 ">
                        <div class="row g-0 h-100 ">
                          <div class="col-md-12 text-center bg-dark ">
                            <div class="position-relative p-4 pt-md-5 pb-md-7 dark">
                              <div class="bg-holder bg-auth-card-shape"></div>

                              <div class="z-index-1 position-relative">
                                <a
                                  class="mb-4 d-inline-block"
                                  href={window.location.origin.concat("/")}
                                >
                                  <img
                                    src={logo}
                                    className="navbar-logo"
                                    alt="navbarLogo"
                                  />
                                </a>
                                <h4 class="opacity-100 text-white">
                                  Congratuations
                                </h4>
                                <p class="opacity-75 text-white">
                                  Your LvLMoney Account has been created.{" "}
                                  <br></br> Please check your email for
                                  confirmation.
                                </p>
                              </div>
                            </div>
                            <div class="mt-3 mb-4 mt-md-4 mb-md-5 light">
                              <p class="pt-3 text-white">
                                Please Login to continue
                                <br />
                                <a
                                  class="btn btn-outline-info  mt-2 px-4"
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
