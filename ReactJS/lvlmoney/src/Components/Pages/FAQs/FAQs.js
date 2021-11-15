import React from "react";
import Footer from "../../Parts/Footer/Footer";
import Navbar from "../../Parts/Navbar/Navbar";
import "./FAQs.css";
import $ from "jquery";
import { Helmet } from "react-helmet";

export default class FAQs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.href,
    };
    this.handleDropdown = this.handleDropdown.bind(this);
  }

  componentDidMount() {
    document
      .getElementsByClassName("faq_account_query")[0]
      .getElementsByClassName("faq_query_list")[0].style.display = "block";
    document
      .getElementsByClassName("faq_account_query")[0]
      .getElementsByClassName("fas")[0].style.transform = "rotate(180deg)";

    this.handleDropdown();
  }

  handleDropdown() {
    $(".faq_account_query .faq_query_heading").on("click", function () {
      if ($(".faq_account_query .faq_query_list").css("display") === "none") {
        $(".faq_query_list").hide("slow");
        $(".fas").css("transform", "rotate(0deg)");
        $(".faq_account_query .faq_query_list").show("slow");
        $(".faq_account_query .fas").animate(
          { deg: 180 },
          {
            duration: 500,
            step: function (now) {
              $(this).css({ transform: "rotate(" + now + "deg)" });
            },
          }
        );
      } else {
        $(".faq_account_query .faq_query_list").hide("slow");
        $(".faq_account_query .fas").animate(
          { deg: 0 },
          {
            duration: 500,
            step: function (now) {
              $(this).css({ transform: "rotate(" + now + "deg)" });
            },
          }
        );
      }
    });
    $(".faq_privacy_query .faq_query_heading").on("click", function () {
      if ($(".faq_privacy_query .faq_query_list").css("display") === "none") {
        $(".faq_query_list").hide("slow");
        $(".fas").css("transform", "rotate(0deg)");
        $(".faq_privacy_query .faq_query_list").show("slow");
        $(".faq_privacy_query .fas").animate(
          { deg: 180 },
          {
            duration: 500,
            step: function (now) {
              $(this).css({ transform: "rotate(" + now + "deg)" });
            },
          }
        );
      } else {
        $(".faq_privacy_query .faq_query_list").hide("slow");
        $(".faq_privacy_query .fas").animate(
          { deg: 0 },
          {
            duration: 500,
            step: function (now) {
              $(this).css({ transform: "rotate(" + now + "deg)" });
            },
          }
        );
      }
    });
    $(".faq_data_query .faq_query_heading").on("click", function () {
      if ($(".faq_data_query .faq_query_list").css("display") === "none") {
        $(".faq_query_list").hide("slow");
        $(".fas").css("transform", "rotate(0deg)");
        $(".faq_data_query .faq_query_list").show("slow");
        $(".faq_data_query .fas").animate(
          { deg: 180 },
          {
            duration: 500,
            step: function (now) {
              $(this).css({ transform: "rotate(" + now + "deg)" });
            },
          }
        );
      } else {
        $(".faq_data_query .faq_query_list").hide("slow");
        $(".faq_data_query .fas").animate(
          { deg: 0 },
          {
            duration: 500,
            step: function (now) {
              $(this).css({ transform: "rotate(" + now + "deg)" });
            },
          }
        );
      }
    });
    $(".faq_organization_query .faq_query_heading").on("click", function () {
      if (
        $(".faq_organization_query .faq_query_list").css("display") === "none"
      ) {
        $(".faq_query_list").hide("slow");
        $(".fas").css("transform", "rotate(0deg)");
        $(".faq_organization_query .faq_query_list").show("slow");
        $(".faq_organization_query .fas").animate(
          { deg: 180 },
          {
            duration: 500,
            step: function (now) {
              $(this).css({ transform: "rotate(" + now + "deg)" });
            },
          }
        );
      } else {
        $(".faq_organization_query .faq_query_list").hide("slow");
        $(".faq_organization_query .fas").animate(
          { deg: 0 },
          {
            duration: 500,
            step: function (now) {
              $(this).css({ transform: "rotate(" + now + "deg)" });
            },
          }
        );
      }
    });
  }

  render() {
    return (
      <>
        <div className="faq">
      <div className="faqs_main">
        <Helmet>
          <title>LvLMoney | FAQs</title>
        </Helmet>
        <Navbar />
        <div className="container px-4 py-5"> 
          <div className="row">
            <div className="col-lg-9 col-12 faq_query_section">
              <section className="faq_account_query">
                <div className="faq_query_heading">
                  <h4>
                    <strong>
                      Account Related&nbsp;
                      <i className="fas fa-chevron-up"></i>
                    </strong>
                  </h4>
                </div>
                <div className="faq_query_list row">
                  <div className="question_single">
                    <h5>
                      <strong>
                        I got locked out of my account, and now I am not able to
                        log in again.
                      </strong>
                    </h5>
                  </div>
                  <div className="answer_single">
                    <h5>
                      Getting locked out of your own happens more often than you
                      would imagine. No worry though, all you need to do is
                      navigate to{" "}
                      <span>
                        <a
                          href={window.location.origin.concat(
                            "/forgotpassword"
                          )}
                        >
                          The Forgot Password
                        </a>{" "}
                        page and fill out your details. You would receive a
                        confirmation email with which you can reset your
                        password. As simple as that.
                      </span>
                    </h5>
                  </div>
                  <div className="question_single">
                    <h5>
                      <strong>
                        It says my account has been blocked due to security
                        reasons. What should I do?
                      </strong>
                    </h5>
                  </div>
                  <div className="answer_single">
                    <h5>
                      Now, this is a tricky case. This usually happens when
                      you've there are more than 3 invalid attempts to log into
                      your account. To prevent a data breach, and others from
                      using the account you paid for, we lock the account
                      automatically. Your account can be unlocked by filling a
                      ticket on the{" "}
                      <span>
                        <a href={window.location.origin.concat("/contactus")}>
                          Support Form
                        </a>{" "}
                        and someone from our team would assist you in resuming
                        services.
                      </span>
                    </h5>
                  </div>
                  <div className="question_single">
                    <h5>
                      <strong>
                        I've lost access to my registered email, and now I have
                        trouble logging in.
                      </strong>
                    </h5>
                  </div>
                  <div className="answer_single">
                    <h5>
                      This can be easily resolved within a few days but for
                      this, you would need to contact the support team by filing
                      a{" "}
                      <span>
                        <a href={window.location.origin.concat("/contactus")}>
                          Support Form
                        </a>{" "}
                        and provide your "new" email you would like to migrate
                        the account to
                      </span>
                    </h5>
                  </div>
                </div>
              </section>
              <section className="faq_privacy_query">
                <div className="faq_query_heading">
                  <h4>
                    <strong>
                      Privacy Related&nbsp;
                      <i className="fas fa-chevron-up"></i>
                    </strong>
                  </h4>
                </div>
                <div className="faq_query_list row">
                  <div className="question_single">
                    <h5>
                      <strong>
                        Why do we ask for your Card Details / Bank Account
                        Details?
                      </strong>
                    </h5>
                  </div>
                  <div className="answer_single">
                    <h5>
                      Our Plans are monthly plans which mean we deduct a certain
                      amount from your account each month to provide you with
                      services. To prevent the hassle and preventing account
                      blocking, we automatically deduct the plan amount from
                      your account. For this, we require either the card details
                      or the bank account details. And yes, we do inform before
                      deduction
                    </h5>
                  </div>
                  <div className="question_single">
                    <h5>
                      <strong>
                        How safe is the data that we have provided?
                      </strong>
                    </h5>
                  </div>
                  <div className="answer_single">
                    <h5>
                      Pretty safe XD. But in all seriousness, we hash every
                      single data item you provide from your Username, all the
                      way to your bank account details with a Hashing algorithm
                      along with a unique salt which shall not be mentioned for
                      security reasons. Long story short, it is safe.
                    </h5>
                  </div>
                </div>
              </section>
              <section className="faq_data_query">
                <div className="faq_query_heading">
                  <h4>
                    <strong>
                      Data Related&nbsp;
                      <i className="fas fa-chevron-up"></i>
                    </strong>
                  </h4>
                </div>
                <div className="faq_query_list row">
                  <div className="question_single">
                    <h5>
                      <strong>
                        How do we predict/forecast weather-related attributes?
                      </strong>
                    </h5>
                  </div>
                  <div className="answer_single">
                    <h5>
                      To accurately predict the weather and its related
                      attributes, we use a State of the Art, a self-made Machine
                      Learning algorithm, that takes a two-year rolling period
                      for that particular attribute and learns it. This way, not
                      only does the model understand the season, it understands
                      the development of the climate around that area.
                    </h5>
                  </div>
                  <div className="question_single">
                    <h5>
                      <strong>
                        Where do we get the news and live data from?
                      </strong>
                    </h5>
                  </div>
                  <div className="answer_single">
                    <h5>
                      Live data tends to be tricky. Either we have a source that
                      specifically sends data to us, or we use open-source data.
                      We use the latter by scraping the web for live
                      weather-related news and values continuously hence the
                      maximum delay between their source sending data and you
                      reading it would be less than a few minutes.
                    </h5>
                  </div>
                </div>
              </section>
              <section className="faq_organization_query">
                <div className="faq_query_heading">
                  <h4>
                    <strong>
                      Organization Related&nbsp;
                      <i className="fas fa-chevron-up"></i>
                    </strong>
                  </h4>
                </div>
                <div className="faq_query_list row">
                  <div className="question_single">
                    <h5>
                      <strong>
                        How do I apply for an Organizational Account and what
                        are its benefits
                      </strong>
                    </h5>
                  </div>
                  <div className="answer_single">
                    <h5>
                      We provide a special plan with different features and
                      periods depending on your organization's needs. Along with
                      that, we provide a bucket strategy where the organization
                      can choose the features they require and get billed for
                      them accordingly. To apply for an organizational account,
                      visit{" "}
                      <span>
                        <a
                          href={window.location.origin.concat(
                            "/organizationalaccount"
                          )}
                        >
                          Organizational Account
                        </a>{" "}
                        and fill out the form. Someone from our sales team will
                        get in touch with you by the end of the day.
                      </span>
                    </h5>
                  </div>
                  <div className="question_single">
                    <h5>
                      <strong>What is the Bucket Strategy?</strong>
                    </h5>
                  </div>
                  <div className="answer_single">
                    <h5>
                      As the name suggests, the organization can choose only the
                      features they are interested in and get billed for it,
                      hence "putting your desired features in a basket". <br />{" "}
                      Let's assume a company QAZWSX is interested in weather and
                      precipitation but not in the rest, instead of paying for
                      all 6, that company can pay only for the 2 which can be
                      modified anytime.
                    </h5>
                  </div>
                </div>
              </section>
            </div>
            <div className="col-lg-3 col-12 faq_link_contact_section">
              <div className="row">
                <h5>
                  <strong>Can't Find Your Answer?</strong>
                </h5>
                <p>
                  Fill Out a Request on the Support Form, and we'll get back to
                  you ASAP
                </p>
                <a
                  className="faq_link_contact_button"
                  href={window.location.origin.concat("/contactus")}
                >
                  Support Form
                </a>
              </div>
            </div>
          </div>
        </div>
     
          </div>
          <div className="footer-div">
            <Footer />
            </div>
        </div>
        
      </>
    );
  }
}