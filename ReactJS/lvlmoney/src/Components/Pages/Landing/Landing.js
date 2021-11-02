import React, { Component } from "react";
import Footer from "../../Parts/Footer/Footer";
import { Hero } from "../../Parts/Heros/Hero";
import Navbar from "../../Parts/Navbar/Navbar";
import hero1 from "../../Images/herosong.png";
import hero2 from "../../Images/hero2.png";
import hero3 from "../../Images/hero3.png";
import "./Landing.css";

export default class Landing extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="custom">
          <Hero
          isVisible={ true}
          heading="LvLMoney Finance With AI"
          subheading1="Place your money where it will grow the most."
          subheading2="Use one app to manage all of your investments, including stocks, mutual funds, and ETFs, as well as expenses."
          button_text="Get Started"
          button_link="www.google.com"
          src={hero1}
          />
          
          <Hero
          isVisible={ false}
          heading="Its Time To Earn More"
          button_text="Login"
          subheading1="I'm beggin', beggin' you......"
          subheading2="To invest somewhere other than FDs"
          button_link="www.google.com"
          src={hero2}
          />
           <Hero
          isVisible={ false}
          heading="Let's Invest"
          button_text="Login"
          subheading1="But When and Where to Invest?"
          subheading2="Use our strategies and AI Prediction tool to find it Out."
          button_link="www.google.com"
          src={hero3}
          />
          </div>
        <Footer />
      </>
    );
  }
}
