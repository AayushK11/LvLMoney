import React from "react";
import { StyleSheet, View, PixelRatio, Text } from "react-native";
import BoxedItem from "../../Parts/BoxedItem/BoxedItem";
import Ionicons from "react-native-vector-icons/Ionicons";

const pixelratio = PixelRatio.get();

export default class MutualFunds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(ClickedItem) {
    console.log(ClickedItem);
  }

  render() {
    return (
      <View style={styles.MFBackground}>
        <View style={styles.MFBox}>
          <View style={{ flex: 3 }}>
            <Text style={styles.MFHeading}>Mutual Funds</Text>
          </View>
          <View style={({ flex: 1 }, styles.MFImage)}>
            <Ionicons
              name="ios-timer-outline"
              size={130 / pixelratio}
              color={"#2196F3"}
            />
          </View>
        </View>
        <BoxedItem Title="Returns Calculator" handleClick={this.handleClick} />
        <BoxedItem Title="Risk Profile Test" handleClick={this.handleClick} />
        <BoxedItem Title="Fund Rankings" handleClick={this.handleClick} />
        <BoxedItem Title="Fund Comparison" handleClick={this.handleClick} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MFBackground: {
    backgroundColor: "#010312",
    justifyContent: "flex-start",
    flex: 1,
    flexDirection: "column",
  },
  MFBox: {
    flexDirection: "row",
    marginTop: 150 / pixelratio,
    marginStart: 50 / pixelratio,
    marginEnd: 50 / pixelratio,
    marginBottom: 75 / pixelratio,
    paddingStart: 20,
    paddingEnd: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderColor: "white",
    borderWidth: 1,
    alignItems: "center",
  },
  MFImage: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
    marginStart: 50 / pixelratio,
    marginEnd: 50 / pixelratio,
    paddingStart: 20,
    paddingEnd: 10,
    alignItems: "flex-end",
  },
  MFHeading: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 50 / pixelratio,
    textAlign: "left",
    paddingRight: 20,
    fontFamily: "Trebuchet",
  },
});
