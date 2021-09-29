import React from "react";
import { StyleSheet, View, StatusBar, PixelRatio } from "react-native";
import LvL_L from "../../Images/Icons/LvL_L.png";
import LoginFields from "../../Parts/LoginFields/LoginFields";
import { StackActions } from "@react-navigation/native";

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
      setTimeout(() => {
        this.props.navigation.dispatch(StackActions.replace("Home Page"));
      }, 600);
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
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
