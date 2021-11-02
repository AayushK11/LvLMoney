import React from "react";
import { StyleSheet, View, PixelRatio, Text } from "react-native";
import BoxedItem from "../../Parts/BoxedItem/BoxedItem";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const pixelratio = PixelRatio.get();

export default class PersonalFinance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(ClickedItem) {
    if (ClickedItem === "Financial Breakdown") {
      this.props.navigation.navigate("Financial Breakdown");
    }
    console.log(ClickedItem);
  }

  render() {
    return (
      <View style={styles.PFBackground}>
        <View style={styles.PFBox}>
          <View style={{ flex: 3 }}>
            <Text style={styles.PFHeading}>Personal Finance</Text>
          </View>
          <View style={({ flex: 1 }, styles.PFImage)}>
            <MaterialCommunityIcons
              name="finance"
              size={130 / pixelratio}
              color={"#2196F3"}
            />
          </View>
        </View>
        <BoxedItem Title="Financial Breakdown" handleClick={this.handleClick} />
        <BoxedItem Title="Blogs" handleClick={this.handleClick} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  PFBackground: {
    backgroundColor: "#010312",
    justifyContent: "flex-start",
    flex: 1,
    flexDirection: "column",
  },
  PFBox: {
    flexDirection: "row",
    marginTop: 150 / pixelratio,
    marginStart: 50 / pixelratio,
    marginEnd: 50 / pixelratio,
    marginBottom: 75 / pixelratio,
    paddingStart: 20,
    paddingEnd: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderColor: "white",
    borderWidth: 1,
    alignItems: "center",
  },
  PFImage: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
    marginStart: 50 / pixelratio,
    marginEnd: 50 / pixelratio,
    paddingStart: 20,
    paddingEnd: 10,
    alignItems: "flex-end",
  },
  PFHeading: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 50 / pixelratio,
    textAlign: "left",
    paddingRight: 20,
    fontFamily: "Trebuchet",
  },
});
