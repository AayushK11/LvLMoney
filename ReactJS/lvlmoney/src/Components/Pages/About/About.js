import React from "react";
import "./About.css";
import Footer from "../../Parts/Footer/Footer";
import Navbar from "../../Parts/Navbar/Navbar";
import { Helmet } from "react-helmet";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.href,
    };
  }

  render() {
    return (
      <div className="about_main">
        <Helmet>
          <title>LvLMoney | About</title>
        </Helmet>
        <Navbar />
        <div className="container-fluid">
          <section id="about-text">
            <div className="container">
              <div className="row">
                <div className="about-heading">
                  <h2>Using Artificial Intelligence to Make Investing Easier</h2>
                </div>
                <div className="about-passage ">
                  <div className="row">
                    <div className="col-md-6">
                      <p>
                      We started creating LvLMoney on the 1st of October 2021 with a clear Goal. To create a single unique platform that could answer all the "When", "Where" and, "How Much" kind of questions when it comes to Investing.
                      </p>
                      <p>
                      When we started Investing, we suffered innumerable losses at the hands of various stocks, mainly because of the lack of knowledge. To get back on our feet, we decided to use our Technical Skills to solve all our Financial Questions.
                      </p>
                      <p>
                      We created this platform as a submission for our Final Year Project but decided, why stop there? We realized the Potential and Possible Future of this Idea, and that's why we presented this to MIT ADT University's Incubation Center.
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                      MIT ADT University's Incubation Center has helped us harness our skills and create something that could be loved and used all over India. Along with Guidance and Support, they have mentored us and helped in creating the Start-Up we are today.
                      </p>
                      <p>
                      After a long and hard struggle, we have achieved a Milestone in being one of the very few companies that provide Financial Support at a Cheap Price. But our journey does not end there. We plan on creating more features using our technical skills to make people wealthier and, hopefully, make the world a better place.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
             
              <div className="developers-heading">
              <hr />
                <h2>The Developers</h2>
                {/* <hr /> */}
              </div>
            </div>
          </section>
        </div>
        <div className="container">
              <div className="row">
             
                <div className="row about py-5 justify-content-around align-items-center ">
                  <div className="col-md-3 col-sm-6 about-person">
                  
                    <div className="about-overlay-text">
                      <h4>Aayush Kumaria</h4>
                      <br></br>
                      <h6>
                        Aayush specializes in Deep Learning and is the Lead
                        Backend and API Developer. So if anything goes wrong,
                        you know who to blame
                      </h6>
                      
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6 about-person">
                   
                    <div className="about-overlay-text">
                      <h4>Ajinkya Rajkar</h4>
                      
                      <br></br>
                      <h6>
                        Ajinkya is good (like Really Good) in the Frontend
                        Aspect of a Project and is the Lead Frontend Developer
                        for LvLMoney.
                      </h6>
                      
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6 about-person">
                 
                    <div className="about-overlay-text">
                      <h4>Aniket Raut</h4>
                   
                      <br></br>
                      <h6>
                        Aniket's strengths include managing Financial Risk,
                        giving Financial Advice, and basically ensuring we get
                        paid well enough
                      </h6>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
        <Footer />
      </div>
    );
  }
}
