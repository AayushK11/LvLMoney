import React from "react";
import { StyleSheet, View, PixelRatio, Text } from "react-native";

const pixelratio = PixelRatio.get();

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.ProfileBackground}>
        <Text style={{ backgroundColor: "red" }}>Test Text</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ProfileBackground: {
    backgroundColor: "#010312",
    justifyContent: "flex-start",
    flex: 1,
  },
});
