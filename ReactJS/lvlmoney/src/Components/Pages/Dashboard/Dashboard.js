import React, { Component } from "react";
import NavbarLogin from "../../Parts/Navbar_Login/Navbar_Login";
import Footer from "../../Parts/Footer/Footer";
import "./Dashboard.css";

import { Helmet } from "react-helmet";
import { MiniCard } from "../../Parts/DashboardCards/MiniCard";
import { MiniCardNograph } from "../../Parts/DashboardCards/MiniCard_NOgraph";
import { DonutChart } from "../../Parts/DashboardCards/donutChart";
import { ForecastChart } from "../../Parts/DashboardCards/forecastChart";
import { MarketMood } from "../../Parts/DashboardCards/marketMood";
import minicardimg from "../../Images/minicardimg.png";
import axios from "axios";
import Server_Path from "../../Parts/Server/Server.js";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.origin,
      est_return: 179646,
      invst_amount: 600000,
      search: "",
      ticker_link:
        "https://www.gateway-tt.in/trade?orderConfig=%5B%7B%22quantity%22%3A10%2C%22ticker%22%3A%22__temp__%22%7D%5D&cardsize=small&withSearch=false&withTT=false",
      prev_search: "__temp__",
      stock_list: [],
      prev_close: 0,
      marketmood_data: 0,
      nifty50: 0,
      nifty50_prevClose: 0,
      niftybank: 0,
      niftybank_prevClose: 0,
      sensex: 0,
      sensex_prevClose: 0,
      fc_prevC: 0,
      fc_day: 0,
      fc_midweek: 0,
      fc_week: 0,
      fc_month: 0,
      fc_m1: 0,
      fc_m2: 0,
      fc_m3: 0,
    };
    this.generateURLs = this.generateURLs.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.get_stocks = this.get_stocks.bind(this);
    this.getMood = this.getMood.bind(this);
    this.get_indices = this.get_indices.bind(this);
  }
  onClick(event) {
    event.preventDefault();
    if (event.target.id === "ticker_search") {
      this.setState({
        ticker_link: this.state.ticker_link.replace(
          this.state.prev_search,
          this.state.search
        ),
        prev_search: this.state.search,
      });
    } else if (event.target.id === "prediction_button") {
      axios
        .post(Server_Path.concat("forecast/"), {
          TickerName: this.state.search,
        })
        .then((res) => {
          this.setState({ prev_close: res.data["PrevClose"] });
          this.setState({ day_forecast: res.data["Day"] });
          this.setState({ week_forecast: res.data["Week"] });
          this.setState({ month_forecast: res.data["Month"] });

          var percent_sign = "%";

          // change calc

          var day_change = this.state.day_forecast - this.state.prev_close;
          var week_change = this.state.week_forecast - this.state.prev_close;
          var month_change = this.state.month_forecast - this.state.prev_close;

          // percent change calc
          var day_percent = (day_change / this.state.prev_close) * 100;
          document.getElementById("day_p").innerHTML = day_percent
            .toFixed(2)
            .concat(percent_sign);

          var week_percent = (week_change / this.state.prev_close) * 100;
          document.getElementById("week_p").innerHTML = week_percent
            .toFixed(2)
            .concat(percent_sign);

          var month_percent = (month_change / this.state.prev_close) * 100;
          document.getElementById("month_p").innerHTML = month_percent
            .toFixed(2)
            .concat(percent_sign);

          //  day
          document.getElementById("day_c").innerHTML = day_change.toFixed(2);

          if (day_change > 0) {
            document.getElementById("day_c").style.color = "#198754";
            document.getElementById("day_p").style.color = "#198754";
            document.getElementById("day_forecast_icon").style.color =
              "#198754";

            document
              .getElementById("day_icon_path")
              .setAttribute(
                "d",
                "M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
              );
          } else if (day_change < 0) {
            document.getElementById("day_c").style.color = "#dc3545";
            document.getElementById("day_p").style.color = "#dc3545";
            document.getElementById("day_forecast_icon").style.color =
              "#dc3545";

            document
              .getElementById("day_icon_path")
              .setAttribute(
                "d",
                "M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"
              );
          }
          // Week
          document.getElementById("week_c").innerHTML = week_change.toFixed(2);
          if (week_change > 0) {
            document.getElementById("week_c").style.color = "#198754";
            document.getElementById("week_p").style.color = "#198754";
            document.getElementById("week_forecast_icon").style.color =
              "#198754";
            document
              .getElementById("week_icon_path")
              .setAttribute(
                "d",
                "M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
              );
          } else if (week_change < 0) {
            document.getElementById("week_c").style.color = "#dc3545";
            document.getElementById("week_p").style.color = "#dc3545";
            document.getElementById("week_forecast_icon").style.color =
              "#dc3545";
            document
              .getElementById("week_icon_path")
              .setAttribute(
                "d",
                "M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"
              );
          }

          // Month
          document.getElementById("month_c").innerHTML =
            month_change.toFixed(2);
          if (month_change > 0) {
            document.getElementById("month_c").style.color = "#198754";
            document.getElementById("month_p").style.color = "#198754";
            document.getElementById("month_forecast_icon").style.color =
              "#198754";
            document
              .getElementById("month_icon_path")
              .setAttribute(
                "d",
                "M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
              );
          } else if (month_change < 0) {
            document.getElementById("month_c").style.color = "#dc3545";
            document.getElementById("month_p").style.color = "#dc3545";
            document.getElementById("month_forecast_icon").style.color =
              "#dc3545";
            document
              .getElementById("month_icon_path")
              .setAttribute(
                "d",
                "M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"
              );
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

  generateURLs() {
    this.setState({
      register: this.state.url.concat("/register"),
      blog_1: this.state.url.concat("/blog_1"),
      blog_2: this.state.url.concat("/blog_2"),
      blog_3: this.state.url.concat("/blog_3"),
    });
  }

  componentDidMount() {
    let x = document.cookie;
    if (x === "") {
      this.props.history.push("/login");
    } else {
      this.generateURLs();
      this.get_stocks();
      this.getMood();
      this.get_indices();

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
  }

  getMood() {
    axios
      .get(Server_Path.concat("marketmood/"))
      .then((res) => {
        if (res.data["Index"] >= 50.0 && res.data["Index"] <= 69.99) {
          this.setState({ marketmood_data: 70 });
        } else {
          this.setState({ marketmood_data: res.data["Index"] });
        }
      })
      .catch((e) => {
        console.log(e);
        if (!e.Status) {
          alert("Something Went Wrong");
        }
      });
  }

  onChange(event) {
    event.preventDefault();
    if (event.target.id === "search_input") {
      this.setState({
        search: event.target.value.toUpperCase(),
      });
    } else {
      var parameterName = event.target.id.split("calc-")[1];
      var input_value = event.target.value;

      switch (parameterName) {
        case "amount":
          var rupee = "₹ ";
          document.getElementById("calc-amount_value").innerHTML =
            rupee.concat(input_value);
          break;
        case "rate":
          var percent = " %";
          document.getElementById("calc-rate_value").innerHTML =
            input_value.concat(percent);
          break;
        case "time":
          var year = " Yr";
          document.getElementById("calc-time_value").innerHTML =
            input_value.concat(year);
          break;
        default:
          break;
      }

      var calc_amount = document
        .getElementById("calc-amount_value")
        .innerHTML.split("₹ ")[1];
      var calc_rate = document
        .getElementById("calc-rate_value")
        .innerHTML.split(" %")[0];
      var calc_time = document
        .getElementById("calc-time_value")
        .innerHTML.split(" Yr")[0];

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
  }

  get_stocks() {
    axios
      .get(Server_Path.concat("getstocks/"))
      .then((res) => {
        this.setState({ stock_list: res.data["data"] });
      })
      .catch((e) => {
        console.log(e);
        if (!e.Status) {
          alert("Something Went Wrong");
        }
      });
  }
  get_indices() {
    axios
      .get(Server_Path.concat("getindices/"))
      .then((res) => {
        var percent = " %";

        this.setState({ nifty50: res.data["NIFTY50"] });
        this.setState({ nifty50_prevClose: res.data["NIFTY50_prev"] });
        this.setState({ niftybank: res.data["NIFTYBANK"] });
        this.setState({ niftybank_prevClose: res.data["NIFTYBANK_prev"] });
        this.setState({ sensex: res.data["SENSEX"] });
        this.setState({ sensex_prevClose: res.data["SENSEX_prev"] });

        var nifty50_change = this.state.nifty50 - this.state.nifty50_prevClose;
        nifty50_change = nifty50_change.toFixed(2);
        var niftybank_change =
          this.state.niftybank - this.state.niftybank_prevClose;
        niftybank_change = niftybank_change.toFixed(2);
        var sensex_change = this.state.sensex - this.state.sensex_prevClose;
        sensex_change = sensex_change.toFixed(2);

        var percent_nifty50 =
          (nifty50_change / this.state.nifty50_prevClose) * 100;
        percent_nifty50 = percent_nifty50.toFixed(2);
        percent_nifty50 = percent_nifty50.concat(percent);
        var percent_niftybank =
          (niftybank_change / this.state.niftybank_prevClose) * 100;
        percent_niftybank = percent_niftybank.toFixed(2);
        percent_niftybank = percent_niftybank.concat(percent);
        var percent_sensex =
          (sensex_change / this.state.sensex_prevClose) * 100;
        percent_sensex = percent_sensex.toFixed(2);
        percent_sensex = percent_sensex.concat(percent);

        this.setState({ nifty50_change: nifty50_change });
        this.setState({ niftybank_change: niftybank_change });
        this.setState({ sensex_change: sensex_change });
        this.setState({ percent_nifty50: percent_nifty50 });
        this.setState({ percent_niftybank: percent_niftybank });
        this.setState({ percent_sensex: percent_sensex });
        // console.log(res.data);
        // console.log( percent_nifty50 );
        // console.log( percent_niftybank );
        // console.log( percent_sensex );
        // console.log( typeof this.state.nifty50 );
        // console.log( this.state.nifty50_prevClose );
        // console.log( this.state.niftybank );
        // console.log( this.state.niftybank_prevClose );
        // console.log( this.state.sensex );
        // console.log( this.state.sensex_prevClose );
      })
      .catch((e) => {
        console.log(e);
        if (!e.Status) {
          alert("Something Went Wrong");
        }
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
              <div className="container x-4 py-3 ">
                <div className="pb-2 ">
                  <div
                    className="tradingview-widget-container bg-dark"
                    id="tape"
                  >
                    <div className="tradingview-widget-container__widget "></div>
                  </div>
                </div>

                <div className="row ">
                  <MiniCardNograph
                    minititle="Welcome Back!!"
                    imgsrc={minicardimg}
                    percentchange="Lets Finance With Ai"
                  />
                  <MiniCard
                    minititle="NIFTY 50"
                    price={this.state.nifty50}
                    pricechange={this.state.percent_nifty50}
                    percentchange={this.state.nifty50_change}
                  />

                  <MiniCard
                    minititle="BANKNIFTY"
                    price={this.state.niftybank}
                    pricechange={this.state.percent_niftybank}
                    percentchange={this.state.niftybank_change}
                  />

                  <MiniCard
                    minititle="SENSEX"
                    price={this.state.sensex}
                    pricechange={this.state.percent_sensex}
                    percentchange={this.state.sensex_change}
                  />
                </div>
              </div>
            </section>
            <div className="tab-content" id="pills-tabContent">
              {/*  stocks section  */}
              <div
                className="tab-pane fade active show  "
                id="lvl-stocks"
                role="tabpanel"
                aria-labelledby="lvl-stocks-tab"
              >
                <section className="pb-4 mx-2 ">
                  <div className="container">
                    <div className="bg-lvldark ">
                      <h5 className="py-2 section-heading-ms px-0 mb-2 mb-lg-2 text-white">
                        STOCKS
                      </h5>
                      <div className="row">
                        <div className="mb-4 mb-lg-0 col-lg-4 ">
                          <div className="h-100">
                            <div className="h-100 card bg-dark">
                              <div className="card-header">
                                <div className="input-group">
                                  <input
                                    type="search"
                                    className="form-control border border-2 "
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="search-addon"
                                    onChange={this.onChange}
                                    id="search_input"
                                    list="stocks"
                                  />
                                  <datalist id="stocks">
                                    {this.state.stock_list.map(
                                      (item, index) => (
                                        <option key={index}>{item}</option>
                                      )
                                    )}
                                  </datalist>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={this.onClick}
                                    id="ticker_search"
                                  >
                                    <i className="fas fa-search"></i>
                                  </button>
                                </div>
                              </div>
                              <div className="d-flex card-body">
                                <div className="w-100 ticker-div px-4 ">
                                  {(() => {
                                    if (
                                      this.state.ticker_link.includes(
                                        "__temp__"
                                      )
                                    ) {
                                      return (
                                        <div className="nothing_searched">
                                          <p className="text-light">
                                            Type in above search box to search
                                            your favourite stocks!!!!
                                          </p>
                                        </div>
                                      );
                                    } else {
                                      return (
                                        <div className="bg-light p-1 card">
                                          <embed
                                            src={this.state.ticker_link}
                                            width="100%"
                                            height="400"
                                          ></embed>
                                        </div>
                                      );
                                    }
                                  })()}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-8">
                          <div className=" d-flex card bg-dark">
                            <div className="card-body">
                              <div id="chart">
                                <ForecastChart
                                  fc_prevC={
                                    Math.round(this.state.prev_close + "e2") +
                                    "e-2"
                                  }
                                  fc_day={
                                    Math.round(this.state.day_forecast + "e2") +
                                    "e-2"
                                  }
                                  fc_midweek={
                                    Math.round(
                                      (this.state.prev_close +
                                        this.state.week_forecast) /
                                        2 +
                                        "e2"
                                    ) + "e-2"
                                  }
                                  fc_week={
                                    Math.round(
                                      this.state.week_forecast + "e2"
                                    ) + "e-2"
                                  }
                                  fc_month={
                                    Math.round(
                                      this.state.month_forecast + "e2"
                                    ) + "e-2"
                                  }
                                  fc_m2={
                                    Math.round(
                                      (this.state.prev_close +
                                        this.state.month_forecast) /
                                        2 +
                                        "e2"
                                    ) + "e-2"
                                  }
                                  fc_m1={
                                    Math.round(
                                      ((this.state.prev_close +
                                        this.state.month_forecast) /
                                        2 +
                                        this.state.prev_close) /
                                        2 +
                                        "e2"
                                    ) + "e-2"
                                  }
                                  fc_m3={
                                    Math.round(
                                      ((this.state.prev_close +
                                        this.state.month_forecast) /
                                        2 +
                                        this.state.month_forecast) /
                                        2 +
                                        "e2"
                                    ) + "e-2"
                                  }
                                />
                                <h5 className="text-white">
                                  {" "}
                                  Previous Close : {this.state.prev_close}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="pt-4">
                          <div className="mb-4 mb-lg-0 card bg-transparent">
                            <div className=" row">
                              <div className="mb-1 col-md-4 col-sm-6">
                                <div className="text-center h-100 card bg-dark">
                                  <div className="card-body">
                                    <div className=" p-4 justify-content-md-center align-middle">
                                      <button
                                        className="btn btn-success btn-lg  px-5 w-100 card-widget "
                                        onClick={this.onClick}
                                        id="prediction_button"
                                      >
                                        Predict
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="mb-1 col-md col-sm-6">
                                <div className="text-center h-100 card bg-dark text-light">
                                  <h6 className="mb-1 card-header">
                                    Day Forecast
                                  </h6>
                                  <div className="card-body">
                                    <h5 className="mb-1">
                                      {this.state.day_forecast}
                                    </h5>
                                    <div>
                                      <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        className="svg-inline--fa fa-w-14  me-2 d-inline-block"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                        id="day_forecast_icon"
                                      >
                                        <path
                                          id="day_icon_path"
                                          fill="currentColor"
                                          d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
                                        ></path>
                                      </svg>

                                      <h5 className="d-inline-block" id="day_c">
                                        0
                                      </h5>
                                    </div>
                                    <p className="card-text" id="day_p">
                                      0%
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="mb-1 col-md col-sm-6">
                                <div className="text-center h-100 card bg-dark text-light">
                                  <h6 className="mb-1 card-header">
                                    Week Forecast
                                  </h6>
                                  <div className="card-body">
                                    <h5 className="mb-1">
                                      {this.state.week_forecast}
                                    </h5>
                                    <div className="">
                                      <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        className="svg-inline--fa  fa-w-14  me-2 d-inline-block"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                        id="week_forecast_icon"
                                      >
                                        <path
                                          id="week_icon_path"
                                          fill="currentColor"
                                          d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
                                        ></path>
                                      </svg>
                                      <h5
                                        className="d-inline-block"
                                        id="week_c"
                                      >
                                        0
                                      </h5>
                                    </div>
                                    <p className="card-text" id="week_p">
                                      0%
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="mb-1 col-md col-sm-6">
                                <div className="text-center h-100 card bg-dark text-light">
                                  <h6 className="mb-1 card-header">
                                    Month Forecast
                                  </h6>
                                  <div className="card-body">
                                    <h5 className="mb-1">
                                      {this.state.month_forecast}
                                    </h5>
                                    <div>
                                      <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        id="month_forecast_icon"
                                        className="svg-inline--fa  fa-w-14  me-2 d-inline-block"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                      >
                                        <path
                                          id="month_icon_path"
                                          fill="currentColor"
                                          d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"
                                        ></path>
                                      </svg>
                                      <h5
                                        className="d-inline-block"
                                        id="month_c"
                                      >
                                        0
                                      </h5>
                                    </div>
                                    <p className="card-text" id="month_p">
                                      0%
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row pt-4">
                        <div className="mb-5 mb-lg-0 col-xl-6 col-lg-7">
                          <div className="mb-5 mb-lg-0 card h-100 bg-dark text-light">
                            <div className="card-header">
                              <div className="card-heading">
                                Trading strategies
                              </div>
                            </div>
                            <div className="card-body">
                              <div className="card bg-dark text-light">
                                <div className="card-header">Featured</div>
                                <div className="card-body ">
                                  <h5 className="card-title">
                                    50 / 100 DMA Crossover
                                  </h5>
                                  <p className="card-text">
                                    The 50 DMA / 100 DMA Crossover is a trading
                                    strategy that takes into account the closing
                                    price for the last 50 da.....
                                  </p>
                                  <a
                                    href="https://drive.google.com/file/d/1cUO8ycKYVoxyLsTG59nqUqqAH4SNKNnd/view?usp=sharing"
                                    target="_blank"
                                    className="btn btn-primary"
                                    rel="noreferrer"
                                  >
                                    Read More
                                  </a>
                                </div>
                              </div>
                              <div className="card bg-dark text-light mt-4">
                                <div className="card-header">Featured</div>
                                <div className="card-body ">
                                  <h5 className="card-title">
                                    52W High - 10W Low
                                  </h5>
                                  <p className="card-text">
                                    The 52W High - 10 Low is a trading strategy
                                    that takes into account the highest price in
                                    the last 52.....
                                  </p>
                                  <a
                                    href="https://drive.google.com/file/d/121MPvQtNAd6taJ-Xy_bhtUGvrkC0XNW-/view?usp=sharing"
                                    target="_blank"
                                    className="btn btn-primary"
                                    rel="noreferrer"
                                  >
                                    Read More
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-5 mb-lg-0 col-xl-6 col-lg-7">
                          <div className="mb-5 mb-lg-0 card bg-dark text-light">
                            <div className="card-header">
                              <div className="card-heading">
                                Market Sentiment Analysis
                              </div>
                            </div>
                            <div className="card-body">
                              {/* <div className="card-header"></div> */}
                              <MarketMood
                                marketmood_data={this.state.marketmood_data}
                              />

                              <h6>How to Interpret the MMI?</h6>
                              <p>
                                Extreme Fear - A Good Time to Open Fresh
                                Positions and Hold Current Positions.
                              </p>
                              <p>
                                Fear - Selling Pressure but not Oversold. A
                                Decent time to open fresh positions.
                              </p>
                              <p>
                                Greed - Markets are High, but no clear sign of a
                                Bullish Run.
                              </p>
                              <p>
                                Extreme Greed - It is advisable not to open new
                                Positions.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* sector wise ranking */}
                      <div className="row pt-4">
                        <div className="mb-5 mb-lg-0 ">
                          <div className="card mb-5 mb-lg-0 bg-dark text-light ">
                            <div className="card-header">
                              <div className="card-heading">
                                Sector Wise Ranking
                              </div>
                            </div>
                            <div className="card-body text-light">
                              <div
                                className="accordion "
                                id="sectorWiseRanking"
                              >
                                <div className="accordion-item ">
                                  <div
                                    className="accordion-header "
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
                                    <div className="accordion-body">
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
                className="tab-pane fade "
                id="lvl-funds"
                role="tabpanel"
                aria-labelledby="lvl-funds-tab"
              >
                <section className="pb-4 mx-2 ">
                  <div className="container">
                    <div className=" bg-lvldark ">
                      <h5 className="card-header py-3 section-heading-ms px-0 mb-2 mb-lg-2 text-white">
                        Mutual Funds
                      </h5>
                      <div className="row">
                        <div className="mb-4 mb-lg-0 col-lg-7">
                          <div className="h-100">
                            <div className="h-100 card bg-dark text-light">
                              <div className="card-header">
                                <span className="fs-5">Returns Calculator</span>
                              </div>
                              <div className=" rangec card-body">
                                <div className="row row-cols-auto">
                                  <div className="col ">
                                    <h5 className="my-2 sm-h5">
                                      Monthly Investment :
                                    </h5>
                                  </div>
                                  <div className="col-2 ">
                                    <h5
                                      className="bg-light text-dark card align-items-end my-2 mx-2 sm-h5"
                                      id="calc-amount_value"
                                    >
                                      ₹ 5000
                                    </h5>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-lg">
                                    <input
                                      type="range"
                                      className="form-range"
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
                                <div className="row row-cols-auto">
                                  <div className="col ">
                                    <h5 className="my-2 sm-h5">
                                      Expected Rate Of Return :
                                    </h5>
                                  </div>
                                  <div className="col-2 ">
                                    <h5
                                      className="bg-light text-dark card align-items-end my-2 mx-2 sm-h5"
                                      id="calc-rate_value"
                                    >
                                      5 %
                                    </h5>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-lg">
                                    <input
                                      type="range"
                                      className="form-range"
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
                                <div className="row row-cols-auto">
                                  <div className="col ">
                                    <h5 className="my-2 sm-h5">
                                      Time Period :
                                    </h5>
                                  </div>
                                  <div className="col-2 ">
                                    <h5
                                      className="bg-light text-dark card align-items-end my-2 mx-2 sm-h5"
                                      id="calc-time_value"
                                    >
                                      10 Yr
                                    </h5>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-lg">
                                    <input
                                      type="range"
                                      className="form-range"
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
                                  <div className="col-lg card text-center mx-1 p-0 text-white bg-primary">
                                    <div className="card-header sm-h5">
                                      Invested Amount
                                    </div>

                                    <div className="card-body">
                                      <div className="row">
                                        <h5
                                          className="card-title m-0 "
                                          id="calc-total_investment"
                                        >
                                          {" "}
                                          600000
                                        </h5>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-lg card text-center p-0 mx-1 bg-yellow text-dark">
                                    <div className="card-header sm-h5">
                                      Estimated returns
                                    </div>
                                    <div className="card-body">
                                      <h5
                                        className="card-title m-0"
                                        id="calc-estimated_return"
                                      >
                                        179646
                                      </h5>
                                    </div>
                                  </div>

                                  <div className="col-lg card text-center mx-1 p-0 text-white bg-secondary">
                                    <div className="card-header sm-h5">
                                      Total returns
                                    </div>
                                    <div className="card-body">
                                      <h5
                                        className="card-title m-0"
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
                            <div className="h-100 card bg-dark">
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
                          <div className="card mb-5 mb-lg-0 bg-dark text-light">
                            <div className="card-header">
                              <div className="card-heading">Fund Ranking</div>
                            </div>
                            <div className="card-body">
                              <div className="accordion " id="fundWiseRanking">
                                <div className="accordion-item">
                                  <div
                                    className="accordion-header"
                                    id="EquityLargeCapFunds"
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
                                          <h6 className="m-0">
                                            Equity Large Cap Funds
                                          </h6>
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-md-left col-xl">
                                        <i className="sectorShorts">
                                          Equity Large Cap Funds and Funds where
                                          a large percentage of investments are
                                          made towards companies that have a
                                          Large Market Capitalization, i.e. 'The
                                          Big Safe Companies'
                                        </i>
                                      </div>
                                    </button>
                                  </div>
                                  <div
                                    id="collapseOne"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="EquityLargeCapFunds"
                                    data-bs-parent="#fundWiseRanking"
                                  >
                                    <div className="accordion-body">
                                      <ol className="list-group  list-group-numbered">
                                        <li className="list-group-item list-group-item-dark">
                                          Canara Robeco Bluechip Equity Fund
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          Kotak Bluechip Fund
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          Axis Bluechip Fund
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          BNP Paribas Large Cap Fund
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          UTI Mastershare Fund
                                        </li>
                                      </ol>
                                    </div>
                                  </div>
                                </div>
                                <div className="accordion-item">
                                  <div
                                    className="accordion-header"
                                    id="EquityMidCapFunds"
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
                                          <h6 className="m-0">
                                            Equity Mid Cap Funds
                                          </h6>
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-md-left col-xl">
                                        <i className="sectorShorts">
                                          Equity Mid Cap Funds and Funds where a
                                          Mid percentage of investments are made
                                          towards companies that have a Medium
                                          Sized Market Capitalization.
                                        </i>
                                      </div>
                                    </button>
                                  </div>
                                  <div
                                    id="collapseTwo"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="EquityMidCapFunds"
                                    data-bs-parent="#fundWiseRanking"
                                  >
                                    <div className="accordion-body">
                                      <ol className="list-group  list-group-numbered">
                                        <li className="list-group-item list-group-item-dark">
                                          PGIM India Midcap Opportunities Fund
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          Axis Midcap Fund
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          Edelweiss Mid Cap Fund
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          Kotak Emerging Equity Fund
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          BNP Paribas Midcap Fund
                                        </li>
                                      </ol>
                                    </div>
                                  </div>
                                </div>
                                <div className="accordion-item">
                                  <div
                                    className="accordion-header"
                                    id="EquitySmallCapFunds"
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
                                            Equity Small Cap Funds
                                          </h6>
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-md-left col-xl">
                                        <i className="sectorShorts">
                                          Equity Small Cap Funds and Funds where
                                          a large percentage of investments are
                                          made towards companies that have a
                                          Small Market Capitalization, i.e. 'The
                                          Companies that might Boom'
                                        </i>
                                      </div>
                                    </button>
                                  </div>
                                  <div
                                    id="collapseThree"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="EquitySmallCapFunds"
                                    data-bs-parent="#fundWiseRanking"
                                  >
                                    <div className="accordion-body">
                                      <ol className="list-group  list-group-numbered">
                                        <li className="list-group-item list-group-item-dark">
                                          Kotak Small Cap Fund
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          Axis Small Cap Fund
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          Quant Small Cap Fund
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          Nippon India Small Cap
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          ICICI Prudential Smallcap Fund
                                        </li>
                                      </ol>
                                    </div>
                                  </div>
                                </div>
                                <div className="accordion-item">
                                  <div
                                    className="accordion-header"
                                    id="EquityFlexiCapFunds"
                                  >
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
                                          <h6 className="m-0">
                                            Equity Flexi Cap Funds
                                          </h6>
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-md-left col-xl">
                                        <i className="sectorShorts">
                                          Equity Small Cap Funds and Funds where
                                          investments are made in a spectrum of
                                          Market Capitalizations, i.e. a little
                                          bit in Large Caps, a little bit in
                                          Small Cap and a little bit in Mid Cap
                                          Funds
                                        </i>
                                      </div>
                                    </button>
                                  </div>
                                  <div
                                    id="collapsefour"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="EquityFlexiCapFunds"
                                    data-bs-parent="#fundWiseRanking"
                                  >
                                    <div className="accordion-body">
                                      <ol className="list-group  list-group-numbered">
                                        <li className="list-group-item list-group-item-dark">
                                          PGIM India Flexi Cap Fund
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          Quant Active Fund
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          Parag Parikh Flexi Cap Fund
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          DSP Flexi Cap Fund
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          UTI Flexi Cap Fund
                                        </li>
                                      </ol>
                                    </div>
                                  </div>
                                </div>
                                <div className="accordion-item">
                                  <div
                                    className="accordion-header"
                                    id="IndexFund"
                                  >
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
                                          <h6 className="m-0">Index Funds</h6>
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center flex-column flex-xl-row text-md-left col-xl">
                                        <i className="sectorShorts">
                                          Index funds are passively managed
                                          mutual funds that try to duplicate the
                                          performance of a financial index, like
                                          the Nifty50 or the Sensex.
                                        </i>
                                      </div>
                                    </button>
                                  </div>
                                  <div
                                    id="collapsefive"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="IndexFund"
                                    data-bs-parent="#fundWiseRanking"
                                  >
                                    <div className="accordion-body">
                                      <ol className="list-group  list-group-numbered">
                                        <li className="list-group-item list-group-item-dark">
                                          Nippon India Index Sensex
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          HDFC Index Sensex Fund
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          IDFC Nifty Fund
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          Tata Index Sensex Fund
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                          UTI Nifty Index Fund
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
                      {/* <h5 className="card-header section-heading-ms px-0 mb-2 mb-lg-2 text-white">
                        Personal Finance
                      </h5> */}
                      <section className="text-white">
                        <div className="container px-4 py-5" id="featured-3">
                          <h3>Personal Finance </h3>{" "}
                          <p className="pb-2 border-bottom border-primary border-2">
                            “The best thing money can buy is financial freedom"
                          </p>
                          <div className="row g-4 py-2 row-cols-1 row-cols-lg-3">
                            <div className="feature col">
                              <div className="feature-icon bg-warning bg-gradient">
                                <hr></hr>
                              </div>
                              <h2>What Is Personal Finance?</h2>
                              <p>
                                Personal Finance revolves around planning and
                                managing your financials today so you can have a
                                better tomorrow.
                              </p>
                              <a href={this.state.blog_1} className="icon-link" target="_blank" rel="noreferrer" >
                                Read More ....
                              </a>
                            </div>
                            <div className="feature col">
                              <div className="feature-icon bg-info bg-gradient">
                                <hr></hr>
                              </div>
                              <h2>Math in Personal Finance</h2>
                              <p>
                                One of the most important things to learn about
                                personal finance is the math that surrounds it.
                                Once you grasp the mathematics, the rest is
                                about putting it into practise, and life becomes
                                much easier.
                              </p>
                              <a href={this.state.blog_2} className="icon-link" target="_blank" rel="noreferrer" >
                                Read More ....
                              </a>
                            </div>
                            <div className="feature col">
                              <div className="feature-icon bg-danger bg-gradient">
                                <hr></hr>
                              </div>
                              <h2>Magic of compound interest</h2>
                              <p>
                                "Compound interest is the eighth wonder of the
                                world. He who understands it, earns it … he who
                                doesn't … pays it" - Albert Einstein
                              </p>
                              <a href={this.state.blog_3} className="icon-link" target="_blank" rel="noreferrer" >
                                Read More ....
                              </a>
                            </div>
                          </div>
                          <hr></hr>
                          <h3>Trading Vs Investing </h3>{" "}
                          <p className="pb-2 border-bottom border-primary border-2">
                            "The biggest risk of all is not taking one."
                          </p>
                          <div className="row g-4 py-2 row-cols-1 row-cols-lg-3">
                            <div className="feature col">
                              <div className="feature-icon bg-warning bg-gradient">
                                <hr></hr>
                              </div>
                              <h2>Introduction to Stock Markets</h2>
                              <p>
                                Investing ensures financial security, and the
                                Stock market plays a pivotal role in this
                                domain, it is a place where people buy/sell
                                shares of publicly listed companies.
                              </p>
                              <a href={this.state.blog_1} className="icon-link">
                                Read More ....
                              </a>
                            </div>
                            <div className="feature col">
                              <div className="feature-icon bg-info bg-gradient">
                                <hr></hr>
                              </div>
                              <h2>Technical Analysis</h2>
                              <p>
                                Technical Analysis (TA) plays an important role
                                in developing a point of view. Like every other
                                research, TA also has its own attributes.
                              </p>
                              <a href={this.state.blog_1} className="icon-link">
                                Read More ....
                              </a>
                            </div>
                            <div className="feature col">
                              <div className="feature-icon bg-danger bg-gradient">
                                <hr></hr>
                              </div>
                              <h2> Fundamental Analysis</h2>
                              <p>
                                Fundamental Analysis (FA) is a comprehensive
                                approach to researching a company, comprehending
                                equity research, reading financial statements,
                                etc. Determining the intrinsic value of a stock
                                in order to identify long-term investment
                                opportunities.
                              </p>
                              <a href={this.state.blog_1} className="icon-link">
                                Read More ....
                              </a>
                            </div>
                          </div>
                        </div>
                      </section>
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
