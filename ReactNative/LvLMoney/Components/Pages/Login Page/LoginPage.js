import React from "react";
import { StyleSheet, View, StatusBar, PixelRatio, Text } from "react-native";
import LvL_L from "../../Images/Icons/LvL_L.png";
import LoginFields from "../../Parts/LoginFields/LoginFields";

const pixelratio = PixelRatio.get();

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TwoFA: false,
      Username: "",
      Password: "",
      TwoFACode: "",
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.changeAccount = this.changeAccount.bind(this);
  }

  handleLogin(Input1, Input2) {
    if (this.state.TwoFA == false) {
      // Check Username and if 2FA Enabled
      this.setState({
        Username: Input1,
        Password: Input2,
        TwoFA: true,
      });
    }
    if (this.state.TwoFA == true) {
      this.setState({ TwoFACode: Input2 });
    }
    console.log(this.state);
  }

  changeAccount() {
    this.setState({ TwoFA: false });
  }

  render() {
    return (
      <View style={styles.LoginPageBackground}>
        {(() => {
          if (this.state.TwoFA == false) {
            return (
              <View>
                <StatusBar barStyle="light-content" backgroundColor="#010312" />
                <LoginFields
                  image={LvL_L}
                  headingtext="Welcome to LvLMoney"
                  field1_type="default"
                  field1_placeholder="Username"
                  field2_type="default"
                  field2_placeholder="Password"
                  button_text="Login"
                  link1_text="New User? Sign Up Here"
                  link1_link="https://lvlmoney.netlify.app/signup"
                  link2_text="Forgot Password?"
                  link2_link="https://lvlmoney.netlify.app/forgotpassword"
                  handlePress={this.handleLogin}
                />
                <Text style={styles.LoginPageCopyright}>
                  © LvL Money - 2021
                </Text>
              </View>
            );
          } else if (this.state.TwoFA == true) {
            return (
              <View>
                <StatusBar barStyle="light-content" backgroundColor="#010312" />
                <LoginFields
                  image={LvL_L}
                  headingtext="2 Factor Authentication"
                  field1_type="UserDetail"
                  field1_placeholder="AayushK11"
                  field2_type="numeric"
                  field2_placeholder="TOTP"
                  button_text="Authenticate"
                  link1_text="Use Another Account"
                  link1_link=""
                  link2_text="Cannot Authenticate?"
                  link2_link="https://lvlmoney.netlify.app/support"
                  handlePress={this.handleLogin}
                  goBack={this.changeAccount}
                />
                <Text style={styles.LoginPageCopyright}>
                  © LvL Money - 2021
                </Text>
              </View>
            );
          }
        })()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  LoginPageBackground: {
    backgroundColor: "#010312",
    justifyContent: "flex-start",
    paddingLeft: 125 / pixelratio,
    paddingTop: 250 / pixelratio,
    flex: 1,
  },
  LoginPageCopyright: {
    color: "white",
    position: "absolute",
    bottom: 10 * pixelratio,
    zIndex: 1,
    alignSelf: "center",
    fontSize: 35 / pixelratio,
  },
});
