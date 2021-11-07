import React from "react";
import {
  StyleSheet,
  View,
  PixelRatio,
  Text,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import LvL_L from "../../Images/Icons/LvL_L.png";
import BoxedItem from "../../Parts/BoxedItem/BoxedItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";

const pixelratio = PixelRatio.get();

export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Username: "" };
    this.handleClick = this.handleClick.bind(this);
    this.removeData = this.removeData.bind(this);
    this.readData = this.readData.bind(this);
  }

  componentDidMount() {
    this.readData();
  }

  async readData() {
    try {
      const value = await AsyncStorage.getItem("@Username:key");
      this.setState({ Username: value });
    } catch (e) {
      console.log(e);
    }
  }

  async removeData() {
    try {
      await AsyncStorage.removeItem("@Username:key").then(() => {
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
    if (ClickedItem === "Support") {
      Linking.openURL("https://lvlmoney.netlify.app/faq");
    }
  }

  render() {
    return (
      <View style={styles.AccountBackground}>
        {(() => {
          if (this.state.Username !== null) {
            return (
              <View style={styles.AccountBox1}>
                <View style={{ flex: 3 }}>
                  <Text style={styles.AccountHeading}>Account</Text>
                  <Text style={styles.AccountName}>
                    Aayush Kumaria ({this.state.Username})
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Image source={LvL_L} style={styles.AccountImage} />
                </View>
              </View>
            );
          } else {
            return (
              <TouchableOpacity
                style={styles.AccountBox1}
                onPress={() => {
                  this.props.navigation.push("Login Page");
                }}
              >
                <View style={{ flex: 3 }}>
                  <Text style={styles.AccountHeading}>Account</Text>
                  <Text style={styles.AccountName}>Not Logged In...Yet</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Image source={LvL_L} style={styles.AccountImage} />
                </View>
              </TouchableOpacity>
            );
          }
        })()}

        {(() => {
          if (this.state.Username !== null) {
            return (
              <BoxedItem Title="Edit Profile" handleClick={this.handleClick} />
            );
          }
        })()}
        <BoxedItem Title="Support" handleClick={this.handleClick} />
        <BoxedItem Title="Invite Friends" handleClick={this.handleClick} />
        {(() => {
          if (this.state.Username !== null) {
            return <BoxedItem Title="Log Out" handleClick={this.handleClick} />;
          }
        })()}
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
