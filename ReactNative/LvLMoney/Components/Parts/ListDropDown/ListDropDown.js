import React from "react";
import {
  StyleSheet,
  Text,
  PixelRatio,
  View,
  TouchableOpacity,
} from "react-native";
import StockDropdown from "../StockDropDown/StockDropDown";

const pixelratio = PixelRatio.get();

export default class ListDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentState: 0,
      display: ["none", "flex"],
      Arrows: ["▼", "▲"],
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
        <View style={{ display: this.state.display[this.state.CurrentState] }}>
          {(() => {
            if (this.props.Type === "Mutual Fund") {
              return (
                <View styles={styles.MutualFundBox2}>
                  <Text style={styles.MutualFund}>{this.props.Funds[0]}</Text>
                  <Text style={styles.MutualFund}>{this.props.Funds[1]}</Text>
                  <Text style={styles.MutualFund}>{this.props.Funds[2]}</Text>
                  <Text style={styles.MutualFund}>{this.props.Funds[3]}</Text>
                  <Text style={styles.MutualFund}>{this.props.Funds[4]}</Text>
                </View>
              );
            } else {
              return (
                <View>
                  <StockDropdown
                    Stock={this.props.Stocks[0].replace("&", "%26")}
                  />
                  <StockDropdown
                    Stock={this.props.Stocks[1].replace("&", "%26")}
                  />
                  <StockDropdown
                    Stock={this.props.Stocks[2].replace("&", "%26")}
                  />
                  <StockDropdown
                    Stock={this.props.Stocks[3].replace("&", "%26")}
                  />
                  <StockDropdown
                    Stock={this.props.Stocks[4].replace("&", "%26")}
                  />
                </View>
              );
            }
          })()}
        </View>
        <View style={{ display: this.state.display[this.state.CurrentState] }}>
          <Text style={styles.ListDropDownDescription}>
            {this.props.Description}
          </Text>
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
  ListDropDownDescription: {
    fontStyle: "italic",
    color: "#2196F3",
    fontSize: 35 / pixelratio,
    textAlign: "left",
    fontFamily: "Trebuchet",
    marginHorizontal: 100 / pixelratio,
    marginVertical: 20 / pixelratio,
  },
  MutualFund: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 45 / pixelratio,
    fontFamily: "Trebuchet",
    textAlign: "left",
    marginHorizontal: 100 / pixelratio,
    paddingTop: 20,
    paddingBottom: 20,
  },
});
