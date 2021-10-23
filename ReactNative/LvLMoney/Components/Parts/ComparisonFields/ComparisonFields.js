import React from "react";
import {
  StyleSheet,
  Text,
  PixelRatio,
  View,
  TouchableOpacity,
} from "react-native";
const pixelratio = PixelRatio.get();

export default class ComparisonFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          marginHorizontal: 50 / pixelratio,
        }}
      >
        <View style={styles.ComparisonFieldBorder} />
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flex: 2,
              flexDirection: "column",
              borderRightWidth: 1,
              borderLeftWidth: 1,
              borderColor: "white",
              borderHeight: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.ComparisonFieldsFactor}>
              {this.props.Factor}
            </Text>
          </View>
          <View
            style={{
              flex: 3,
              flexDirection: "column",
              borderRightWidth: 1,
              borderColor: "white",
              borderHeight: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {(() => {
              if (this.props.Factor === "Fund") {
                return (
                  <TouchableOpacity
                    onPress={() => this.props.RemoveFund(this.props.Item1)}
                  >
                    <Text style={styles.ComparisonFieldsText}>
                      {this.props.Item1}
                    </Text>
                  </TouchableOpacity>
                );
              } else if (
                this.props.Factor === "CAGR (3 Months)" ||
                this.props.Factor === "CAGR (6 Months)" ||
                this.props.Factor === "CAGR (12 Months)"
              ) {
                if (parseFloat(this.props.Item1.replace("%", "")) > 0) {
                  return (
                    <Text style={styles.ComparisonFieldsTextPositive}>
                      {this.props.Item1}
                    </Text>
                  );
                } else {
                  return (
                    <Text style={styles.ComparisonFieldsTextNegative}>
                      {this.props.Item1}
                    </Text>
                  );
                }
              } else if (this.props.Factor === "NAV") {
                if (
                  parseFloat(
                    this.props.Item1.substr(
                      this.props.Item1.indexOf("("),
                      this.props.Item1.indexOf(")")
                    ).replace("%", "")
                  ) > 0
                ) {
                  return (
                    <Text style={styles.ComparisonFieldsTextPositive}>
                      {this.props.Item1}
                    </Text>
                  );
                } else {
                  return (
                    <Text style={styles.ComparisonFieldsTextNegative}>
                      {this.props.Item1}
                    </Text>
                  );
                }
              } else {
                return (
                  <Text style={styles.ComparisonFieldsText}>
                    {this.props.Item1}
                  </Text>
                );
              }
            })()}
          </View>
          <View
            style={{
              flex: 3,
              flexDirection: "column",
              borderRightWidth: 1,
              alignItems: "center",
              justifyContent: "center",
              borderColor: "white",
              borderHeight: "100%",
            }}
          >
            {(() => {
              if (this.props.Factor === "Fund") {
                return (
                  <TouchableOpacity
                    onPress={() => this.props.RemoveFund(this.props.Item2)}
                  >
                    <Text style={styles.ComparisonFieldsText}>
                      {this.props.Item2}
                    </Text>
                  </TouchableOpacity>
                );
              } else if (
                this.props.Factor === "CAGR (3 Months)" ||
                this.props.Factor === "CAGR (6 Months)" ||
                this.props.Factor === "CAGR (12 Months)"
              ) {
                if (parseFloat(this.props.Item2.replace("%", "")) > 0) {
                  return (
                    <Text style={styles.ComparisonFieldsTextPositive}>
                      {this.props.Item2}
                    </Text>
                  );
                } else {
                  return (
                    <Text style={styles.ComparisonFieldsTextNegative}>
                      {this.props.Item2}
                    </Text>
                  );
                }
              } else if (this.props.Factor === "NAV") {
                if (
                  parseFloat(
                    this.props.Item1.substr(
                      this.props.Item1.indexOf("("),
                      this.props.Item1.indexOf(")")
                    ).replace("%", "")
                  ) > 0
                ) {
                  return (
                    <Text style={styles.ComparisonFieldsTextPositive}>
                      {this.props.Item1}
                    </Text>
                  );
                } else {
                  return (
                    <Text style={styles.ComparisonFieldsTextNegative}>
                      {this.props.Item1}
                    </Text>
                  );
                }
              } else {
                return (
                  <Text style={styles.ComparisonFieldsText}>
                    {this.props.Item2}
                  </Text>
                );
              }
            })()}
          </View>
        </View>
        <View style={styles.ComparisonFieldBorder} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ComparisonFieldsFactor: {
    color: "#ffffff",
    fontWeight: "bold",
    fontFamily: "Trebuchet",
    fontSize: 35 / pixelratio,
    marginVertical: 25 / pixelratio,
    textAlign: "center",
  },
  ComparisonFieldsText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontFamily: "Trebuchet",
    fontSize: 40 / pixelratio,
    marginVertical: 25 / pixelratio,
    textAlign: "center",
  },
  ComparisonFieldsTextPositive: {
    color: "green",
    fontWeight: "bold",
    fontFamily: "Trebuchet",
    fontSize: 40 / pixelratio,
    marginVertical: 25 / pixelratio,
    textAlign: "center",
  },
  ComparisonFieldsTextNegative: {
    color: "red",
    fontWeight: "bold",
    fontFamily: "Trebuchet",
    fontSize: 40 / pixelratio,
    marginVertical: 25 / pixelratio,
    textAlign: "center",
  },
  ComparisonFieldBorder: { borderBottomColor: "white", borderBottomWidth: 1 },
});
