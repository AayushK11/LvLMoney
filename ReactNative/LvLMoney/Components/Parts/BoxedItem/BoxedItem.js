import React from "react";
import {
  StyleSheet,
  Text,
  PixelRatio,
  View,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";

const pixelratio = PixelRatio.get();

export default class BoxedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getIcon = this.getIcon.bind(this);
  }

  getIcon(Title) {
    if (Title === "Log Out") {
      return (
        <MaterialCommunityIcons name="exit-run" style={styles.AccountIcon} />
      );
    }
    if (Title === "Invite Friends") {
      return <MaterialIcons name="person-add" style={styles.AccountIcon} />;
    }
    if (Title === "Support") {
      return <Feather name="info" style={styles.AccountIcon} />;
    }
    if (Title === "Edit Profile") {
      return <Feather name="edit" style={styles.AccountIcon} />;
    }
    if (Title === "Financial Breakdown") {
      return (
        <MaterialCommunityIcons name="call-split" style={styles.AccountIcon} />
      );
    }
    if (Title === "Tax Calculator") {
      return (
        <MaterialCommunityIcons name="calculator" style={styles.AccountIcon} />
      );
    }
    if (Title === "Blogs") {
      return <FontAwesome5 name="blog" style={styles.AccountIcon} />;
    }
    if (Title === "Returns Calculator") {
      return <FontAwesome name="money" style={styles.AccountIcon} />;
    }
    if (Title === "Risk Profile Test") {
      return <AntDesign name="profile" style={styles.AccountIcon} />;
    }
    if (Title === "Fund Rankings") {
      return <FontAwesome5 name="medal" style={styles.AccountIcon} />;
    }
    if (Title === "Fund Comparison") {
      return (
        <MaterialCommunityIcons name="ab-testing" style={styles.AccountIcon} />
      );
    }
    if (Title === "Forecasting") {
      return (
        <MaterialCommunityIcons name="code-braces" style={styles.AccountIcon} />
      );
    }
    if (Title === "Market Sentiment Analysis") {
      return (
        <MaterialIcons
          name="sentiment-very-satisfied"
          style={styles.AccountIcon}
        />
      );
    }
    if (Title === "Sector Wise Ranking") {
      return <FontAwesome5 name="medal" style={styles.AccountIcon} />;
    }
    if (Title === "Trading Strategies") {
      return (
        <MaterialCommunityIcons name="ab-testing" style={styles.AccountIcon} />
      );
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.props.handleClick(this.props.Title);
          }}
        >
          <View style={styles.AccountBox2}>
            <View style={{ flex: 3, justifyContent: "center" }}>
              <Text style={styles.AccountHeading}>{this.props.Title}</Text>
            </View>
            <View style={{ flex: 1, width: "100%" }}>
              {this.getIcon(this.props.Title)}
            </View>
          </View>
        </TouchableOpacity>
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
  AccountHeading: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 50 / pixelratio,
    textAlign: "left",
    paddingRight: 20,
    fontFamily: "Trebuchet",
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
    fontFamily: "Trebuchet",
    fontWeight: "bold",
    fontSize: 80 / pixelratio,
    textAlign: "center",
    width: "100%",
  },
});
