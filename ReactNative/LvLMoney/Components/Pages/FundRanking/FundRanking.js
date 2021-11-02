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

export default class FundRanking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      EquityLargeCapFunds: [
        "Canara Robeco Bluechip Equity Fund",
        "Kotak Bluechip Fund",
        "Axis Bluechip Fund",
        "BNP Paribas Large Cap Fund",
        "UTI Mastershare Fund",
      ],
      EquityMidCapFunds: [
        "PGIM India Midcap Opportunities Fund",
        "Axis Midcap Fund",
        "Edelweiss Mid Cap Fund",
        "Kotak Emerging Equity Fund",
        "BNP Paribas Midcap Fund",
      ],
      EquitySmallCapFunds: [
        "Kotak Small Cap Fund",
        "Axis Small Cap Fund",
        "Quant Small Cap Fund",
        "Nippon India Small Cap",
        "ICICI Prudential Smallcap Fund",
      ],
      EquityFlexiCapFunds: [
        "PGIM India Flexi Cap Fund",
        "Quant Active Fund",
        "Parag Parikh Flexi Cap Fund",
        "DSP Flexi Cap Fund",
        "UTI Flexi Cap Fund",
      ],
      ShortTermDurationDebtFunds: [
        "Axis Short Term Fund",
        "ICICI Prudential Short Term Fund",
        "Nippon India Short-term Fund",
        "Kotak Bond Short-term Fund",
        "Mirae Asset Short Term Fund",
      ],
      MediumTermDurationDebtFunds: [
        "SBI Magnum Medium Duration Fund",
        "HDFC Medium Term Debt Fund",
        "ICICI Prudential Medium Term Bond Fund",
        "Axis Strategic Bond Fund",
        "IDFC Bond Fund Medium Term Plan",
      ],
      LongTermDurationDebtFunds: [
        "ICICI Prudential Long Term Bond Fund",
        "BHARAT Bond FOF - April 2030",
        "BHARAT Bond FOF - April 2031",
        "Nippon India Nivesh Lakshya Fund",
        "",
      ],
      MultiAssetAllocationHybridFunds: [
        "Quant Multi Asset Fund",
        "Aditya Birla Sun Life Financial Planning FOF Conservative Plan",
        "SBI Multi Asset Allocation Fund",
        "Axis Triple Advantage Fund",
        "Aditya Birla Sun Life Financial Planning FOF Aggressive Plan",
      ],
      IndexFund: [
        "Nippon India Index Sensex",
        "HDFC Index Sensex Fund",
        "IDFC Nifty Fund",
        "Tata Index Sensex Fund",
        "UTI Nifty Index Fund",
      ],
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
      <View style={styles.FundRankingBackground}>
        <StatusBar barStyle="light-content" backgroundColor="#010312" />
        <TouchableOpacity
          style={styles.FundRankingHeader}
          onPress={() => this.handleClick("Back")}
        >
          <Ionicons name="arrow-back" size={50 / pixelratio} color={"white"} />
          <Text style={styles.FundRankingTextHeader}>Fund Rankings</Text>
        </TouchableOpacity>
        <ScrollView>
          <ListDropDown
            Title="Equity Large Cap Funds"
            Type="Mutual Fund"
            Description="Equity Large Cap Funds and Funds where a large percentage of investments are made towards companies that have a Large Market Capitalization, i.e. 'The Big Safe Companies'"
            Funds={this.state.EquityLargeCapFunds}
          />
          <ListDropDown
            Title="Equity Mid Cap Funds"
            Type="Mutual Fund"
            Description="Equity Large Cap Funds and Funds where a large percentage of investments are made towards companies that have a Medium Sized Market Capitalization, i.e. 'The Companies moving towards Large Cap'"
            Funds={this.state.EquityMidCapFunds}
          />
          <ListDropDown
            Title="Equity Small Cap Funds"
            Type="Mutual Fund"
            Description="Equity Small Cap Funds and Funds where a large percentage of investments are made towards companies that have a Small Market Capitalization, i.e. 'The Companies that might Boom'"
            Funds={this.state.EquitySmallCapFunds}
          />
          <ListDropDown
            Title="Equity Flexi Cap Funds"
            Type="Mutual Fund"
            Description="Equity Small Cap Funds and Funds where investments are made in a spectrum of Market Capitalizations, i.e. a little bit in Large Caps, a little bit in Small Cap and a little bit in Mid Cap Funds"
            Funds={this.state.EquityFlexiCapFunds}
          />
          <ListDropDown
            Title="Short Term Duration Debt Funds"
            Type="Mutual Fund"
            Description="Short Term Duration Debt Funds invest in debt and money market securities such that the duration of the fund portfolio lies between 1 to 3 years and the source of income is through interest and capital gains of the holdings."
            Funds={this.state.ShortTermDurationDebtFunds}
          />
          <ListDropDown
            Title="Medium Term Duration Debt Funds"
            Type="Mutual Fund"
            Description="Medium Term Duration Debt Funds invest in debt and money market securities such that the duration of the fund portfolio lies between 3 to 5 years and the source of income is through interest and capital gains of the holdings."
            Funds={this.state.MediumTermDurationDebtFunds}
          />
          <ListDropDown
            Title="Long Term Duration Debt Funds"
            Type="Mutual Fund"
            Description="Long Term Duration Debt Funds invest in debt and money market securities such that the duration of the fund portfolio is more than 7 years and the source of income is through interest and capital gains of the holdings."
            Funds={this.state.LongTermDurationDebtFunds}
          />
          <ListDropDown
            Title="Multi Asset Allocation Hybrid Funds"
            Type="Mutual Fund"
            Description="Multi Asset Allocation Funds are hybrid funds that must invest a minimum of 10% in at least 3 asset classes. These funds typically have a combination of equity, debt, and one more asset class like gold, real estate, etc."
            Funds={this.state.MultiAssetAllocationHybridFunds}
          />
          <ListDropDown
            Title="Index Funds"
            Type="Mutual Fund"
            Description="Index funds are passively managed mutual funds that try to duplicate the performance of a financial index, like the Nifty50 or the Sensex."
            Funds={this.state.IndexFund}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  FundRankingBackground: {
    backgroundColor: "#010312",
    justifyContent: "flex-start",
    flex: 1,
    flexDirection: "column",
  },
  FundRankingHeader: {
    flexDirection: "row",
    marginTop: 75 / pixelratio,
    marginBottom: 100 / pixelratio,
    marginLeft: 50 / pixelratio,
    alignItems: "center",
  },
  FundRankingTextHeader: {
    color: "#ffffff",
    fontWeight: "bold",
    fontFamily: "Trebuchet",
    fontSize: 50 / pixelratio,
    marginLeft: 25 / pixelratio,
  },
});
