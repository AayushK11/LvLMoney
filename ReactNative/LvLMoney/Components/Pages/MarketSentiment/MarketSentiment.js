import React from "react";
import {
  StyleSheet,
  View,
  PixelRatio,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import RNSpeedometer from "react-native-speedometer";

const pixelratio = PixelRatio.get();

export default class MarketSentiment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MMI: 65.36,
      MMIColor: "white",
      Arrows: ["▼", "▲"],
      Flex: [
        [7, 1],
        [3, 5],
      ],
      Display: ["none", "flex"],
      Condition: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.switchCondition = this.switchCondition.bind(this);
  }

  handleClick(ClickedItem) {
    if (ClickedItem === "Back") {
      this.props.navigation.goBack();
    }
    console.log(ClickedItem);
  }

  switchCondition() {
    if (this.state.Condition == 1) {
      this.setState({ Condition: 0 });
    }
    if (this.state.Condition == 0) {
      this.setState({ Condition: 1 });
    }
  }

  componentDidMount() {
    if (this.state.MMI < 17) {
      this.setState({ MMIColor: "#12be57" });
    } else if (this.state.MMI < 50) {
      this.setState({ MMIColor: "#ffd9ac" });
    } else if (this.state.MMI < 84) {
      this.setState({ MMIColor: "#f57011" });
    } else {
      this.setState({ MMIColor: "#d62020" });
    }
  }

  render() {
    return (
      <View style={styles.MarketSentimentBackground}>
        <StatusBar barStyle="light-content" backgroundColor="#010312" />
        <TouchableOpacity
          style={styles.MarketSentimentHeader}
          onPress={() => this.handleClick("Back")}
        >
          <Ionicons name="arrow-back" size={50 / pixelratio} color={"white"} />
          <Text style={styles.MarketSentimentingTextHeader}>
            Market Sentiment
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginBottom: 10 / pixelratio,
            marginTop: 20 / pixelratio,
            marginHorizontal: 50 / pixelratio,
            justifyContent: "center",
            marginBottom: 10 / pixelratio,
            marginTop: 20 / pixelratio,
            marginHorizontal: 50 / pixelratio,
            justifyContent: "center",
            flex: this.state.Flex[this.state.Condition][0],
          }}
        >
          <RNSpeedometer
            value={this.state.MMI}
            size={780 / pixelratio}
            minValue={0}
            maxValue={100}
            allowedDecimals={1}
            labels={[
              {
                name: "Extreme Fear",
                activeBarColor: "#12be57",
              },
              {
                name: "Fear",
                activeBarColor: "#ffd9ac",
              },
              {
                name: "Greed",
                activeBarColor: "#f57011",
              },
              {
                name: "Extreme Greed",
                activeBarColor: "#d62020",
              },
            ]}
            labelStyle={{
              color: this.state.MMIColor,
              fontFamily: "Trebuchet",
              marginTop: 20 / pixelratio,
              fontSize: 55 / pixelratio,
              fontWeight: "normal",
            }}
            labelNoteStyle={{
              color: this.state.MMIColor,
              marginTop: 20 / pixelratio,
              fontFamily: "Trebuchet",
              fontSize: 55 / pixelratio,
              fontWeight: "normal",
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            marginBottom: 50 / pixelratio,
            marginTop: 10 / pixelratio,
            marginHorizontal: 50 / pixelratio,
            justifyContent: "center",
            flex: this.state.Flex[this.state.Condition][1],
          }}
          onPress={() => this.switchCondition()}
        >
          <View>
            <Text style={styles.MarketSentimentExplanationButton}>
              How to Interpret the Market Sentiment?{"  "}
              {this.state.Arrows[this.state.Condition]}
            </Text>
            <View style={{ display: this.state.Display[this.state.Condition] }}>
              <Text style={styles.MarketSentimentExtremeFear}>
                Extreme Fear
              </Text>
              <Text style={styles.MarketSentimentExtremeFearDescription}>
                Markets are Oversold. A Good Time to Open Fresh Positions and
                Hold Current Positions
              </Text>
              <Text style={styles.MarketSentimentFear}>Fear</Text>
              <Text style={styles.MarketSentimentFearDescription}>
                Selling Pressure but not Oversold. A Decent time to open fresh
                positions.
              </Text>
              <Text style={styles.MarketSentimentGreed}>Greed</Text>
              <Text style={styles.MarketSentimentGreedDescription}>
                Markets are High but no clear sign of a Bullish Run. Be careful
                while opening new positions
              </Text>
              <Text style={styles.MarketSentimentExtremeGreed}>
                Extreme Greed
              </Text>
              <Text style={styles.MarketSentimentExtremeGreedDescription}>
                Markets are Overbought. It is Advisable not to open new
                Positions as the market might fall soon.
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MarketSentimentBackground: {
    backgroundColor: "#010312",
    justifyContent: "flex-start",
    flex: 1,
    flexDirection: "column",
  },
  MarketSentimentHeader: {
    flexDirection: "row",
    marginTop: 75 / pixelratio,
    marginBottom: 100 / pixelratio,
    marginLeft: 50 / pixelratio,
    alignItems: "center",
  },
  MarketSentimentingTextHeader: {
    color: "#ffffff",
    fontFamily: "Trebuchet",
    fontWeight: "bold",
    fontSize: 50 / pixelratio,
    marginLeft: 25 / pixelratio,
  },
  MarketSentimentExplanationButton: {
    fontSize: 50 / pixelratio,
    color: "white",
    fontFamily: "Trebuchet",
    textAlign: "center",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  MarketSentimentExtremeFear: {
    fontSize: 40 / pixelratio,
    color: "#12be57",
    marginHorizontal: 50 / pixelratio,
    marginTop: 25 / pixelratio,
    fontFamily: "Trebuchet",
  },
  MarketSentimentExtremeFearDescription: {
    fontSize: 40 / pixelratio,
    color: "#12be57",
    fontFamily: "Trebuchet",
    marginHorizontal: 100 / pixelratio,
    marginVertical: 25 / pixelratio,
    fontStyle: "italic",
  },
  MarketSentimentFear: {
    fontSize: 40 / pixelratio,
    color: "#ffd9ac",
    fontFamily: "Trebuchet",
    marginHorizontal: 50 / pixelratio,
  },
  MarketSentimentFearDescription: {
    fontSize: 40 / pixelratio,
    color: "#ffd9ac",
    marginHorizontal: 100 / pixelratio,
    marginVertical: 25 / pixelratio,
    fontFamily: "Trebuchet",
    fontStyle: "italic",
  },
  MarketSentimentGreed: {
    fontSize: 40 / pixelratio,
    fontFamily: "Trebuchet",
    color: "#f57011",
    marginHorizontal: 50 / pixelratio,
  },
  MarketSentimentGreedDescription: {
    fontSize: 40 / pixelratio,
    color: "#f57011",
    fontFamily: "Trebuchet",
    marginHorizontal: 100 / pixelratio,
    marginVertical: 25 / pixelratio,
    fontStyle: "italic",
  },
  MarketSentimentExtremeGreed: {
    fontFamily: "Trebuchet",
    fontSize: 40 / pixelratio,
    color: "#d62020",
    marginHorizontal: 50 / pixelratio,
  },
  MarketSentimentExtremeGreedDescription: {
    fontSize: 40 / pixelratio,
    color: "#d62020",
    fontFamily: "Trebuchet",
    marginHorizontal: 100 / pixelratio,
    marginVertical: 25 / pixelratio,
    fontStyle: "italic",
  },
});
