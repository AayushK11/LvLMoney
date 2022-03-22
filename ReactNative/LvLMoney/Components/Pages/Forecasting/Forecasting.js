import React from "react";
import {
  StyleSheet,
  View,
  PixelRatio,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { WebView } from "react-native-webview";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Server_Path from "../../Parts/Server/Server";

const pixelratio = PixelRatio.get();

export default class Forecasting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchedStock: "",
      PreviousSearch: "__tempstock__",
      SearchCondition: 0,
      URI: "https://www.gateway-tt.in/trade?orderConfig=%5B%7B%22quantity%22%3A10%2C%22ticker%22%3A%22__tempstock__%22%7D%5D&cardsize=big&withSearch=false&withTT=false",
      Company: "",
      Day: 0.0,
      Month: 0.0,
      Week: 0.0,
      PrevClose: 0.0,
      PrevDate: "",
      Hexs: ["#00FF00", "#FF0000"],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.forecastDetails = this.forecastDetails.bind(this);
    this.returnTextColor = this.returnTextColor.bind(this);
  }

  handleClick(ClickedItem) {
    if (ClickedItem === "Back") {
      this.props.navigation.goBack();
    }
  }

  handleInput() {
    if (this.state.SearchedStock == "") {
      this.setState({
        SearchCondition: 0,
      });
    } else {
      let SearchedStock = this.state.SearchedStock;
      SearchedStock = SearchedStock.replace(/\s/g, "");
      this.forecastDetails(SearchedStock);
      let URI = this.state.URI;
      URI = URI.replace(this.state.PreviousSearch, SearchedStock);
      this.setState({
        URI: URI,
        PreviousSearch: SearchedStock,
        SearchCondition: 1,
      });
    }
  }

  returnTextColor(Value) {
    if (Value > 0) {
      return this.state.Hexs[0];
    } else {
      return this.state.Hexs[1];
    }
  }

  forecastDetails(SearchedStock) {
    this.setState({ PrevClose: 0.0 });
    fetch(Server_Path.concat("/forecast/"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        TickerName: SearchedStock,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          Day: json["Day"],
          Week: json["Week"],
          Month: json["Month"],
          PrevClose: json["PrevClose"],
          PrevDate: json["PrevDate"],
          Company: json["Company"],
        });
      })
      .catch((error) => {
        alert("Something Went Wrong");
      });
  }

  render() {
    return (
      <View style={styles.ForecastBackground}>
        <StatusBar barStyle="light-content" backgroundColor="#010312" />
        {(() => {
          if (this.state.SearchCondition === 0) {
            return (
              <View style={styles.ForecastBackground}>
                <TouchableOpacity
                  style={styles.ForecastHeader}
                  onPress={() => this.handleClick("Back")}
                >
                  <Ionicons
                    name="arrow-back"
                    size={50 / pixelratio}
                    color={"white"}
                  />
                  <Text style={styles.ForecastingTextHeader}>Forecasting</Text>
                </TouchableOpacity>
                <View style={styles.ForecastInputField}>
                  <TextInput
                    placeholder="Enter a Stock Name"
                    placeholderTextColor="#b2b2b2"
                    autoCapitalize={"characters"}
                    style={{
                      color: "white",
                      fontSize: 45 / pixelratio,
                      paddingVertical: 10 / pixelratio,
                      flex: 1,
                      fontFamily: "Trebuchet",
                      textAlign: "center",
                    }}
                    onChangeText={(SearchedStock) =>
                      this.setState({ SearchedStock })
                    }
                    onBlur={() => this.handleInput()}
                  />
                </View>
                <View style={styles.ForecastMeme}>
                  <FontAwesome5
                    name="search-dollar"
                    style={styles.ForecastEyes}
                  />
                  <Text style={styles.ForecastTextPrompt}>
                    Search Something You Want{"\n"}
                    Search Something You Need{"\n"}
                    Search Something in the Search Bar{"\n"}
                    Get All The Info You Need{"\n"}
                  </Text>
                </View>
              </View>
            );
          } else {
            return (
              <View style={styles.ForecastBackground}>
                <TouchableOpacity
                  style={styles.ForecastHeader}
                  onPress={() => this.handleClick("Back")}
                >
                  <Ionicons
                    name="arrow-back"
                    size={50 / pixelratio}
                    color={"white"}
                  />
                  <Text style={styles.ForecastingTextHeader}>Forecasting</Text>
                </TouchableOpacity>
                <View style={styles.ForecastInputField}>
                  <TextInput
                    placeholder="Enter a Stock Name"
                    placeholderTextColor="#b2b2b2"
                    autoCapitalize={"characters"}
                    style={{
                      color: "white",
                      fontSize: 45 / pixelratio,
                      paddingVertical: 10 / pixelratio,
                      flex: 1,
                      fontFamily: "Trebuchet",
                      textAlign: "center",
                    }}
                    onChangeText={(SearchedStock) =>
                      this.setState({ SearchedStock })
                    }
                    onBlur={() => this.handleInput()}
                  />
                </View>
                <View style={styles.ForecastSearchResult}>
                  <WebView
                    scalesPageToFit={Platform.OS === "android" ? false : true}
                    javaScriptEnabled={true}
                    setBuiltInZoomControl={false}
                    scrollEnabled={true}
                    injectedJavaScript={
                      "const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);"
                    }
                    source={{
                      uri: this.state.URI,
                    }}
                    style={{ backgroundColor: "#010312" }}
                  />
                </View>
                {(() => {
                  if (this.state.PrevClose !== 0.0) {
                    return (
                      <View style={styles.ForecastResults}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            alignItems: "flex-start",
                          }}
                        >
                          <View style={styles.ForecastCompany}>
                            <Text
                              style={{
                                color: "#ffffff",
                                fontWeight: "bold",
                                fontSize: 60 / pixelratio,
                                marginLeft: 25 / pixelratio,
                                fontFamily: "Trebuchet",
                              }}
                            >
                              {this.state.Company}
                            </Text>
                          </View>
                          <View style={styles.ForecastCompany}>
                            <Text
                              style={{
                                color: "#ffffff",
                                fontStyle: "italic",
                                fontSize: 35 / pixelratio,
                                marginLeft: 25 / pixelratio,
                                marginTop: 15 / pixelratio,
                                fontFamily: "Trebuchet",
                              }}
                            >
                              Last Updated on : {this.state.PrevDate}
                            </Text>
                          </View>
                          <View style={styles.ForecastResultValues}>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <View style={styles.ForecastCompany}>
                                <Text
                                  style={{
                                    color: "#ffffff",
                                    fontSize: 40 / pixelratio,
                                    fontFamily: "Trebuchet",
                                    textAlign: "center",
                                  }}
                                >
                                  Previous Close
                                </Text>
                              </View>
                              <View style={styles.ForecastCompany}>
                                <Text
                                  style={{
                                    color: "#ffffff",
                                    fontSize: 40 / pixelratio,
                                    marginTop: 20 / pixelratio,
                                    fontFamily: "Trebuchet",
                                    textAlign: "center",
                                  }}
                                >
                                  ₹ {this.state.PrevClose}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <View style={styles.ForecastCompany}>
                                <Text
                                  style={{
                                    color: "#ffffff",
                                    fontSize: 40 / pixelratio,
                                    fontFamily: "Trebuchet",
                                    textAlign: "center",
                                  }}
                                >
                                  1 Day Forecast
                                </Text>
                              </View>
                              <View style={styles.ForecastCompany}>
                                <Text
                                  style={{
                                    color: this.returnTextColor(
                                      parseFloat(
                                        ((this.state.Day -
                                          this.state.PrevClose) /
                                          this.state.PrevClose) *
                                          100
                                      ).toFixed(2)
                                    ),
                                    fontSize: 40 / pixelratio,
                                    marginTop: 20 / pixelratio,
                                    fontFamily: "Trebuchet",
                                    textAlign: "center",
                                  }}
                                >
                                  {this.state.Day.toString().includes(
                                    "Insufficient"
                                  )
                                    ? "Insufficient Data"
                                    : "₹ " +
                                      this.state.Day +
                                      " (" +
                                      parseFloat(
                                        ((this.state.Day -
                                          this.state.PrevClose) /
                                          this.state.PrevClose) *
                                          100
                                      ).toFixed(2) +
                                      "%)"}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View style={styles.ForecastResultValues}>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <View style={styles.ForecastCompany}>
                                <Text
                                  style={{
                                    color: "#ffffff",
                                    fontSize: 40 / pixelratio,
                                    fontFamily: "Trebuchet",
                                    textAlign: "center",
                                  }}
                                >
                                  1 Week Forecast
                                </Text>
                              </View>
                              <View style={styles.ForecastCompany}>
                                <Text
                                  style={{
                                    color: this.returnTextColor(
                                      parseFloat(
                                        ((this.state.Week -
                                          this.state.PrevClose) /
                                          this.state.PrevClose) *
                                          100
                                      ).toFixed(2)
                                    ),
                                    fontSize: 40 / pixelratio,
                                    marginTop: 20 / pixelratio,
                                    fontFamily: "Trebuchet",
                                    textAlign: "center",
                                  }}
                                >
                                  {this.state.Week.toString().includes(
                                    "Insufficient"
                                  )
                                    ? "Insufficient Data"
                                    : "₹ " +
                                      this.state.Week +
                                      " (" +
                                      parseFloat(
                                        ((this.state.Week -
                                          this.state.PrevClose) /
                                          this.state.PrevClose) *
                                          100
                                      ).toFixed(2) +
                                      "%)"}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <View style={styles.ForecastCompany}>
                                <Text
                                  style={{
                                    color: "#ffffff",
                                    fontSize: 40 / pixelratio,
                                    fontFamily: "Trebuchet",
                                    textAlign: "center",
                                  }}
                                >
                                  1 Month Forecast
                                </Text>
                              </View>
                              <View style={styles.ForecastCompany}>
                                <Text
                                  style={{
                                    color: this.returnTextColor(
                                      parseFloat(
                                        ((this.state.Month -
                                          this.state.PrevClose) /
                                          this.state.PrevClose) *
                                          100
                                      ).toFixed(2)
                                    ),
                                    fontSize: 40 / pixelratio,
                                    marginTop: 20 / pixelratio,
                                    fontFamily: "Trebuchet",
                                    textAlign: "center",
                                  }}
                                >
                                  {this.state.Month.toString().includes(
                                    "Insufficient"
                                  )
                                    ? "Insufficient Data"
                                    : "₹ " +
                                      this.state.Month +
                                      " (" +
                                      parseFloat(
                                        ((this.state.Month -
                                          this.state.PrevClose) /
                                          this.state.PrevClose) *
                                          100
                                      ).toFixed(2) +
                                      "%)"}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  } else {
                    return (
                      <View style={styles.ForecastResults}>
                        <Text
                          style={{
                            fontSize: 50 / pixelratio,
                            marginHorizontal: 30 / pixelratio,
                            fontStyle: "italic",
                            textAlign: "center",
                            color: "white",
                          }}
                        >
                          The Neurons are Firing and Learning is in Progress....
                          {"\n"}
                          Please Wait or try again after a few minutes.
                        </Text>
                      </View>
                    );
                  }
                })()}
              </View>
            );
          }
        })()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ForecastBackground: {
    backgroundColor: "#010312",
    justifyContent: "flex-start",
    flex: 1,
    flexDirection: "column",
  },
  ForecastHeader: {
    flexDirection: "row",
    marginTop: 75 / pixelratio,
    marginBottom: 100 / pixelratio,
    marginLeft: 50 / pixelratio,
    alignItems: "center",
  },
  ForecastingTextHeader: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 50 / pixelratio,
    marginLeft: 25 / pixelratio,
    fontFamily: "Trebuchet",
  },
  ForecastInputField: {
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#c0c0c0",
    borderRadius: 20,
    alignItems: "center",
    textAlign: "center",
    paddingHorizontal: 50 / pixelratio,
    paddingVertical: 30 / pixelratio,
    marginHorizontal: 50 / pixelratio,
  },
  ForecastResults: {
    width: "auto",
    height: 1000 / pixelratio,
    marginBottom: 50 / pixelratio,
    marginHorizontal: 50 / pixelratio,
    justifyContent: "center",
    flex: 3,
  },
  ForecastSearchResult: {
    width: "auto",
    height: 1000 / pixelratio,
    marginBottom: 50 / pixelratio,
    marginTop: 50 / pixelratio,
    marginHorizontal: 50 / pixelratio,
    justifyContent: "center",
    flex: 3,
  },
  ForecastTextPrompt: {
    color: "white",
    fontFamily: "Trebuchet",
    fontSize: 45 / pixelratio,
    textAlign: "center",
    lineHeight: 75 / pixelratio,
    fontStyle: "italic",
  },
  ForecastMeme: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
  },
  ForecastEyes: {
    color: "#2196F3",
    fontFamily: "Trebuchet",
    fontWeight: "bold",
    fontSize: 190 / pixelratio,
    textAlign: "center",
  },
  ForecastCompany: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  ForecastResultValues: {
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 100 / pixelratio,
  },
});
