import React from "react";
import {
  StyleSheet,
  View,
  PixelRatio,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import LvL_L from "../../Images/Icons/LvL_L.png";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const pixelratio = PixelRatio.get();

export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        <TouchableWithoutFeedback>
          <View style={styles.AccountBox2}>
            <View style={{ flex: 3, justifyContent: "center" }}>
              <Text style={styles.AccountHeading}>Edit Profile</Text>
            </View>
            <View style={{ flex: 1, width: "100%" }}>
              <Feather name="edit" style={styles.AccountIcon} />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            borderBottomColor: "white",
            marginHorizontal: 50 / pixelratio,
            marginVertical: 25 / pixelratio,
            borderBottomWidth: 1,
          }}
        />
        <TouchableWithoutFeedback>
          <View style={styles.AccountBox2}>
            <View style={{ flex: 3, justifyContent: "center" }}>
              <Text style={styles.AccountHeading}>Support</Text>
            </View>
            <View style={{ flex: 1, width: "100%" }}>
              <Feather name="info" style={styles.AccountIcon} />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            borderBottomColor: "white",
            marginHorizontal: 50 / pixelratio,
            marginVertical: 25 / pixelratio,
            borderBottomWidth: 1,
          }}
        />
        <TouchableWithoutFeedback>
          <View style={styles.AccountBox2}>
            <View style={{ flex: 3, justifyContent: "center" }}>
              <Text style={styles.AccountHeading}>Invite Friends</Text>
            </View>
            <View style={{ flex: 1, width: "100%" }}>
              <MaterialIcons name="person-add" style={styles.AccountIcon} />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            borderBottomColor: "white",
            marginHorizontal: 50 / pixelratio,
            marginVertical: 25 / pixelratio,
            borderBottomWidth: 1,
          }}
        />
        <TouchableWithoutFeedback>
          <View style={styles.AccountBox2}>
            <View style={{ flex: 3, justifyContent: "center" }}>
              <Text style={styles.AccountHeading}>Log Out</Text>
            </View>
            <View style={{ flex: 1, width: "100%" }}>
              <MaterialCommunityIcons
                name="exit-run"
                style={styles.AccountIcon}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            borderBottomColor: "white",
            marginHorizontal: 50 / pixelratio,
            marginVertical: 25 / pixelratio,
            borderBottomWidth: 1,
          }}
        />
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
  AccountBox2: {
    flexDirection: "row",
    marginStart: 50 / pixelratio,
    marginEnd: 50 / pixelratio,
    paddingStart: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  AccountIcon: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 80 / pixelratio,
    textAlign: "center",
    width: "100%",
  },
});
