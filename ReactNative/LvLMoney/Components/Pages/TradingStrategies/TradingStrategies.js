import React from "react";
import {
  StyleSheet,
  View,
  PixelRatio,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Strategy from "../../Parts/Strategy/Strategy";
import testimg from "../../Images/Icons/LvL_L.png";

const pixelratio = PixelRatio.get();

export default class TradingStrategies extends React.Component {
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

  componentDidMount() {}

  render() {
    return (
      <View style={styles.TradingStrategiesBackground}>
        <StatusBar barStyle="light-content" backgroundColor="#010312" />
        <TouchableOpacity
          style={styles.TradingStrategiesHeader}
          onPress={() => this.handleClick("Back")}
        >
          <Ionicons name="arrow-back" size={50 / pixelratio} color={"white"} />
          <Text style={styles.TradingStrategiesTextHeader}>
            Trading Strategies
          </Text>
        </TouchableOpacity>
        <ScrollView>
          <Strategy
            Title="20MA - 50MA Crossover"
            BuyCondition="20 day SMA Crosses over the 50 day SMA"
            SellCondition="Price Crosses below the 20 day SMA"
            Target="30% on Buy Price"
            StopLoss="10% on Buy Price"
            WinLossRatio="2.158"
            BacktestImage={testimg}
          />
          <Strategy
            Title="52 Week High"
            BuyCondition="A Stock Hits a new 52 Week High"
            SellCondition="Price falls below its 10 Week Low"
            Target="30% on Buy Price"
            StopLoss="10% on Buy Price"
            WinLossRatio="3.483"
            BacktestImage={testimg}
          />
          <Strategy
            Title="44MA - 200MA Crossover"
            BuyCondition="44 day SMA Crosses over the 50 day SMA"
            SellCondition="Price Crosses below the 44 day SMA"
            Target="30% on Buy Price"
            StopLoss="10% on Buy Price"
            WinLossRatio="2.475"
            BacktestImage={testimg}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  TradingStrategiesBackground: {
    backgroundColor: "#010312",
    justifyContent: "flex-start",
    flex: 1,
    flexDirection: "column",
  },
  TradingStrategiesHeader: {
    flexDirection: "row",
    marginTop: 75 / pixelratio,
    marginBottom: 100 / pixelratio,
    marginLeft: 50 / pixelratio,
    alignItems: "center",
  },
  TradingStrategiesTextHeader: {
    color: "#ffffff",
    fontFamily: "Trebuchet",
    fontWeight: "bold",
    fontSize: 50 / pixelratio,
    marginLeft: 25 / pixelratio,
  },
});
