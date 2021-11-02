import React from "react";
import {
  StyleSheet,
  View,
  PixelRatio,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ComparisonFields from "../../Parts/ComparisonFields/ComparisonFields";

const pixelratio = PixelRatio.get();

export default class FundComparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FundsSearched: [
        "Parag Parikh Flexi Cap Fund",
        "ICICI Prudential Bluechip Fund",
      ],
      NAV: ["₹ 54.07 ( -0.47% )", "₹ 71.95 ( -0.30% )"],
      MinimumInvestmentAmount: ["₹ 1000.00", "₹ 100.00"],
      Type: ["Equity", "Equity"],
      OpenClose: ["Open Ended", "Open Ended"],
      ExitLoad: ["2 %", "1 %"],
      CAGR3: ["13.15%", "14.50%"],
      CAGR6: ["31.92%", "27.82%"],
      CAGR12: ["62.86%", "57.54%"],
      ExpensesRatio: ["0.85", "1.09"],
      SearchedValue: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.FundHandler = this.FundHandler.bind(this);
    this.RemoveFund = this.RemoveFund.bind(this);
  }

  handleClick(ClickedItem) {
    if (ClickedItem === "Back") {
      this.props.navigation.goBack();
    }
    console.log(ClickedItem);
  }

  FundHandler() {
    let FundsSearched = this.state.FundsSearched;
    FundsSearched.push(this.state.SearchedValue);
    if (FundsSearched.includes("")) {
      let indexval = FundsSearched.indexOf("");
      FundsSearched.splice(indexval, 1);
    }
    if (FundsSearched.length == 3) {
      FundsSearched.shift(1);
    }
    console.log(FundsSearched);
    this.setState({ FundsSearched: FundsSearched, SearchedValue: "" });
  }

  RemoveFund(Fund) {
    let index = this.state.FundsSearched.indexOf(Fund);
    let FundsSearched = this.state.FundsSearched;
    let NAV = this.state.NAV;
    let MinimumInvestmentAmount = this.state.MinimumInvestmentAmount;
    let Type = this.state.Type;
    let OpenClose = this.state.OpenClose;
    let ExitLoad = this.state.ExitLoad;
    let CAGR3 = this.state.CAGR3;
    let CAGR6 = this.state.CAGR6;
    let CAGR12 = this.state.CAGR12;
    let ExpensesRatio = this.state.ExpensesRatio;

    if (index === 1) {
      FundsSearched.pop();
      NAV.pop();
      MinimumInvestmentAmount.pop();
      Type.pop();
      OpenClose.pop();
      ExitLoad.pop();
      CAGR3.pop();
      CAGR6.pop();
      CAGR12.pop();
      ExpensesRatio.pop();
    }
    if (index === 0) {
      FundsSearched.shift(1);
      NAV.shift(1);
      MinimumInvestmentAmount.shift(1);
      Type.shift(1);
      OpenClose.shift(1);
      ExitLoad.shift(1);
      CAGR3.shift(1);
      CAGR6.shift(1);
      CAGR12.shift(1);
      ExpensesRatio.shift(1);
    }
    FundsSearched.push("");
    NAV.push("");
    MinimumInvestmentAmount.push("");
    Type.push("");
    OpenClose.push("");
    ExitLoad.push("");
    CAGR3.push("");
    CAGR6.push("");
    CAGR12.push("");
    ExpensesRatio.push("");

    this.setState({
      FundsSearched: FundsSearched,
      NAV: NAV,
      MinimumInvestmentAmount: MinimumInvestmentAmount,
      Type: Type,
      OpenClose: OpenClose,
      ExitLoad: ExitLoad,
      CAGR3: CAGR3,
      CAGR6: CAGR6,
      CAGR12: CAGR12,
      ExpensesRatio: ExpensesRatio,
    });
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.FundComparisonBackground}>
        <StatusBar barStyle="light-content" backgroundColor="#010312" />
        <TouchableOpacity
          style={styles.FundComparisonHeader}
          onPress={() => this.handleClick("Back")}
        >
          <Ionicons name="arrow-back" size={50 / pixelratio} color={"white"} />
          <Text style={styles.FundComparisonTextHeader}>Fund Comparison</Text>
        </TouchableOpacity>
        <View style={styles.FundComparisonInputField}>
          <TextInput
            placeholder="Search a Fund"
            placeholderTextColor="#b2b2b2"
            autoCapitalize={"characters"}
            style={{
              color: "white",
              fontSize: 45 / pixelratio,
              paddingVertical: 10 / pixelratio,
              flex: 1,
              fontFamily: "Trebuchet",
              textAlign: "center",
            }}
            onChangeText={(SearchedValue) =>
              this.setState({ SearchedValue: SearchedValue })
            }
            onBlur={() => this.FundHandler()}
          />
        </View>
        {(() => {
          if (this.state.FundsSearched.length == 0) {
            return <View></View>;
          } else {
            return (
              <ScrollView>
                <ComparisonFields
                  Factor="Fund"
                  Item1={this.state.FundsSearched[0]}
                  Item2={this.state.FundsSearched[1]}
                  RemoveFund={this.RemoveFund}
                />
                <ComparisonFields
                  Factor="NAV"
                  Item1={this.state.NAV[0]}
                  Item2={this.state.NAV[1]}
                />
                <ComparisonFields
                  Factor="Minimum Investment Amount"
                  Item1={this.state.MinimumInvestmentAmount[0]}
                  Item2={this.state.MinimumInvestmentAmount[1]}
                />
                <ComparisonFields
                  Factor="Type"
                  Item1={this.state.Type[0]}
                  Item2={this.state.Type[1]}
                />
                <ComparisonFields
                  Factor="Open / Close"
                  Item1={this.state.OpenClose[0]}
                  Item2={this.state.OpenClose[1]}
                />
                <ComparisonFields
                  Factor="ExitLoad"
                  Item1={this.state.ExitLoad[0]}
                  Item2={this.state.ExitLoad[1]}
                />
                <ComparisonFields
                  Factor="CAGR (3 Months)"
                  Item1={this.state.CAGR3[0]}
                  Item2={this.state.CAGR3[1]}
                />
                <ComparisonFields
                  Factor="CAGR (6 Months)"
                  Item1={this.state.CAGR6[0]}
                  Item2={this.state.CAGR6[1]}
                />
                <ComparisonFields
                  Factor="CAGR (12 Months)"
                  Item1={this.state.CAGR12[0]}
                  Item2={this.state.CAGR12[1]}
                />
                <ComparisonFields
                  Factor="Expense Ratio"
                  Item1={this.state.ExpensesRatio[0]}
                  Item2={this.state.ExpensesRatio[1]}
                />
              </ScrollView>
            );
          }
        })()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  FundComparisonBackground: {
    backgroundColor: "#010312",
    justifyContent: "flex-start",
    flex: 1,
    flexDirection: "column",
  },
  FundComparisonHeader: {
    flexDirection: "row",
    marginTop: 75 / pixelratio,
    marginBottom: 100 / pixelratio,
    marginLeft: 50 / pixelratio,
    alignItems: "center",
  },
  FundComparisonTextHeader: {
    color: "#ffffff",
    fontWeight: "bold",
    fontFamily: "Trebuchet",
    fontSize: 50 / pixelratio,
    marginLeft: 25 / pixelratio,
  },
  FundComparisonInputField: {
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
    marginBottom: 50 / pixelratio,
  },
});
