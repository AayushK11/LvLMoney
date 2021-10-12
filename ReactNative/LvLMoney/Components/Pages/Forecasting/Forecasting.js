import React from "react";
import {
  StyleSheet,
  View,
  PixelRatio,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const pixelratio = PixelRatio.get();

export default class Forecasting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(ClickedItem) {
    if (ClickedItem === "Back") {
      this.props.navigation.goBack();
    }
    console.log(ClickedItem);
  }

  render() {
    return (
      <View style={styles.ForecastBackground}>
        <TouchableOpacity
          style={styles.ForecastHeader}
          onPress={() => this.handleClick("Back")}
        >
          <Ionicons name="arrow-back" size={50 / pixelratio} color={"white"} />
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
          />
        </View>
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
  },
});
