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
import ListDropDown from "../../Parts/ListDropDown/ListDropDown";

const pixelratio = PixelRatio.get();

export default class SectorWiseRanking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Automobiles: ["MARUTI", "M%26M", "TATAMOTORS", "BAJAJ-AUTO", "EICHERMOT"],
      Banking: ["HDFCBANK", "ICICIBANK", "SBIN", "KOTAKBANK", "AXISBANK"],
      FinancialServices: [
        "HDFCBANK",
        "HDFC",
        "ICICIBANK",
        "KOTAKBANK",
        "BAJFINANCE",
      ],
      Fmcg: ["HINDUNILVR", "ITC", "NESTLEIND", "TATACONSUM", "BRITANNIA"],
      InformationTechnology: ["INFY", "TCS", "HCLTECH", "WIPRO", "TECHM"],
      Media: ["ZEEL", "PVR", "SUNTV", "INOXLEISUR", "DISHTV"],
      Metal: ["TATASTEEL", "HINDALCO", "JSWSTEEL", "ADANIENT", "COALINDIA"],
      Pharmaceutical: [
        "SUNPHARMA",
        "DIVISLAB",
        "DRREDDY",
        "CIPLA",
        "LAURUSLABS",
      ],
      Realty: ["GODREJPROP", "DLF", "OBEROIRLTY", "PHOENIXLTD", "PRESTIGE"],
    };
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
      <View style={styles.SectorWiseRankingBackground}>
        <StatusBar barStyle="light-content" backgroundColor="#010312" />
        <TouchableOpacity
          style={styles.SectorWiseRankingHeader}
          onPress={() => this.handleClick("Back")}
        >
          <Ionicons name="arrow-back" size={50 / pixelratio} color={"white"} />
          <Text style={styles.SectorWiseRankingTextHeader}>
            Sector Wise Rankings
          </Text>
        </TouchableOpacity>
        <ScrollView>
          <ListDropDown
            Title="Automobiles"
            Description="Indian Automobiles Sector including but not limited to Vehicles such as 4-Wheelers, 2-Wheelers, etc."
            Stocks={this.state.Automobiles}
          />
          <ListDropDown
            Title="Banking"
            Description="The Banking Sector includes the largest Indian Banking Stock, both Public and Private."
            Stocks={this.state.Banking}
          />
          <ListDropDown
            Title="Financial Services"
            Description="Financial Services mainly cover the Indian Financial Market which comprises of Banks, Financial Institues, Insurance Companies and so on."
            Stocks={this.state.FinancialServices}
          />
          <ListDropDown
            Title="FMCG"
            Description="FMCG, which stands for Fast Moving Consumer Goods, consists of companies that provide goods that are non-durable and are availabe on and off shelf."
            Stocks={this.state.Fmcg}
          />
          <ListDropDown
            Title="Information Technology"
            Description="Information Technology, often abbreviated as IT, roughly includes companies that provide Technological Solutions and generally deal with creating softwares for clients and customers."
            Stocks={this.state.InformationTechnology}
          />
          <ListDropDown
            Title="Media"
            Description="When we talk about the Media Sector, we talk about companies that provide services such as entertainment, printing and publishing."
            Stocks={this.state.Media}
          />
          <ListDropDown
            Title="Metal"
            Description="The Metal Sector covers companies that prvodie raw materials and mining services in India."
            Stocks={this.state.Metal}
          />
          <ListDropDown
            Title="Pharmaceutical "
            Description="The Pharmaceutical industry discovers, develops, produces, and markets drugs or pharmaceutical drugs for use as medications to be administered to patients, with the aim to cure them, vaccinate them, or alleviate the symptoms."
            Stocks={this.state.Pharmaceutical}
          />
          <ListDropDown
            Title="Realty"
            Description="The Realty industry companies that are primarily engaged into construction of residential and commercial properties."
            Stocks={this.state.Realty}
          />
          {/*<ListDropDown Title="Consumer Durables" />
          <ListDropDown Title="Oil and Gas" /> */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  SectorWiseRankingBackground: {
    backgroundColor: "#010312",
    justifyContent: "flex-start",
    flex: 1,
    flexDirection: "column",
  },
  SectorWiseRankingHeader: {
    flexDirection: "row",
    marginTop: 75 / pixelratio,
    marginBottom: 100 / pixelratio,
    marginLeft: 50 / pixelratio,
    alignItems: "center",
  },
  SectorWiseRankingTextHeader: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 50 / pixelratio,
    marginLeft: 25 / pixelratio,
  },
});
