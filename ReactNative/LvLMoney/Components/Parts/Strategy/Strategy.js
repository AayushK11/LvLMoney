import React from "react";
import {
  StyleSheet,
  Text,
  PixelRatio,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";

const pixelratio = PixelRatio.get();

export default class Strategy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentState: 0,
      display: ["none", "flex"],
      Arrows: ["▼", "▲"],
    };
    this.switchCondition = this.switchCondition.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  switchCondition() {
    if (this.state.CurrentState == 0) {
      this.setState({ CurrentState: 1 });
    } else if (this.state.CurrentState == 1) {
      this.setState({ CurrentState: 0 });
    }
  }

  handleClick(eventPressed) {
    console.log(eventPressed);
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.switchCondition();
          }}
        >
          <View style={styles.ListDropDownBox2}>
            <View
              style={{
                flex: 3,
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text style={styles.ListDropDownHeading}>{this.props.Title}</Text>
              <Text style={styles.ListDropDownHeading}>
                {this.state.Arrows[this.state.CurrentState]}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            display: this.state.display[this.state.CurrentState],
            flexDirection: "column",
          }}
        >
          <Text style={styles.ConditionStyle}>
            Buy When : {this.props.BuyCondition}
          </Text>
          <Text style={styles.ConditionStyle}>
            Sell When : {this.props.SellCondition}
          </Text>
          <Text style={styles.ValueStyle}>Target : {this.props.Target}</Text>
          <Text style={styles.ValueStyle}>
            StopLoss : {this.props.StopLoss}
          </Text>
          <Text style={styles.RatioStyle}>
            Ratio - Avg Win / Avg Loss : {this.props.WinLossRatio}
          </Text>
          <Text style={styles.BacktestStyle}>Backtest Report :</Text>
        </View>
        <View
          style={{
            display: this.state.display[this.state.CurrentState],
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 100 / pixelratio,
            marginVertical: 20 / pixelratio,
            maxHeight: 500 / pixelratio,
          }}
        >
          <Image
            source={this.props.BacktestImage}
            style={styles.BacktestImage}
          />
        </View>
        <View
          style={{
            display: this.state.display[this.state.CurrentState],
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 100 / pixelratio,
            marginVertical: 20 / pixelratio,
            maxHeight: 500 / pixelratio,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableHighlight
            style={styles.BottomButton}
            onPress={() => this.handleClick("Download")}
            underlayColor="#007AFF"
          >
            <Text style={styles.BottomButtonText}>
              Download Detailed Report
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.BottomButton}
            onPress={() => this.handleClick("Subscribe")}
            underlayColor="#007AFF"
          >
            <Text style={styles.BottomButtonText}>Create Stock Screener</Text>
          </TouchableHighlight>
        </View>
        <View
          style={{
            borderBottomColor: "white",
            marginHorizontal: 50 / pixelratio,
            marginVertical: 25 / pixelratio,
            borderBottomWidth: 1,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ListDropDownHeading: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 50 / pixelratio,
    fontFamily: "Trebuchet",
    textAlign: "left",
    paddingRight: 20,
  },
  ListDropDownBox2: {
    flexDirection: "row",
    marginHorizontal: 50 / pixelratio,
    paddingTop: 20,
    paddingBottom: 20,
  },
  ConditionStyle: {
    color: "green",
    fontSize: 45 / pixelratio,
    fontFamily: "Trebuchet",
    textAlign: "left",
    marginHorizontal: 100 / pixelratio,
    marginVertical: 20 / pixelratio,
  },
  ValueStyle: {
    color: "red",
    fontSize: 45 / pixelratio,
    fontFamily: "Trebuchet",
    textAlign: "left",
    marginHorizontal: 100 / pixelratio,
    marginVertical: 20 / pixelratio,
  },
  RatioStyle: {
    color: "yellow",
    fontSize: 45 / pixelratio,
    fontFamily: "Trebuchet",
    textAlign: "left",
    marginHorizontal: 100 / pixelratio,
    marginVertical: 20 / pixelratio,
  },
  BacktestStyle: {
    color: "white",
    fontSize: 45 / pixelratio,
    fontFamily: "Trebuchet",
    textAlign: "left",
    marginHorizontal: 100 / pixelratio,
    marginVertical: 20 / pixelratio,
  },
  BacktestImage: {
    maxHeight: 500 / pixelratio,
    resizeMode: "contain",
  },
  BottomButton: {
    backgroundColor: "#2196F3",
    height: 100 / pixelratio,
    borderRadius: 10 / pixelratio,
    justifyContent: "center",
    marginVertical: 20 / pixelratio,
  },
  BottomButtonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 35 / pixelratio,
    fontFamily: "Trebuchet",
    marginHorizontal: 20 / pixelratio,
  },
});
