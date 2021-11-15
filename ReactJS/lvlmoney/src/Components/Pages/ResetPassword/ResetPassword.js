import React, { Component } from "react";
import { Helmet } from "react-helmet";
import logo from "../../Images/lvl_dark.svg";
import axios from "axios";
import Server_Path from "../../Parts/Server/Server.js";
import "./ResetPassword.css";

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.origin,
      resetlevel: 0,
      Username: "",
      Password: "",
        Confirmpassword: "",
        EmailID: "",
      
    };
    this.generateURLs = this.generateURLs.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.sendData = this.sendData.bind(this);
  }
  componentDidMount() {
      this.generateURLs();
      let params = (new URL(document.location)).searchParams;
      let Username = params.get("user")
      this.setState({Username: Username})
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onClick(event) {
    event.preventDefault();

    if (event.target.id === "previous") {
      this.setState({
        resetlevel: this.state.resetlevel - 1,
      });
    }

    if (event.target.id === "next") {
      if (this.validateInput()) {
        this.sendData();
      }
    }
  }
  sendData() {
    if (this.state.resetlevel === 0) {
      axios
        .post(Server_Path.concat("forgotpassword/"), {
          Username: this.state.Username,
            Email: this.state.EmailID,
            NewPassword: this.state.Password,
        })
        .then((res) => {
         if (res.data["Status"] === true) {
            this.setState({
              resetlevel: this.state.resetlevel + 1,
            });
          }
          else {
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

      if (this.state.resetlevel === 0) {
        
        if (
            /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(
              String(this.state.EmailID).toLowerCase()
            ) === false
          ) {
            document.getElementsByTagName("label")[0].style.color = "red";
            flag = 0;
          }
        if (this.state.Password !== this.state.Confirmpassword) {
            document.getElementsByTagName("label")[1].style.color = "red";
            document.getElementsByTagName("label")[2].style.color = "red";
            flag = 0;
          }
          return flag;
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
          <title>LvLMoney | Reset Password</title>
        </Helmet>

        <div className="container-fuild ">
          {(() => {
            if (this.state.resetlevel === 0) {
              return (
                <div class="row min-vh-100 resetpassword d-flex align-items-center justify-content-center g-0 ">
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
                           
                                
                                <br />
                                <a
                                  class="btn btn-outline-info  mt-2 px-4"
                                  href={this.state.login}
                                >
                                  Log In
                                </a>
                             
                            </div>
                          </div>
                          <div class="col-md-7 d-flex flex-center">
                            <div class="p-4 p-md-5 flex-grow-1">
                                              <h3>Reset Password</h3>
                                <p class=" mb-4">Enter A New Password</p>
                              <form>
                                <div class="mb-3 ">
                                  <label
                                      class="form-label"
                                      for="card-password"
                                    >
                                      Email
                                    </label>
                                    <input
                                      class="form-control"
                                      type="Email"
                                      autocomplete="on"
                                      name="EmailID"
                                      onChange={this.onChange}
                                      value={this.state.EmailID}
                                      id="EmailID"
                                    />
                                </div>
                                <div class="mb-3 ">
                                  <label
                                      class="form-label"
                                      for="card-password"
                                    >
                                      New Password
                                    </label>
                                    <input
                                      class="form-control"
                                      type="password"
                                      autocomplete="on"
                                      name="Password"
                                      onChange={this.onChange}
                                      value={this.state.Password}
                                      id="Password"
                                    />
                                </div>
                                <div class="mb-3">
                                <label
                                      class="form-label"
                                      for="card-confirm-password"
                                    >
                                      Confirm New Password
                                    </label>
                                    <input
                                      class="form-control"
                                      type="password"
                                      name="Confirmpassword"
                                      autocomplete="on"
                                      id="Confirmpassword"
                                      onChange={this.onChange}
                                      value={this.state.Confirmpassword}
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
                                    Reset Password
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

          
            if (this.state.resetlevel === 1) {
              return (
                <div class="row min-vh-100 resetpassword d-flex align-items-center justify-content-center g-0 ">
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
                                Password Reset
                                </h4>
                                <p class="opacity-75 text-white">
                                Your password has been reset successfully.
                                </p>
                              </div>
                            </div>
                            <div class="mt-3 mb-4 mt-md-4 mb-md-5 light">
                              <p class="pt-3 text-white">
                              Please Click Here To login Into Your Account
                                <br />
                                <a
                                  class="btn btn-primary  mt-2 px-4"
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
