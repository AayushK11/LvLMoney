import React, { Component } from "react";
import Navbar from "../../Parts/Navbar/Navbar";
import Footer from "../../Parts/Footer/Footer";
import "./Dashboard.css";
import { Helmet } from "react-helmet";
import { MiniCard } from "../../Parts/DashboardCards/MiniCard";
import { MiniCard_NOgraph } from "../../Parts/DashboardCards/MiniCard_NOgraph";
import minicardimg from "../../Images/minicardimg.png";
import { DashboardCard } from "../../Parts/DashboardCards/DashboardCard";
import Chart from "react-apexcharts";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      options: {
        chart: {
          height: 350,
          type: "area",
          sparkline: {
            enabled: true,
        }
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
          
        xaxis: {
          type: "datetime",
          categories: [
            "2018-09-19T00:00:00.000Z",
            "2018-09-19T01:30:00.000Z",
            "2018-09-19T02:30:00.000Z",
            "2018-09-19T03:30:00.000Z",
            "2018-09-19T04:30:00.000Z",
            "2018-09-19T05:30:00.000Z",
            "2018-09-19T06:30:00.000Z",
          ],
        },
        tooltip: {
          x: {
            format: "dd/MM/yy ",
          },
        },
      },
      series: [
        {
         
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100],
        
        },
      ],
     

      url: window.location.origin,
    };
    this.generateURLs = this.generateURLs.bind(this);
  }

  generateURLs() {
    this.setState({
      register: this.state.url.concat("/register"),
    });
  }

  componentDidMount() {
    this.generateURLs();
  }
  render() {
    return (
      <>
        <Helmet>
          <title>LvLMoney | Dashboard</title>
        </Helmet>

        <Navbar />
        <div className="dashboard_main">
          <div className="container x-4 py-4 ">
            <div className="row ">
              <MiniCard_NOgraph
                minititle="Welcome Back Aayush!"
                imgsrc={minicardimg}
                percentchange="Lets Finance With Ai"
              />
              <MiniCard
                minititle="NIFTY 50"
                price="17895"
                pricechange="+1.2%"
                percentchange="124"
              />

              <MiniCard
                minititle="BANKNIFTY"
                price="37894"
                pricechange="-1.2%"
                percentchange="201"
              />

              <MiniCard
                minititle="SENSEX"
                price="50115"
                pricechange="+1.2%"
                percentchange="213"
              />
            </div>
            {/* <div id="chart">
              <Chart
                options={this.state.options}
                series={this.state.series}
                type="area"
                height={350}
              />
            </div> */}
          </div>
          <div className="container x-4 p-4 ">
            <div className="row py-4">
              <DashboardCard
                CardHeading="Stocks"
                CardSubHeading="All About Stocks"
                CardContent="Forcasted Stock Price, Market Sentiment, Stock News, Sector Wise Ranking, Trading strategy, etc."
                CardButton="Explore Stocks"
              />
            </div>
            <div className="row py-4">
            <DashboardCard
                CardHeading="Mutual Funds"
                CardSubHeading="All About Mutual Funds"
                CardContent="Returns of Mutual Funds, Risk Profile Test, Fund ratings, Fund Performance, etc."
                CardButton="Explore Mutual Funds"
              />
            </div>
            <div className="row py-4">
            <DashboardCard
                CardHeading="Personal Finance"
                CardSubHeading="All About Personal Finance"
                CardContent="Financial Planning, Budgeting, Saving, Debt Management, Financial breakdown, etc."
                CardButton="Explore Personal Finance"
              />
            </div>
          </div>

        </div>

        <Footer />
      </>
    );
  }
}
