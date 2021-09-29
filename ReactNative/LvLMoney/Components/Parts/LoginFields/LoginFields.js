import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  PixelRatio,
  View,
  TextInput,
  TouchableHighlight,
  Linking,
} from "react-native";

const pixelratio = PixelRatio.get();

export default class LoginFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Input1: "",
      Input2: "",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handlePress(this.state.Input1, this.state.Input2);
  }

  accountSwitch() {
    this.props.goBack();
  }

  render() {
    return (
      <View>
        <View style={styles.LoginPageImageParent}>
          <Image source={this.props.image} style={styles.LoginPageImage} />
        </View>
        <Text style={styles.LoginHeadingText}>{this.props.headingtext}</Text>
        {(() => {
          if (this.props.field1_type == "default") {
            return (
              <TextInput
                placeholder={this.props.field1_placeholder}
                placeholderTextColor="white"
                keyboardType={this.props.field1_type}
                style={styles.LoginInputField}
                onChangeText={(Input1) => this.setState({ Input1 })}
              />
            );
          } else if (this.props.field1_type == "UserDetail") {
            return (
              <Text style={styles.LoginUserText}>
                {this.props.field1_placeholder}
              </Text>
            );
          }
        })()}
        {(() => {
          if (this.props.field2_placeholder == "Password") {
            return (
              <TextInput
                placeholder={this.props.field2_placeholder}
                placeholderTextColor="white"
                keyboardType="default"
                style={styles.LoginInputField}
                secureTextEntry={true}
                onChangeText={(Input2) => this.setState({ Input2 })}
              />
            );
          } else if (this.props.field2_placeholder == "TOTP") {
            return (
              <TextInput
                placeholder={this.props.field2_placeholder}
                placeholderTextColor="white"
                keyboardType={this.props.field2_type}
                style={styles.LoginInputField}
                onChangeText={(Input2) => this.setState({ Input2 })}
              />
            );
          }
        })()}
        <TouchableHighlight
          style={styles.LoginButton}
          onPress={() => this.handleClick()}
          underlayColor="#007AFF"
        >
          <Text style={styles.LoginButtonText}>{this.props.button_text}</Text>
        </TouchableHighlight>
        {(() => {
          if (this.props.link1_text == "New User? Sign Up Here") {
            return (
              <TouchableHighlight
                style={styles.LoginExternalLink}
                onPress={() => Linking.openURL(this.props.link1_link)}
              >
                <Text style={styles.LoginExternalLinkText}>
                  {this.props.link1_text}
                </Text>
              </TouchableHighlight>
            );
          } else if (this.props.link1_text == "Use Another Account") {
            return (
              <TouchableHighlight
                style={styles.LoginExternalLink}
                onPress={() => this.accountSwitch()}
              >
                <Text style={styles.LoginExternalLinkText}>
                  {this.props.link1_text}
                </Text>
              </TouchableHighlight>
            );
          }
        })()}
        <TouchableHighlight
          style={styles.LoginExternalLink}
          onPress={() => Linking.openURL(this.props.link2_link)}
        >
          <Text style={styles.LoginExternalLinkText}>
            {this.props.link2_text}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  LoginPageImageParent: {
    backgroundColor: "#010312",
    justifyContent: "center",
    flex: 1,
    marginTop: -100 / pixelratio,
    alignItems: "center",
    width: "100%",
    maxHeight: 250 / pixelratio,
  },
  LoginPageImage: {
    maxWidth: 300 / pixelratio,
    maxHeight: 300 / pixelratio,
    resizeMode: "contain",
  },
  LoginHeadingText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 70 / pixelratio,
    marginTop: 100 / pixelratio,
    marginBottom: 60 / pixelratio,
    textAlign: "center",
    fontFamily: "Trebuchet",
  },
  LoginInputField: {
    width: "100%",
    height: 130 / pixelratio,
    paddingLeft: 50 / pixelratio,
    fontSize: 45 / pixelratio,
    borderRadius: 20 / pixelratio,
    marginBottom: 30 / pixelratio,
    borderWidth: 1,
    borderColor: "#c0c0c0",
    color: "white",
    fontFamily: "Trebuchet",
  },
  LoginButton: {
    width: "100%",
    backgroundColor: "#2196F3",
    height: 100 / pixelratio,
    borderRadius: 10 / pixelratio,
    justifyContent: "center",
    marginTop: 20 / pixelratio,
    marginBottom: 40 / pixelratio,
  },
  LoginButtonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 40 / pixelratio,
    fontFamily: "Trebuchet",
  },
  LoginExternalLink: {
    width: "100%",
    marginBottom: 20 / pixelratio,
    paddingRight: 20 / pixelratio,
    height: 70 / pixelratio,
    alignItems: "flex-end",
  },
  LoginExternalLinkText: {
    textAlign: "right",
    color: "#2196F3",
    fontSize: 40 / pixelratio,
    fontFamily: "Trebuchet",
    marginTop: 20 / pixelratio,
  },
  LoginUserText: {
    color: "white",
    fontSize: 60 / pixelratio,
    fontFamily: "Trebuchet",
    height: 100 / pixelratio,
    width: "100%",
    textAlign: "center",
  },
});
