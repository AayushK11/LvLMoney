import React from "react";
import Footer from "../../Parts/Footer/Footer";
import Navbar from "../../Parts/Navbar/Navbar";
import { Confirmation } from "../../Parts/Confirmation/Confirmation.js";
import "./ContactUs.css";
import axios from "axios";
import Server_Path from "../../Parts/Server/Server.js";
import { Helmet } from "react-helmet";

export default class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.href,
      ContactUsLevel: 0,
      FirstName: "",
      LastName: "",
      Email: "",
      PhoneNumber: "",
      Issue: "",
    };
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.sendData = this.sendData.bind(this);
    
  }

  onClick(event) {
    event.preventDefault();
    if (this.validateInput()) {
      this.sendData();
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  sendData() {
    console.log("sent")
    axios
      .post(Server_Path.concat("contactus/"), {
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        Email: this.state.Email,
        PhoneNumber: this.state.PhoneNumber,
        Issue: this.state.Issue,
      })
      .then((res) => {
        if (res.data === true) {
          this.setState({ ContactUsLevel: this.state.ContactUsLevel + 1 });
        
        } else {
          alert("Something Went Wrong");
        
        }
        console.log(res)
      })
      .catch((e) => {
        console.log(e);
        if (!e.Status) {
          alert("Something Went Wrong");
         
        }
      });
  }

  validateInput() {
    var flag = 1;

    Array.from(document.getElementsByTagName("label")).forEach(function (
      element
    ) {
      element.style.color = "#cccce4";
    });

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
        String(this.state.Email).toLowerCase()
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
      flag = 1;
    }

    if (String(this.state.Issue) === "") {
      document.getElementsByTagName("label")[4].style.color = "red";
      flag = 0;
    }

    return flag;
  }

  render() {
    return (
      <div className="contactus_main">
        <div className="loader">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
        <Helmet>
          <title>LvLMoney | Contact Us</title>
        </Helmet>
        <Navbar />
        {(() => {
          if (this.state.ContactUsLevel === 0) {
            return (
              <div className="container test1 px-4 py-5">
                <div className="row contactusdiv">
                  <div className="col-lg-6 col-12 contactus_query_section">
                    <div className="row ">
                      <h4>
                        <strong>Need Help? We're Here to Assist You</strong>
                      </h4>
                      <h5>
                        Fill Out the Form and be as precise as you can, and one
                        of our Support Staff will get back to you as soon as
                        possible
                      </h5>
                      <p>Expected Reply Time - 1 Day</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-12 contactus_link_contact_section">
                    <div className="col-12 contactus-form">
                      <div className="row">
                        <div className="col-6">
                          <label htmlFor="First Name" className="">
                            First Name<span className="required-star">*</span>
                          </label>
                          <input
                            onChange={this.onChange}
                            value={this.state.FirstName}
                            type="text"
                            id="FirstName"
                            name="FirstName"
                            className="form-control"
                          />
                        </div>
                        <div className="col-6">
                          <label htmlFor="Last Name" className="">
                            Last Name<span className="required-star">*</span>
                          </label>
                          <input
                            onChange={this.onChange}
                            value={this.state.LastName}
                            type="text"
                            id="LastName"
                            name="LastName"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="Email ID" className="">
                            Email ID<span className="required-star">*</span>
                          </label>
                          <input
                            onChange={this.onChange}
                            value={this.state.Email}
                            type="email"
                            id="Email"
                            name="Email"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="Phone Number" className="">
                            Phone Number<span className="required-star">*</span>
                          </label>
                          <input
                            onChange={this.onChange}
                            value={this.state.PhoneNumber}
                            type="tel"
                            maxLength="10"
                            id="PhoneNumber"
                            name="PhoneNumber"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <label htmlFor="issue">
                            Your Issue<span className="required-star">*</span>
                          </label>
                          <textarea
                            value={this.state.Issue}
                            onChange={this.onChange}
                            type="text"
                            id="Issue"
                            name="Issue"
                            rows="3"
                            className="form-control md-textarea"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className=" contactus-buttons py-5 d-grid gap-2 d-md-flex justify-content-md-center">
                      <button
                        className="btn btn-primary btn-lg px-4  me-md-2"
                        id="quote"
                        onClick={this.onClick}
                      >
                        Forward Issue to Support Team
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          if (this.state.ContactUsLevel === 1) {
            return (
              <div className="contactusdiv">
                <Confirmation
                  purpose="ContactForm"
                  image="https://hotemoji.com/images/dl/z/telephone-receiver-emoji-by-google.png"
                />
              </div>
            );
          }
        })()}
        <div className=" footercontainer d-flex flex-sm-column-reverse">
          <Footer/>
          </div>
      </div>
    );
  }
}
