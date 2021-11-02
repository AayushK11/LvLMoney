import React from "react";
import {
  StyleSheet,
  View,
  PixelRatio,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RadioButton } from "react-native-paper";
import NameValue from "../../Parts/NameValue/NameValue";
import { ScrollView } from "react-native-gesture-handler";

const pixelratio = PixelRatio.get();

export default class FinancialBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      RadioChoice: "Monthly",
      FixedIncome: 471000,
      Tax: 0,
      Rent: 2500,
      Food: 3600,
      Transportation: 2000,
      Networking: 1200,
      Electricity: 500,
      ConsumerProducts: 1200,
      Sip: 4852.18,
      Stocks: 2426.09,
      EmergencyFund: 3639.14,
      TaxSavingFund: 1213.05,
      Entertainment: 1285.03,
      LiquidFunds: 1285.03,
      OutputDisplay: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(ClickedItem) {
    if (ClickedItem === "Back") {
      this.props.navigation.goBack();
    }
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.FinancialBreakdownBackground}>
        <StatusBar barStyle="light-content" backgroundColor="#010312" />
        <ScrollView>
          <TouchableOpacity
            style={styles.FinancialBreakdownHeader}
            onPress={() => this.handleClick("Back")}
          >
            <Ionicons
              name="arrow-back"
              size={50 / pixelratio}
              color={"white"}
            />
            <Text style={styles.FinancialBreakdowningTextHeader}>
              Financial Breakdown
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-around",
                marginHorizontal: 100 / pixelratio,
              }}
            >
              <View style={styles.FinancialBreakdownRadioButton}>
                <RadioButton.Android
                  value="Monthly"
                  status={
                    this.state.RadioChoice === "Monthly"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => this.setState({ RadioChoice: "Monthly" })}
                  color={"#00c9ff"}
                  uncheckedColor="#ffffff"
                />
                <TouchableOpacity
                  onPress={() => this.setState({ RadioChoice: "Monthly" })}
                >
                  <Text style={styles.FinancialBreakdownRadioButtonText}>
                    Monthly
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.FinancialBreakdownRadioButton}>
                <RadioButton.Android
                  value="Annual"
                  status={
                    this.state.RadioChoice === "Annual"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => this.setState({ RadioChoice: "Annual" })}
                  color={"#00c9ff"}
                  uncheckedColor="#ffffff"
                />
                <TouchableOpacity
                  onPress={() => this.setState({ RadioChoice: "Annual" })}
                >
                  <Text style={styles.FinancialBreakdownRadioButtonText}>
                    Annual
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <TextInput
              placeholder={
                this.state.RadioChoice === "Monthly"
                  ? "Monthly Fixed Income in Rs."
                  : "Annual Fixed Income in Rs."
              }
              placeholderTextColor="#c0c0c0"
              style={styles.FinancialBreakdownInputField}
              keyboardType={"numeric"}
              onChangeText={(FixedIncome) =>
                this.setState({ FixedIncome: FixedIncome })
              }
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 150 / pixelratio,
              marginTop: 75 / pixelratio,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableHighlight
              style={styles.FinancialBreakdownButton}
              onPress={() => {
                if (this.state.OutputDisplay == 0) {
                  this.setState({ OutputDisplay: 1 });
                } else {
                  this.setState({ OutputDisplay: 0 });
                }
              }}
              underlayColor="#007AFF"
            >
              <Text style={styles.FinancialBreakdownButtonText}>Calculate</Text>
            </TouchableHighlight>
          </View>
          {(() => {
            if (this.state.OutputDisplay === 1) {
              return (
                <View
                  style={{
                    marginHorizontal: 50 / pixelratio,
                  }}
                >
                  <View>
                    <Text style={styles.FinancialBreakdownText}>Income</Text>
                    <NameValue
                      Name="Fixed Income"
                      Value={this.state.FixedIncome}
                      Type="Positive"
                    />
                    <NameValue
                      Name="Income Tax"
                      Value={this.state.Tax}
                      Type="Negative"
                    />
                  </View>
                  <View>
                    <Text style={styles.FinancialBreakdownText}>
                      Necessities
                    </Text>
                    <NameValue
                      Name="Rent"
                      Value={this.state.Rent}
                      Type="Negative"
                    />
                    <NameValue
                      Name="Food"
                      Value={this.state.Food}
                      Type="Negative"
                    />
                    <NameValue
                      Name="Transportation"
                      Value={this.state.Transportation}
                      Type="Negative"
                    />
                    <NameValue
                      Name="Networking"
                      Value={this.state.Networking}
                      Type="Negative"
                    />
                    <NameValue
                      Name="Electricity"
                      Value={this.state.Electricity}
                      Type="Negative"
                    />
                    <NameValue
                      Name="Consumer Products"
                      Value={this.state.ConsumerProducts}
                      Type="Negative"
                    />
                  </View>
                  <View>
                    <Text style={styles.FinancialBreakdownText}>
                      Investments
                    </Text>
                    <NameValue
                      Name="SIPs / Mutual Funds"
                      Value={this.state.Sip}
                      Type="Positive"
                    />
                    <NameValue
                      Name="Stocks"
                      Value={this.state.Stocks}
                      Type="Positive"
                    />
                    <NameValue
                      Name="Emergency Fund (FD / RD)"
                      Value={this.state.EmergencyFund}
                      Type="Positive"
                    />
                    <NameValue
                      Name="Tax Saving Fund (PFs)"
                      Value={this.state.TaxSavingFund}
                      Type="Positive"
                    />
                  </View>
                  <View>
                    <Text style={styles.FinancialBreakdownText}>
                      Expenditure
                    </Text>
                    <NameValue
                      Name="Personal Fund"
                      Value={this.state.Entertainment}
                      Type="Negative"
                    />
                    <NameValue
                      Name="Liquid Funds"
                      Value={this.state.LiquidFunds}
                      Type="Positive"
                    />
                  </View>
                </View>
              );
            }
          })()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  FinancialBreakdownBackground: {
    backgroundColor: "#010312",
    justifyContent: "flex-start",
    flex: 1,
    flexDirection: "column",
  },
  FinancialBreakdownHeader: {
    flexDirection: "row",
    marginTop: 75 / pixelratio,
    marginBottom: 100 / pixelratio,
    marginLeft: 50 / pixelratio,
    alignItems: "center",
  },
  FinancialBreakdowningTextHeader: {
    color: "#ffffff",
    // fontFamily: "Trebuchet",
    fontWeight: "bold",
    fontSize: 50 / pixelratio,
    marginLeft: 25 / pixelratio,
  },
  FinancialBreakdownRadioButton: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderColor: "#00c9ff",
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 25 / pixelratio,
  },
  FinancialBreakdownRadioButtonText: {
    color: "#ffffff",
    // fontFamily: "Trebuchet",
    fontWeight: "bold",
    fontSize: 40 / pixelratio,
    marginLeft: 20 / pixelratio,
    marginRight: 40 / pixelratio,
    marginVertical: 20 / pixelratio,
  },
  FinancialBreakdownInputField: {
    marginTop: 75 / pixelratio,
    marginHorizontal: 100 / pixelratio,
    height: 130 / pixelratio,
    paddingLeft: 50 / pixelratio,
    fontSize: 45 / pixelratio,
    borderRadius: 20 / pixelratio,
    borderWidth: 1,
    borderColor: "#c0c0c0",
    color: "white",
    // fontFamily: "Trebuchet",
  },
  FinancialBreakdownButton: {
    backgroundColor: "#2196F3",
    width: "100%",
    height: 100 / pixelratio,
    borderRadius: 10 / pixelratio,
    justifyContent: "center",
    marginVertical: 20 / pixelratio,
  },
  FinancialBreakdownButtonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 35 / pixelratio,
    // fontFamily: "Trebuchet",
    marginHorizontal: 20 / pixelratio,
  },
  FinancialBreakdownText: {
    color: "#ffffff",
    fontWeight: "bold",
    // fontFamily: "Trebuchet",
    fontSize: 40 / pixelratio,
    marginHorizontal: 50 / pixelratio,
    marginTop: 70 / pixelratio,
    marginBottom: 30 / pixelratio,
  },
});
