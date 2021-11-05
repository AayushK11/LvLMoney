import React from "react";
import { StyleSheet, View, PixelRatio, Text, Image } from "react-native";
import LvL_L from "../../Images/Icons/LvL_L.png";
import BoxedItem from "../../Parts/BoxedItem/BoxedItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";

const pixelratio = PixelRatio.get();

export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
    this.removeData = this.removeData.bind(this);
  }

  async removeData() {
    try {
      const value = await AsyncStorage.removeItem("@Username:key").then(() => {
        this.props.navigation.dispatch(StackActions.replace("Login Page"));
      });
    } catch (e) {
      console.log(e);
    }
  }

  handleClick(ClickedItem) {
    if (ClickedItem === "Log Out") {
      this.removeData();
    }
  }

  render() {
    return (
      <View style={styles.AccountBackground}>
        <View style={styles.AccountBox1}>
          <View style={{ flex: 3 }}>
            <Text style={styles.AccountHeading}>Account</Text>
            <Text style={styles.AccountName}>Aayush Kumaria (AayushK11)</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Image source={LvL_L} style={styles.AccountImage} />
          </View>
        </View>
        <BoxedItem Title="Edit Profile" handleClick={this.handleClick} />
        <BoxedItem Title="Support" handleClick={this.handleClick} />
        <BoxedItem Title="Invite Friends" handleClick={this.handleClick} />
        <BoxedItem Title="Log Out" handleClick={this.handleClick} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  AccountBackground: {
    backgroundColor: "#010312",
    justifyContent: "flex-start",
    flex: 1,
    flexDirection: "column",
  },
  AccountBox1: {
    flexDirection: "row",
    backgroundColor: "#2F313D",
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
  },
  AccountHeading: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 50 / pixelratio,
    textAlign: "left",
    paddingRight: 20,
    fontFamily: "Trebuchet",
  },
  AccountName: {
    color: "#ffffff",
    fontSize: 40 / pixelratio,
    marginTop: 40 / pixelratio,
    marginStart: 15 / pixelratio,
    textAlign: "left",
    fontFamily: "Trebuchet",
  },
  AccountImage: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
  },
});
