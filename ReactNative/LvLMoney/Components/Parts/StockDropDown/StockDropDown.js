import React from "react";
import {
  StyleSheet,
  Text,
  PixelRatio,
  View,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";

const pixelratio = PixelRatio.get();

export default class StockDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentState: 0,
      display: ["none", "flex"],
      URI: "https://www.gateway-tt.in/trade?orderConfig=%5B%7B%22quantity%22%3A10%2C%22ticker%22%3A%22__tempstock__%22%7D%5D&cardsize=small&withSearch=false&withTT=false",
    };
    this.switchCondition = this.switchCondition.bind(this);
  }

  switchCondition() {
    if (this.state.CurrentState == 0) {
      this.setState({ CurrentState: 1 });
    } else if (this.state.CurrentState == 1) {
      this.setState({ CurrentState: 0 });
    }
  }

  componentDidMount() {
    var URI = this.state.URI.replace("__tempstock__", this.props.Stock);
    this.setState({ URI: URI });
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.switchCondition();
          }}
        >
          <View style={styles.StockDropDownBox2}>
            <View
              style={{
                flex: 3,
                justifyContent: "center",
              }}
            >
              <Text style={styles.StockDropDownHeading}>
                {this.props.Stock.replace("%26", " & ")}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            display: this.state.display[this.state.CurrentState],
            flex: 1,
            width: "auto",
            height: 1100 / pixelratio,
            marginHorizontal: 50 / pixelratio,
            justifyContent: "center",
          }}
        >
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
}

const styles = StyleSheet.create({
  StockDropDownHeading: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 45 / pixelratio,
    fontFamily: "Trebuchet",
    textAlign: "left",
    marginHorizontal: 50 / pixelratio,
  },
  StockDropDownBox2: {
    flexDirection: "row",
    marginHorizontal: 50 / pixelratio,
    paddingTop: 20,
    paddingBottom: 20,
  },
});
