import React from "react";
import { StyleSheet, View, PixelRatio, Text } from "react-native";
import BoxedItem from "../../Parts/BoxedItem/BoxedItem";
import AntDesign from "react-native-vector-icons/AntDesign";
import { StackActions } from "@react-navigation/native";

const pixelratio = PixelRatio.get();

export default class Stocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(ClickedItem) {
    if (ClickedItem === "Forecasting") {
      this.props.navigation.push("Forecasting");
    }
    console.log(ClickedItem);
  }

  render() {
    return (
      <View style={styles.StocksBackground}>
        <View style={styles.StocksBox}>
          <View style={{ flex: 3 }}>
            <Text style={styles.StocksHeading}>Stocks</Text>
          </View>
          <View style={({ flex: 1 }, styles.StocksImage)}>
            <AntDesign
              name="barschart"
              size={130 / pixelratio}
              color={"#2196F3"}
            />
          </View>
        </View>
        <BoxedItem Title="Forecasting" handleClick={this.handleClick} />
        <BoxedItem
          Title="Market Sentiment Analysis"
          handleClick={this.handleClick}
        />
        <BoxedItem
          Title="Sector Based Ranking"
          handleClick={this.handleClick}
        />
        <BoxedItem Title="Trading Strategies" handleClick={this.handleClick} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  StocksBackground: {
    backgroundColor: "#010312",
    justifyContent: "flex-start",
    flex: 1,
    flexDirection: "column",
  },
  StocksBox: {
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
  StocksImage: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
    marginStart: 50 / pixelratio,
    marginEnd: 50 / pixelratio,
    paddingStart: 20,
    paddingEnd: 10,
    alignItems: "flex-end",
  },
  StocksHeading: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 50 / pixelratio,
    textAlign: "left",
    paddingRight: 20,
    fontFamily: "Trebuchet",
  },
});
