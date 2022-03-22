import React, { Component } from "react";
import NavbarLogin from "../../Parts/Navbar_Login/Navbar_Login";
import Footer from "../../Parts/Footer/Footer";
import "./Dashboard.css";

import { Helmet } from "react-helmet";
import { MiniCard } from "../../Parts/DashboardCards/MiniCard";
import { MiniCardNograph } from "../../Parts/DashboardCards/MiniCard_NOgraph";
import { DonutChart } from "../../Parts/DashboardCards/donutChart";
import minicardimg from "../../Images/minicardimg.png";

import Chart from "react-apexcharts";

import { NseIndia } from "stock-nse-india";

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
          },
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
      est_return: 179646,
      invst_amount: 600000,
    };
    this.generateURLs = this.generateURLs.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  generateURLs() {
    this.setState({
      register: this.state.url.concat("/register"),
    });
  }

  componentDidMount() {
    this.generateURLs();
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          description: "HINDALCO",
          proName: "BSE:HINDALCO",
        },
        {
          description: "HDFC",
          proName: "BSE:HDFC",
        },
        {
          description: "TATASTEEL",
          proName: "BSE:TATASTEEL",
        },
        {
          description: "ITC",
          proName: "BSE:ITC",
        },
        {
          description: "TCS",
          proName: "BSE:TCS",
        },
        {
          description: "WIPRO",
          proName: "BSE:WIPRO",
        },
        {
          description: "LT",
          proName: "BSE:LT",
        },
        {
          description: "TITAN",
          proName: "BSE:TITAN",
        },
        {
          description: "INFY",
          proName: "BSE:INFY",
        },
        {
          description: "AXISBANK",
          proName: "BSE:LT",
        },
        {
          description: "NESTLEIND",
          proName: "BSE:NESTLEIND",
        },
        {
          description: "BAJFINANCE",
          proName: "BSE:BAJFINANCE",
        },
        {
          description: "HDFCBANK",
          proName: "BSE:HDFCBANK",
        },
      ],
      showSymbolLogo: true,
      colorTheme: "dark",
      isTransparent: true,
      displayMode: "adaptive",
      locale: "in",
    });

    document.getElementById("tape").appendChild(script);
  }
  nse() {
    const nseIndia = new NseIndia();

    // To get all symbols from NSE
    nseIndia.getAllStockSymbols().then((symbols) => {
      console.log(symbols);
    });

    // To get equity details for specific symbol
    nseIndia.getEquityDetails("IRCTC").then((details) => {
      console.log(details);
    });
  }

  onChange(event) {
    event.preventDefault();

    var parameterName = event.target.id.split("calc-")[1];
    var input_value = event.target.value;

    switch (parameterName) {
      case "amount":
        document.getElementById("calc-amount_value").innerHTML = input_value;
        break;
      case "rate":
        document.getElementById("calc-rate_value").innerHTML = input_value;
        break;
      case "time":
        document.getElementById("calc-time_value").innerHTML = input_value;
        break;
      default:
        break;
    }

    var calc_amount = document.getElementById("calc-amount_value").innerHTML;
    var calc_rate = document.getElementById("calc-rate_value").innerHTML;
    var calc_time = document.getElementById("calc-time_value").innerHTML;

    var total_investment = calc_amount * calc_time * 12;

    // sip calculation
    var periodic_rate = calc_rate / 100 / 12;
    var month = calc_time * 12;
    var total_return = 0;
    total_return =
      (calc_amount *
        (((1 + periodic_rate) ** month - 1) * (1 + periodic_rate))) /
      periodic_rate;
    total_return = Math.round(total_return);

    var estimated_return = total_return - total_investment;

    // lumpsun return calculation
    // var lumpsun_return = calc_amount*(1+calc_rate/100)**calc_time;

    document.getElementById("calc-total_investment").innerHTML =
      total_investment;
    document.getElementById("calc-estimated_return").innerHTML =
      estimated_return;
    document.getElementById("calc-total_return").innerHTML = total_return;

    this.setState({
      est_return: estimated_return,
      invst_amount: total_investment,
    });
  }

  render() {
    return (
      <>
        <Helmet>
          <title>LvLMoney | Dashboard</title>
        </Helmet>

        <NavbarLogin />
        <div className="dashboard_main">
          <div className="px-lg-4 px-xl-5 container-fluid">
            <section className="dashboard_top_section">
              <div className="container x-4 py-4 ">
                <div className="pb-4 ">
                  <div
                    className="tradingview-widget-container bg-dark"
                    id="tape"
                  >
                    <div className="tradingview-widget-container__widget "></div>
                  </div>
                </div>

                <div className="row ">
                  <MiniCardNograph
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
              </div>
            </section>
            <div className="tab-content" id="pills-tabContent">
              {/*  stocks section  */}
              <div
                className="tab-pane fade "
                id="lvl-stocks"
                role="tabpanel"
                aria-labelledby="lvl-stocks-tab"
              >
                <section className="pb-4 mx-2 ">
                  <div className="container">
                    <div className="container x-4 p-4 card bg-dark ">
                      <h5 className="card-header section-heading-ms px-0 mb-2 mb-lg-2 text-white">
                        STOCKS
                      </h5>
                      <div className="row">
                        <div className="mb-4 mb-lg-0 col-lg-4">
                          <div className="h-100">
                            <div className="h-100 card">
                              <div className="card-header">
                                <div className="input-group rounded">
                                  <input
                                    type="search"
                                    className="form-control rounded"
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="search-addon"
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                  >
                                    <i className="fas fa-search"></i>
                                  </button>
                                </div>
                              </div>
                              <div className="d-flex card-body">
                                <div className="w-100 ticker-div px-4 ">
                                  <embed
                                    src="https://www.gateway-tt.in/trade?orderConfig=%5B%7B%22quantity%22%3A10%2C%22ticker%22%3A%22TATAPOWER%22%7D%5D&cardsize=small&withSearch=false&withTT=false"
                                    width="300"
                                    height="390"
                                  ></embed>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-8">
                          <div className="h-100 card">
                            <div className="card-body">
                              <div id="chart">
                                <Chart
                                  options={this.state.options}
                                  series={this.state.series}
                                  type="area"
                                  height={350}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="pt-4">
                          <div className="mb-4 mb-lg-0 card bg-transparent">
                            <div className=" row">
                              <div className="mb-1 col-md-4 col-sm-6">
                                <div className="text-center h-100 card">
                                  <div className="card-body">
                                    <div className=" p-4 justify-content-md-center align-middle">
                                      <a
                                        className="btn btn-success btn-lg  px-5 me-md-2 card-widget "
                                        href="www.google.com"
                                        role="button"
                                      >
                                        Predict
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="mb-1 col-md col-sm-6">
                                <div className="text-center h-100 card">
                                  <h6 className="mb-1 card-header">
                                    Day Forecast
                                  </h6>
                                  <div className="card-body">
                                    <h5 className="mb-1">
                                      <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="arrow-up"
                                        className="svg-inline--fa fa-arrow-up fa-w-14 text-success me-2"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                      >
                                        <path
                                          fill="currentColor"
                                          d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
                                        ></path>
                                      </svg>
                                      231.23
                                    </h5>
                                    <p className="card-text">1.03% increase</p>
                                  </div>
                                </div>
                              </div>
                              <div className="mb-1 col-md col-sm-6">
                                <div className="text-center h-100 card">
                                  <h6 className="mb-1 card-header">
                                    Week Forecast
                                  </h6>
                                  <div className="card-body">
                                    <h5 className="mb-1">
                                      <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="arrow-up"
                                        className="svg-inline--fa fa-arrow-up fa-w-14 text-success me-2"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                      >
                                        <path
                                          fill="currentColor"
                                          d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
                                        ></path>
                                      </svg>
                                      238.57
                                    </h5>
                                    <p className="card-text">3% increase</p>
                                  </div>
                                </div>
                              </div>
                              <div className="mb-1 col-md col-sm-6">
                                <div className="text-center h-100 card">
                                  <h6 className="mb-1 card-header">
                                    Month Forecast
                                  </h6>
                                  <div className="card-body">
                                    <h5 className="mb-1">
                                      <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="arrow-down"
                                        className="svg-inline--fa fa-arrow-down fa-w-14 text-danger me-2"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                      >
                                        <path
                                          fill="currentColor"
                                          d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"
                                        ></path>
                                      </svg>
                                      215.67
                                    </h5>
                                    <p className="card-text">6% decrease</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row pt-4">
                        <div className="mb-5 mb-lg-0 col-xl-6 col-lg-7">
                          <div className="mb-5 mb-lg-0 card h-100">
                            <div className="card-header">
                              <div className="card-heading">
                                Trading strategies
                              </div>
                            </div>
                            <div className="card-body">
                              <p className="text-gray-500 mb-5">
                                In house Trading strategies
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="mb-5 mb-lg-0 col-xl-6 col-lg-7">
                          <div className="mb-5 mb-lg-0 card">
                            <div className="card-header">
                              <div className="card-heading">
                                Market Sentiment Analysis
                              </div>
                            </div>
                            <div className="card-body">
                              <div className="gauge-wrapper">
                                <div className="gauge four rischio3">
                                  <div className="slice-colors">
                                    <div className="st slice-item"></div>
                                    <div className="st slice-item"></div>
                                    <div className="st slice-item"></div>
                                    <div className="st slice-item"></div>
                                  </div>
                                  <div className="needle"></div>
                                  <div className="gauge-center">
                                    <div className="label">RISK</div>
                                    <div className="number">HIGH</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row pt-4">
                        <div className="mb-5 mb-lg-0 ">
                          <div className="card mb-5 mb-lg-0">
                            <div className="card-header">
                              <div className="card-heading">
                                Sector Wise Ranking
                              </div>
                            </div>
                            <div className="card-body">
                              <div
                                className="accordion "
                                id="sectorWiseRanking"
                              >
                                <div className="accordion-item">
                                  <div
                                    className="accordion-header"
                                    id="automobiles"
                                  >
                                    <button
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseOne"
                                      aria-expanded="false"
                                      aria-controls="collapseOne"
                                    >
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-center text-md-left col-xl-3">
                                        <span className="badge bg-primary p-2">
                                          <h6 className="m-0">Automobiles</h6>
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-md-left col-xl">
                                        <i className="sectorShorts">
                                          Indian Automobiles Sector including
                                          but not limited to vechicles such as
                                          4-wheelers, 2-wheelers, and
                                          3-wheelers.
                                        </i>
                                      </div>
                                    </button>
                                  </div>
                                  <div
                                    id="collapseOne"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="automobiles"
                                    data-bs-parent="#sectorWiseRanking"
                                  >
                                    <div className="accordion-body">
                                      <ol className="list-group  list-group-numbered">
                                        <li className="list-group-item list-group-item-dark">
                                          MARUTI
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          Mahindra and Mahindra
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          TATA MOTORS
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          BAJAJ-AUTO
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          EICHERMOT
                                        </li>
                                      </ol>
                                    </div>
                                  </div>
                                </div>
                                <div className="accordion-item">
                                  <div
                                    className="accordion-header"
                                    id="banking"
                                  >
                                    <button
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseTwo"
                                      aria-expanded="false"
                                      aria-controls="collapseTwo"
                                    >
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-center text-md-left col-xl-3">
                                        <span className="badge bg-primary p-2">
                                          <h6 className="m-0">Banking</h6>
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-md-left col-xl">
                                        <i className="sectorShorts">
                                          The banking sector includes the
                                          largest Indian Banking Stocks, both
                                          Public and Private.
                                        </i>
                                      </div>
                                    </button>
                                  </div>
                                  <div
                                    id="collapseTwo"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="banking"
                                    data-bs-parent="#sectorWiseRanking"
                                  >
                                    <div className="accordion-body">
                                      <ol className="list-group  list-group-numbered">
                                        <li className="list-group-item list-group-item-dark">
                                          HDFCBANK
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          ICICIBANK
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          SBIN
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          KOTAKBANK
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          AXISBANK
                                        </li>
                                      </ol>
                                    </div>
                                  </div>
                                </div>
                                <div className="accordion-item">
                                  <div
                                    className="accordion-header"
                                    id="financialServices"
                                  >
                                    <button
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseThree"
                                      aria-expanded="false"
                                      aria-controls="collapseThree"
                                    >
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-center text-md-left col-xl-3">
                                        <span className="badge bg-primary p-2">
                                          <h6 className="m-0">
                                            Financial Services
                                          </h6>
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-md-left col-xl">
                                        <i className="sectorShorts">
                                          Financial Services mainly cover the
                                          Indian Financial Market Which
                                          comprises of Banks, Insurance
                                          Companies, and so on.
                                        </i>
                                      </div>
                                    </button>
                                  </div>
                                  <div
                                    id="collapseThree"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="financialServices"
                                    data-bs-parent="#sectorWiseRanking"
                                  >
                                    <div className="accordion-body">
                                      <ol className="list-group  list-group-numbered">
                                        <li className="list-group-item list-group-item-dark">
                                          HDFCBANK
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          HDFC
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          ICICIBANK
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          KOTAKBANK
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          BAJAJFINANCE
                                        </li>
                                      </ol>
                                    </div>
                                  </div>
                                </div>
                                <div className="accordion-item">
                                  <div className="accordion-header" id="fmcg">
                                    <button
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapsefour"
                                      aria-expanded="false"
                                      aria-controls="collapsefour"
                                    >
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-center text-md-left col-xl-3">
                                        <span className="badge bg-primary p-2">
                                          <h6 className="m-0">FMCG</h6>
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-md-left col-xl">
                                        <i className="sectorShorts">
                                          FMCG, which stands for Fast Moving
                                          Consumer Goods, is a group of
                                          companies that deal in the retailing
                                          of consumer goods.
                                        </i>
                                      </div>
                                    </button>
                                  </div>
                                  <div
                                    id="collapsefour"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="fmcg"
                                    data-bs-parent="#sectorWiseRanking"
                                  >
                                    <div className="accordion-body">
                                      <ol className="list-group  list-group-numbered">
                                        <li className="list-group-item list-group-item-dark">
                                          HINDUSTAN UNILIVER
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          ITC
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          NESTLE INDIA
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          TATA CONSUMER
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          BRITANIA
                                        </li>
                                      </ol>
                                    </div>
                                  </div>
                                </div>
                                <div className="accordion-item">
                                  <div className="accordion-header" id="it">
                                    <button
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapsefive"
                                      aria-expanded="false"
                                      aria-controls="collapsefive"
                                    >
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-center text-md-left col-xl-3">
                                        <span className="badge bg-primary p-2">
                                          <h6 className="m-0">
                                            Information Technology
                                          </h6>
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-md-left col-xl">
                                        <i className="sectorShorts">
                                          Information Technology, often
                                          abbreviated IT, rougly includes
                                          companies that provide Technology
                                          services and software.
                                        </i>
                                      </div>
                                    </button>
                                  </div>
                                  <div
                                    id="collapsefive"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="it"
                                    data-bs-parent="#sectorWiseRanking"
                                  >
                                    <div className="accordion-body">
                                      <ol className="list-group  list-group-numbered">
                                        <li className="list-group-item list-group-item-dark">
                                          INFOSYS
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          TATA CONSULTANCY SERVICES
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          HCL TECH
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          WIPRO
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          TECH MAHINDRA
                                        </li>
                                      </ol>
                                    </div>
                                  </div>
                                </div>
                                <div className="accordion-item">
                                  <div className="accordion-header" id="media">
                                    <button
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseSix"
                                      aria-expanded="false"
                                      aria-controls="collapseSix"
                                    >
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-center text-md-left col-xl-3">
                                        <span className="badge bg-primary p-2">
                                          <h6 className="m-0">Media</h6>
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-md-left col-xl">
                                        <i className="sectorShorts">
                                          Media sector includes companies that
                                          provide media services such as
                                          entertainment, advertising, and so on.
                                        </i>
                                      </div>
                                    </button>
                                  </div>
                                  <div
                                    id="collapseSix"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="media"
                                    data-bs-parent="#sectorWiseRanking"
                                  >
                                    <ol className="list-group  list-group-numbered">
                                      <li className="list-group-item list-group-item-dark">
                                        ZEEL
                                      </li>
                                      <li className="list-group-item list-group-item-dark">
                                        PVR
                                      </li>
                                      <li className="list-group-item list-group-item-dark">
                                        SUNTV
                                      </li>
                                      <li className="list-group-item list-group-item-dark">
                                        INOXLEISUR
                                      </li>
                                      <li className="list-group-item list-group-item-dark">
                                        DISHTV
                                      </li>
                                    </ol>
                                  </div>
                                </div>
                                <div className="accordion-item">
                                  <div className="accordion-header" id="metal">
                                    <button
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseSeven"
                                      aria-expanded="false"
                                      aria-controls="collapseSeven"
                                    >
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-center text-md-left col-xl-3">
                                        <span className="badge bg-primary p-2">
                                          <h6 className="m-0">Metal</h6>
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-md-left col-xl">
                                        <i className="sectorShorts">
                                          The metal setor covers companies that
                                          provide raw materials and mining
                                          services in India.
                                        </i>
                                      </div>
                                    </button>
                                  </div>
                                  <div
                                    id="collapseSeven"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="metal"
                                    data-bs-parent="#sectorWiseRanking"
                                  >
                                    <div className="accordion-body">
                                      <ol className="list-group  list-group-numbered">
                                        <li className="list-group-item list-group-item-dark">
                                          TATASTEEL
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          HINDALCO
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          JSWSTEEL
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          ADANI ENTERPRISE
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          COALINDIA
                                        </li>
                                      </ol>
                                    </div>
                                  </div>
                                </div>
                                <div className="accordion-item">
                                  <h2 className="accordion-header" id="pharma">
                                    <button
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseEight"
                                      aria-expanded="false"
                                      aria-controls="collapseEight"
                                    >
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-center text-md-left col-xl-3">
                                        <span className="badge bg-primary p-2">
                                          <h6 className="m-0">
                                            Pharmaceuticals
                                          </h6>
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-md-left col-xl">
                                        <i className="sectorShorts">
                                          The pharma industry discovers,
                                          develops and manufactures drugs for
                                          medical, health, and personal care
                                          purposes.
                                        </i>
                                      </div>
                                    </button>
                                  </h2>
                                  <div
                                    id="collapseEight"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="pharma"
                                    data-bs-parent="#sectorWiseRanking"
                                  >
                                    <div className="accordion-body">
                                      <ol className="list-group  list-group-numbered">
                                        <li className="list-group-item list-group-item-dark">
                                          SUNPHARMA
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          DIVISLAB
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          DRREDDY
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          CIPLA
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          LAURUSLABS
                                        </li>
                                      </ol>
                                    </div>
                                  </div>
                                </div>
                                <div className="accordion-item">
                                  <div className="accordion-header" id="realty">
                                    <button
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseNine"
                                      aria-expanded="false"
                                      aria-controls="collapseNine"
                                    >
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-center text-md-left col-xl-3">
                                        <span className="badge bg-primary p-2">
                                          <h6 className="m-0">Realty</h6>
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-md-left col-xl">
                                        <i className="sectorShorts">
                                          The Realty sector is engaged in
                                          construction, development and
                                          management of residential and
                                          industrial properties.
                                        </i>
                                      </div>
                                    </button>
                                  </div>
                                  <div
                                    id="collapseNine"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="realty"
                                    data-bs-parent="#sectorWiseRanking"
                                  >
                                    <div className="accordion-body">
                                      <ol className="list-group  list-group-numbered">
                                        <li className="list-group-item list-group-item-dark">
                                          GODREJ PROPERTIES
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          DLF
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          OBEROIRLTY
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          PHEONIXLTD
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          PRESTIGE
                                        </li>
                                      </ol>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              {/*  Mutual Funds section  */}
              <div
                className="tab-pane fade active show"
                id="lvl-funds"
                role="tabpanel"
                aria-labelledby="lvl-funds-tab"
              >
                <section className="pb-4 mx-2 ">
                  <div className="container">
                    <div className="container x-4 p-4 card bg-dark ">
                      <h5 className="card-header section-heading-ms px-0 mb-2 mb-lg-2 text-white">
                        Mutual Funds
                      </h5>
                      <div className="row">
                        <div className="mb-4 mb-lg-0 col-lg-7">
                          <div className="h-100">
                            <div className="h-100 card">
                              <div className="card-header">
                                <span class="fs-5">Returns Calculator</span>
                              </div>
                              <div className=" rangec card-body">
                                <div className="row">
                                  <div className="col-lg">
                                    <h6 class="mb-0 d-flex align-items-center pb-3 pt-2">
                                      Monthly Investment :
                                      <span
                                        class="badge bg-light text-dark"
                                        id="calc-amount_value"
                                      >
                                        {" "}
                                        5000
                                      </span>
                                    </h6>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-lg">
                                    <input
                                      type="range"
                                      class="form-range"
                                      min="500"
                                      max="100000"
                                      step="500"
                                      defaultValue="5000"
                                      id="calc-amount"
                                      onChange={this.onChange}
                                    />
                                  </div>
                                </div>
                                <hr />
                                <div className="row">
                                  <div className="col-lg">
                                    <h6 class="mb-0 d-flex align-items-center pb-3 pt-2">
                                      Expected Rate Of Return :
                                      <span class="badge bg-light text-dark">
                                        <span id="calc-rate_value">5</span> %
                                      </span>
                                    </h6>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-lg">
                                    <input
                                      type="range"
                                      class="form-range"
                                      min="1"
                                      max="30"
                                      step="0.1"
                                      id="calc-rate"
                                      defaultValue="5"
                                      onChange={this.onChange}
                                    />
                                  </div>
                                </div>
                                <hr />
                                <div className="row">
                                  <div className="col-lg">
                                    <h6 class="mb-0 d-flex align-items-center pb-3 pt-2">
                                      Time Period :
                                      <span
                                        class="badge bg-light text-dark"
                                        id="calc-time_value"
                                      >
                                        {" "}
                                        10
                                      </span>
                                    </h6>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-lg">
                                    <input
                                      type="range"
                                      class="form-range"
                                      min="1"
                                      max="40"
                                      step="1"
                                      defaultValue="10"
                                      id="calc-time"
                                      onChange={this.onChange}
                                    />
                                  </div>
                                </div>
                                <hr />
                                <div className="row px-3">
                                  <div class="col-lg card text-center mx-1 p-0 text-white bg-primary">
                                    <div class="card-header">
                                      Invested Amount
                                    </div>

                                    <div class="card-body">
                                      <div className="row">
                                        <h5
                                          class="card-title m-0 "
                                          id="calc-total_investment"
                                        >
                                          {" "}
                                          600000
                                        </h5>
                                      </div>
                                    </div>
                                  </div>

                                  <div class="col-lg card text-center p-0 mx-1 bg-lvlgreen text-dark">
                                    <div class="card-header">
                                      Estimated returns
                                    </div>
                                    <div class="card-body">
                                      <h5
                                        class="card-title m-0"
                                        id="calc-estimated_return"
                                      >
                                        179646
                                      </h5>
                                    </div>
                                  </div>

                                  <div class="col-lg card text-center mx-1 p-0 text-white bg-secondary">
                                    <div class="card-header">Total returns</div>
                                    <div class="card-body">
                                      <h5
                                        class="card-title m-0"
                                        id="calc-total_return"
                                      >
                                        779646
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-4 mb-lg-0 col-lg-5">
                          <div className="h-100">
                            <div className="h-100 card">
                              <div className="card-body pt-5 px-0 pb-0">
                                <div className="pt-4">
                                <DonutChart
                                  est_return={this.state.est_return}
                                  invst_amount={this.state.invst_amount}
                                  />
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row pt-4">
                        <div className="mb-5 mb-lg-0 ">
                          <div className="card mb-5 mb-lg-0">
                            <div className="card-header">
                              <div className="card-heading">Fund Ranking</div>
                            </div>
                            <div className="card-body">
                              <div
                                className="accordion "
                                id="sectorWiseRanking"
                              >
                                <div className="accordion-item">
                                  <div
                                    className="accordion-header"
                                    id="automobiles"
                                  >
                                    <button
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseOne"
                                      aria-expanded="false"
                                      aria-controls="collapseOne"
                                    >
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-center text-md-left col-xl-3">
                                        <span className="badge bg-primary p-2">
                                          <h6 className="m-0">Automobiles</h6>
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-md-left col-xl">
                                        <i className="sectorShorts">
                                          Indian Automobiles Sector including
                                          but not limited to vechicles such as
                                          4-wheelers, 2-wheelers, and
                                          3-wheelers.
                                        </i>
                                      </div>
                                    </button>
                                  </div>
                                  <div
                                    id="collapseOne"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="automobiles"
                                    data-bs-parent="#sectorWiseRanking"
                                  >
                                    <div className="accordion-body">
                                      <ol className="list-group  list-group-numbered">
                                        <li className="list-group-item list-group-item-dark">
                                          MARUTI
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          Mahindra and Mahindra
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          TATA MOTORS
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          BAJAJ-AUTO
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          EICHERMOT
                                        </li>
                                      </ol>
                                    </div>
                                  </div>
                                </div>
                                <div className="accordion-item">
                                  <div
                                    className="accordion-header"
                                    id="banking"
                                  >
                                    <button
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseTwo"
                                      aria-expanded="false"
                                      aria-controls="collapseTwo"
                                    >
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-center text-md-left col-xl-3">
                                        <span className="badge bg-primary p-2">
                                          <h6 className="m-0">Banking</h6>
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-md-left col-xl">
                                        <i className="sectorShorts">
                                          The banking sector includes the
                                          largest Indian Banking Stocks, both
                                          Public and Private.
                                        </i>
                                      </div>
                                    </button>
                                  </div>
                                  <div
                                    id="collapseTwo"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="banking"
                                    data-bs-parent="#sectorWiseRanking"
                                  >
                                    <div className="accordion-body">
                                      <ol className="list-group  list-group-numbered">
                                        <li className="list-group-item list-group-item-dark">
                                          HDFCBANK
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          ICICIBANK
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          SBIN
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          KOTAKBANK
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          AXISBANK
                                        </li>
                                      </ol>
                                    </div>
                                  </div>
                                </div>
                                <div className="accordion-item">
                                  <div
                                    className="accordion-header"
                                    id="financialServices"
                                  >
                                    <button
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseThree"
                                      aria-expanded="false"
                                      aria-controls="collapseThree"
                                    >
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-center text-md-left col-xl-3">
                                        <span className="badge bg-primary p-2">
                                          <h6 className="m-0">
                                            Financial Services
                                          </h6>
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-md-left col-xl">
                                        <i className="sectorShorts">
                                          Financial Services mainly cover the
                                          Indian Financial Market Which
                                          comprises of Banks, Insurance
                                          Companies, and so on.
                                        </i>
                                      </div>
                                    </button>
                                  </div>
                                  <div
                                    id="collapseThree"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="financialServices"
                                    data-bs-parent="#sectorWiseRanking"
                                  >
                                    <div className="accordion-body">
                                      <ol className="list-group  list-group-numbered">
                                        <li className="list-group-item list-group-item-dark">
                                          HDFCBANK
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          HDFC
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          ICICIBANK
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          KOTAKBANK
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          BAJAJFINANCE
                                        </li>
                                      </ol>
                                    </div>
                                  </div>
                                </div>
                                <div className="accordion-item">
                                  <div className="accordion-header" id="fmcg">
                                    <button
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapsefour"
                                      aria-expanded="false"
                                      aria-controls="collapsefour"
                                    >
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-center text-md-left col-xl-3">
                                        <span className="badge bg-primary p-2">
                                          <h6 className="m-0">FMCG</h6>
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-md-left col-xl">
                                        <i className="sectorShorts">
                                          FMCG, which stands for Fast Moving
                                          Consumer Goods, is a group of
                                          companies that deal in the retailing
                                          of consumer goods.
                                        </i>
                                      </div>
                                    </button>
                                  </div>
                                  <div
                                    id="collapsefour"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="fmcg"
                                    data-bs-parent="#sectorWiseRanking"
                                  >
                                    <div className="accordion-body">
                                      <ol className="list-group  list-group-numbered">
                                        <li className="list-group-item list-group-item-dark">
                                          HINDUSTAN UNILIVER
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          ITC
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          NESTLE INDIA
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          TATA CONSUMER
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          BRITANIA
                                        </li>
                                      </ol>
                                    </div>
                                  </div>
                                </div>
                                <div className="accordion-item">
                                  <div className="accordion-header" id="it">
                                    <button
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapsefive"
                                      aria-expanded="false"
                                      aria-controls="collapsefive"
                                    >
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-center text-md-left col-xl-3">
                                        <span className="badge bg-primary p-2">
                                          <h6 className="m-0">
                                            Information Technology
                                          </h6>
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-md-left col-xl">
                                        <i className="sectorShorts">
                                          Information Technology, often
                                          abbreviated IT, rougly includes
                                          companies that provide Technology
                                          services and software.
                                        </i>
                                      </div>
                                    </button>
                                  </div>
                                  <div
                                    id="collapsefive"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="it"
                                    data-bs-parent="#sectorWiseRanking"
                                  >
                                    <div className="accordion-body">
                                      <ol className="list-group  list-group-numbered">
                                        <li className="list-group-item list-group-item-dark">
                                          INFOSYS
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          TATA CONSULTANCY SERVICES
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          HCL TECH
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          WIPRO
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          TECH MAHINDRA
                                        </li>
                                      </ol>
                                    </div>
                                  </div>
                                </div>
                                <div className="accordion-item">
                                  <div className="accordion-header" id="media">
                                    <button
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseSix"
                                      aria-expanded="false"
                                      aria-controls="collapseSix"
                                    >
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-center text-md-left col-xl-3">
                                        <span className="badge bg-primary p-2">
                                          <h6 className="m-0">Media</h6>
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-md-left col-xl">
                                        <i className="sectorShorts">
                                          Media sector includes companies that
                                          provide media services such as
                                          entertainment, advertising, and so on.
                                        </i>
                                      </div>
                                    </button>
                                  </div>
                                  <div
                                    id="collapseSix"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="media"
                                    data-bs-parent="#sectorWiseRanking"
                                  >
                                    <ol className="list-group  list-group-numbered">
                                      <li className="list-group-item list-group-item-dark">
                                        ZEEL
                                      </li>
                                      <li className="list-group-item list-group-item-dark">
                                        PVR
                                      </li>
                                      <li className="list-group-item list-group-item-dark">
                                        SUNTV
                                      </li>
                                      <li className="list-group-item list-group-item-dark">
                                        INOXLEISUR
                                      </li>
                                      <li className="list-group-item list-group-item-dark">
                                        DISHTV
                                      </li>
                                    </ol>
                                  </div>
                                </div>
                                <div className="accordion-item">
                                  <div className="accordion-header" id="metal">
                                    <button
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseSeven"
                                      aria-expanded="false"
                                      aria-controls="collapseSeven"
                                    >
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-center text-md-left col-xl-3">
                                        <span className="badge bg-primary p-2">
                                          <h6 className="m-0">Metal</h6>
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-md-left col-xl">
                                        <i className="sectorShorts">
                                          The metal setor covers companies that
                                          provide raw materials and mining
                                          services in India.
                                        </i>
                                      </div>
                                    </button>
                                  </div>
                                  <div
                                    id="collapseSeven"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="metal"
                                    data-bs-parent="#sectorWiseRanking"
                                  >
                                    <div className="accordion-body">
                                      <ol className="list-group  list-group-numbered">
                                        <li className="list-group-item list-group-item-dark">
                                          TATASTEEL
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          HINDALCO
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          JSWSTEEL
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          ADANI ENTERPRISE
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          COALINDIA
                                        </li>
                                      </ol>
                                    </div>
                                  </div>
                                </div>
                                <div className="accordion-item">
                                  <h2 className="accordion-header" id="pharma">
                                    <button
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseEight"
                                      aria-expanded="false"
                                      aria-controls="collapseEight"
                                    >
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-center text-md-left col-xl-3">
                                        <span className="badge bg-primary p-2">
                                          <h6 className="m-0">
                                            Pharmaceuticals
                                          </h6>
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-md-left col-xl">
                                        <i className="sectorShorts">
                                          The pharma industry discovers,
                                          develops and manufactures drugs for
                                          medical, health, and personal care
                                          purposes.
                                        </i>
                                      </div>
                                    </button>
                                  </h2>
                                  <div
                                    id="collapseEight"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="pharma"
                                    data-bs-parent="#sectorWiseRanking"
                                  >
                                    <div className="accordion-body">
                                      <ol className="list-group  list-group-numbered">
                                        <li className="list-group-item list-group-item-dark">
                                          SUNPHARMA
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          DIVISLAB
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          DRREDDY
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          CIPLA
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          LAURUSLABS
                                        </li>
                                      </ol>
                                    </div>
                                  </div>
                                </div>
                                <div className="accordion-item">
                                  <div className="accordion-header" id="realty">
                                    <button
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseNine"
                                      aria-expanded="false"
                                      aria-controls="collapseNine"
                                    >
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-center text-md-left col-xl-3">
                                        <span className="badge bg-primary p-2">
                                          <h6 className="m-0">Realty</h6>
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-md-left col-xl">
                                        <i className="sectorShorts">
                                          The Realty sector is engaged in
                                          construction, development and
                                          management of residential and
                                          industrial properties.
                                        </i>
                                      </div>
                                    </button>
                                  </div>
                                  <div
                                    id="collapseNine"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="realty"
                                    data-bs-parent="#sectorWiseRanking"
                                  >
                                    <div className="accordion-body">
                                      <ol className="list-group  list-group-numbered">
                                        <li className="list-group-item list-group-item-dark">
                                          GODREJ PROPERTIES
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          DLF
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          OBEROIRLTY
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          PHEONIXLTD
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          PRESTIGE
                                        </li>
                                      </ol>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <h2 className="text-white">
                        Sample test questions There are two types of IELTS test
                        to choose from, IELTS Academic or IELTS General
                        Training. All test takers take the same Listening and
                        Speaking tests but different Reading and Writing tests.
                        Make sure that you prepare for the correct version of
                        the test. Using IELTS official practice materials will
                        enable you to: familiarise yourself with the test format
                        experience the types of tasks you will be asked to
                        undertake test yourself under timed conditions review
                        your answers and compare them with model answers. If you
                        are taking IELTS on Computer, click here for on Computer
                        sample test questions.
                      </h2>
                    </div>
                  </div>
                </section>
              </div>
              {/*  Personal Finance section  */}
              <div
                className="tab-pane fade"
                id="lvl-personal"
                role="tabpanel"
                aria-labelledby="lvl-personal-tab"
              >
                <section className="pb-4 mx-2 ">
                  <div className="container">
                    <div className="container x-4 p-4 card bg-dark ">
                      <h5 className="card-header section-heading-ms px-0 mb-2 mb-lg-2 text-white">
                        Personal Finance
                      </h5>
                      <h2 className="text-white">
                        Sample test questions There are two types of IELTS test
                        to choose from, IELTS Academic or IELTS General
                        Training. All test takers take the same Listening and
                        Speaking tests but different Reading and Writing tests.
                        Make sure that you prepare for the correct version of
                        the test. Using IELTS official practice materials will
                        enable you to: familiarise yourself with the test format
                        experience the types of tasks you will be asked to
                        undertake test yourself under timed conditions review
                        your answers and compare them with model answers. If you
                        are taking IELTS on Computer, click here for on Computer
                        sample test questions.
                      </h2>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  }
}
