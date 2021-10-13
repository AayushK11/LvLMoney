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

const pixelratio = PixelRatio.get();

export default class Forecasting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchedStock: "",
      PreviousSearch: "__tempstock__",
      SearchCondition: 0,
      URI: "https://www.gateway-tt.in/trade?orderConfig=%5B%7B%22quantity%22%3A10%2C%22ticker%22%3A%22__tempstock__%22%7D%5D&cardsize=big&withSearch=false&withTT=false",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleClick(ClickedItem) {
    if (ClickedItem === "Back") {
      this.props.navigation.goBack();
    }
    console.log(ClickedItem);
  }

  handleInput() {
    if (this.state.SearchedStock == "") {
      this.setState({
        SearchCondition: 0,
      });
    } else {
      let SearchedStock = this.state.SearchedStock;
      SearchedStock = SearchedStock.replace(" ", "");
      let URI = this.state.URI;
      URI = URI.replace(this.state.PreviousSearch, SearchedStock);
      this.setState({
        URI: URI,
        PreviousSearch: SearchedStock,
        SearchCondition: 1,
      });
    }
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
                      textAlign: "center",
                    }}
                    onChangeText={(SearchedStock) =>
                      this.setState({ SearchedStock })
                    }
                    onBlur={() => this.handleInput()}
                  />
                </View>
                <View style={styles.ForecastResults}>
                  <View
                    style={{
                      backgroundColor: "red",
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "white", textAlign: "center" }}>
                      Aree server chalu hojane de raja
                    </Text>
                  </View>
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
    marginBottom: 50 / pixelratio,
  },
  ForecastResults: {
    width: "auto",
    height: 1000 / pixelratio,
    marginBottom: 10 / pixelratio,
    marginTop: 50 / pixelratio,
    marginHorizontal: 50 / pixelratio,
    justifyContent: "center",
    flex: 3,
  },
  ForecastSearchResult: {
    width: "auto",
    height: 1000 / pixelratio,
    marginBottom: 50 / pixelratio,
    marginTop: 10 / pixelratio,
    marginHorizontal: 50 / pixelratio,
    justifyContent: "center",
    flex: 5,
  },
  ForecastTextPrompt: {
    color: "white",
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
    fontWeight: "bold",
    fontSize: 190 / pixelratio,
    textAlign: "center",
  },
});
