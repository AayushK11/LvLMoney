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
                <div className="row min-vh-100 resetpassword d-flex align-items-center justify-content-center g-0 ">
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
                                              <h3>Reset Password</h3>
                                <p className=" mb-4">Enter A New Password</p>
                              <form>
                                <div className="mb-3 ">
                                  <label
                                      className="form-label"
                                      for="card-password"
                                    >
                                      Email
                                    </label>
                                    <input
                                      className="form-control"
                                      type="Email"
                                      autocomplete="on"
                                      name="EmailID"
                                      onChange={this.onChange}
                                      value={this.state.EmailID}
                                      id="EmailID"
                                    />
                                </div>
                                <div className="mb-3 ">
                                  <label
                                      className="form-label"
                                      for="card-password"
                                    >
                                      New Password
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
                                <div className="mb-3">
                                <label
                                      className="form-label"
                                      for="card-confirm-password"
                                    >
                                      Confirm New Password
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

                                <div className="mb-3">
                                  <button
                                    className="btn btn-primary d-block w-100 mt-3"
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
                <div className="row min-vh-100 resetpassword d-flex align-items-center justify-content-center g-0 ">
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
                                Password Reset
                                </h4>
                                <p className="opacity-75 text-white">
                                Your password has been reset successfully.
                                </p>
                              </div>
                            </div>
                            <div className="mt-3 mb-4 mt-md-4 mb-md-5 light">
                              <p className="pt-3 text-white">
                              Please Click Here To login Into Your Account
                                <br />
                                <a
                                  className="btn btn-primary  mt-2 px-4"
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
