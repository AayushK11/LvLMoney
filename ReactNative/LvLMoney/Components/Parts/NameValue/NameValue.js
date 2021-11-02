import React from "react";
import {
  StyleSheet,
  Text,
  PixelRatio,
  View,
  TouchableOpacity,
} from "react-native";
const pixelratio = PixelRatio.get();

export default class NameValue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          marginHorizontal: 100 / pixelratio,
          marginTop: 10 / pixelratio,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.NameValueText}>{this.props.Name}</Text>
        <Text
          style={
            this.props.Type == "Positive"
              ? styles.NameValueTextPositive
              : styles.NameValueTextNegative
          }
        >
          {this.props.Value}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  NameValueFactor: {
    color: "#ffffff",
    fontWeight: "bold",
    // fontFamily: "Trebuchet",
    fontSize: 35 / pixelratio,
    marginVertical: 25 / pixelratio,
    textAlign: "center",
  },
  NameValueText: {
    color: "#ffffff",
    fontWeight: "bold",
    // fontFamily: "Trebuchet",
    fontSize: 40 / pixelratio,
    marginVertical: 25 / pixelratio,
    textAlign: "center",
  },
  NameValueTextPositive: {
    color: "green",
    fontWeight: "bold",
    // fontFamily: "Trebuchet",
    fontSize: 40 / pixelratio,
    marginVertical: 25 / pixelratio,
    textAlign: "center",
  },
  NameValueTextNegative: {
    color: "red",
    fontWeight: "bold",
    // fontFamily: "Trebuchet",
    fontSize: 40 / pixelratio,
    marginVertical: 25 / pixelratio,
    textAlign: "center",
  },
});
