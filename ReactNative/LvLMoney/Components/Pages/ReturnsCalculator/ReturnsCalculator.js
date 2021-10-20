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
import { VictoryPie } from "victory-native";
import { ScrollView } from "react-native-gesture-handler";

const pixelratio = PixelRatio.get();

export default class ReturnsCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      RadioChoice: "Lumpsum",
      Investment: 0,
      RoR: 0,
      Time: 0,
      UseTax: 0,
      OutputDisplay: 0,
      InvestedAmount: 100000,
      EstimatedReturns: 210585,
      TaxedValue: 10000,
      TotalValue: 5808477,
      LongTermCapitalGains: 10000,
      StampDuty: 103944,
      ExpenseRatio: 10000,
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
      <View style={styles.ReturnsCalculatorBackground}>
        <StatusBar barStyle="light-content" backgroundColor="#010312" />
        <ScrollView>
          <TouchableOpacity
            style={styles.ReturnsCalculatorHeader}
            onPress={() => this.handleClick("Back")}
          >
            <Ionicons
              name="arrow-back"
              size={50 / pixelratio}
              color={"white"}
            />
            <Text style={styles.ReturnsCalculatoringTextHeader}>
              Returns Calculator
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
              <View style={styles.ReturnsCalculatorRadioButton}>
                <RadioButton.Android
                  value="Lumpsum"
                  status={
                    this.state.RadioChoice === "Lumpsum"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => this.setState({ RadioChoice: "Lumpsum" })}
                  color={"#00c9ff"}
                  uncheckedColor="#ffffff"
                />
                <TouchableOpacity
                  onPress={() => this.setState({ RadioChoice: "Lumpsum" })}
                >
                  <Text style={styles.ReturnsCalculatorRadioButtonText}>
                    Lumpsum
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.ReturnsCalculatorRadioButton}>
                <RadioButton.Android
                  value="SIP"
                  status={
                    this.state.RadioChoice === "SIP" ? "checked" : "unchecked"
                  }
                  onPress={() => this.setState({ RadioChoice: "SIP" })}
                  color={"#00c9ff"}
                  uncheckedColor="#ffffff"
                />
                <TouchableOpacity
                  onPress={() => this.setState({ RadioChoice: "SIP" })}
                >
                  <Text style={styles.ReturnsCalculatorRadioButtonText}>
                    SIP
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <TextInput
              placeholder={
                this.state.RadioChoice === "Lumpsum"
                  ? "Total Investment in Rs."
                  : "Monthly Investment in Rs."
              }
              placeholderTextColor="#c0c0c0"
              style={styles.ReturnsCalculatorInputField}
              keyboardType={"numeric"}
              onChangeText={(Investment) =>
                this.setState({ Investment: Investment })
              }
            />
            <TextInput
              placeholder={"Time Period in Years"}
              placeholderTextColor="#c0c0c0"
              style={styles.ReturnsCalculatorInputField}
              keyboardType={"numeric"}
              onChangeText={(Time) => this.setState({ Time: Time })}
            />
            <TextInput
              placeholder={"Expected Rate of Return in %"}
              placeholderTextColor="#c0c0c0"
              style={styles.ReturnsCalculatorInputField}
              keyboardType={"numeric"}
              onChangeText={(RoR) => this.setState({ RoR: RoR })}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 100 / pixelratio,
              marginTop: 75 / pixelratio,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View>
              <TouchableHighlight
                style={styles.ReturnsCalculatorButton}
                onPress={() => {
                  if (this.state.OutputDisplay == 0) {
                    this.setState({ OutputDisplay: 1 });
                  } else {
                    this.setState({ OutputDisplay: 0 });
                  }
                }}
                underlayColor="#007AFF"
              >
                <Text style={styles.ReturnsCalculatorButtonText}>
                  Calculate
                </Text>
              </TouchableHighlight>
            </View>
            <View style={styles.ReturnsCalculatorTaxRadioButton}>
              <RadioButton.Android
                value="Minus Tax and Charges"
                status={this.state.UseTax === 1 ? "checked" : "unchecked"}
                onPress={() => {
                  if (this.state.UseTax == 0) {
                    this.setState({ UseTax: 1 });
                  } else {
                    this.setState({ UseTax: 0 });
                  }
                }}
                color={"#00c9ff"}
                uncheckedColor="#ffffff"
              />
              <TouchableOpacity
                onPress={() => {
                  if (this.state.UseTax == 0) {
                    this.setState({ UseTax: 1 });
                  } else {
                    this.setState({ UseTax: 0 });
                  }
                }}
              >
                <Text style={styles.ReturnsCalculatorMinusTaxText}>
                  Minus Tax and Charges
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 100 / pixelratio,
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            {(() => {
              if (this.state.OutputDisplay === 1) {
                return (
                  <View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginHorizontal: 100 / pixelratio,
                        marginTop: 100 / pixelratio,
                      }}
                    >
                      <View flexDirection="column">
                        <Text style={styles.ReturnsCalculatorValue}>
                          Invested Amount
                        </Text>
                        <Text style={styles.ReturnsCalculatorValue}>
                          {this.state.InvestedAmount}
                        </Text>
                      </View>
                      <View flexDirection="column">
                        <Text style={styles.ReturnsCalculatorValue}>
                          Estimated Returns
                        </Text>
                        <Text style={styles.ReturnsCalculatorValue}>
                          {this.state.EstimatedReturns}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginHorizontal: 100 / pixelratio,
                        marginTop: 75 / pixelratio,
                      }}
                    >
                      <View flexDirection="column">
                        <Text style={styles.ReturnsCalculatorValue}>
                          Taxed Amount
                        </Text>
                        <Text style={styles.ReturnsCalculatorValue}>
                          {this.state.TaxedValue}
                        </Text>
                      </View>
                      <View flexDirection="column">
                        <Text style={styles.ReturnsCalculatorValue}>
                          Total Returns
                        </Text>
                        <Text style={styles.ReturnsCalculatorValue}>
                          {this.state.TotalValue}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginHorizontal: 50 / pixelratio,
                        marginTop: 75 / pixelratio,
                        display: this.state.UseTax === 0 ? "none" : "flex",
                      }}
                    >
                      <View flexDirection="column">
                        <Text style={styles.ReturnsCalculatorTaxed}>
                          Capital Gains
                        </Text>
                        <Text style={styles.ReturnsCalculatorTaxed}>
                          {this.state.LongTermCapitalGains}
                        </Text>
                      </View>
                      <View flexDirection="column">
                        <Text style={styles.ReturnsCalculatorTaxed}>
                          Stamp Duty
                        </Text>
                        <Text style={styles.ReturnsCalculatorTaxed}>
                          {this.state.StampDuty}
                        </Text>
                      </View>
                      <View flexDirection="column">
                        <Text style={styles.ReturnsCalculatorTaxed}>
                          Expense Ratio
                        </Text>
                        <Text style={styles.ReturnsCalculatorTaxed}>
                          {this.state.ExpenseRatio}
                        </Text>
                      </View>
                    </View>
                    <VictoryPie
                      data={[
                        {
                          x: "Invested Amount",
                          y: this.state.InvestedAmount,
                        },
                        {
                          x: "Estimated Returns",
                          y: this.state.EstimatedReturns,
                        },
                        {
                          x: "Taxed Amount",
                          y: this.state.TaxedValue,
                        },
                      ]}
                      innerRadius={50 / pixelratio}
                      width={1000 / pixelratio}
                      height={1000 / pixelratio}
                      labelRadius={({ innerRadius }) =>
                        innerRadius + 150 / pixelratio
                      }
                      colorScale={["purple", "green", "red"]}
                      style={{
                        labels: {
                          fill: "white",
                          fontSize: 30 / pixelratio,
                        },
                      }}
                    />
                  </View>
                );
              }
            })()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ReturnsCalculatorBackground: {
    backgroundColor: "#010312",
    justifyContent: "flex-start",
    flex: 1,
    flexDirection: "column",
  },
  ReturnsCalculatorHeader: {
    flexDirection: "row",
    marginTop: 75 / pixelratio,
    marginBottom: 100 / pixelratio,
    marginLeft: 50 / pixelratio,
    alignItems: "center",
  },
  ReturnsCalculatoringTextHeader: {
    color: "#ffffff",
    // fontFamily: "Trebuchet",
    fontWeight: "bold",
    fontSize: 50 / pixelratio,
    marginLeft: 25 / pixelratio,
  },
  ReturnsCalculatorRadioButton: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderColor: "#00c9ff",
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 25 / pixelratio,
  },
  ReturnsCalculatorRadioButtonText: {
    color: "#ffffff",
    // fontFamily: "Trebuchet",
    fontWeight: "bold",
    fontSize: 40 / pixelratio,
    marginLeft: 20 / pixelratio,
    marginRight: 40 / pixelratio,
    marginVertical: 20 / pixelratio,
  },
  ReturnsCalculatorInputField: {
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
  ReturnsCalculatorButton: {
    backgroundColor: "#2196F3",
    height: 100 / pixelratio,
    borderRadius: 10 / pixelratio,
    justifyContent: "center",
    marginVertical: 20 / pixelratio,
  },
  ReturnsCalculatorButtonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 35 / pixelratio,
    // fontFamily: "Trebuchet",
    marginHorizontal: 20 / pixelratio,
  },
  ReturnsCalculatorMinusTaxText: {
    color: "#ffffff",
    // fontFamily: "Trebuchet",
    fontWeight: "bold",
    fontSize: 30 / pixelratio,
    marginLeft: 20 / pixelratio,
    marginRight: 40 / pixelratio,
  },
  ReturnsCalculatorTaxRadioButton: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderColor: "#00c9ff",
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 25 / pixelratio,
    height: 100 / pixelratio,
  },
  ReturnsCalculatorValue: {
    color: "#ffffff",
    // fontFamily: "Trebuchet",
    fontWeight: "bold",
    fontSize: 40 / pixelratio,
    textAlign: "center",
    marginVertical: 20 / pixelratio,
  },
  ReturnsCalculatorTaxed: {
    color: "#ffffff",
    // fontFamily: "Trebuchet",
    fontSize: 40 / pixelratio,
    textAlign: "center",
    marginTop: 20 / pixelratio,
  },
});
