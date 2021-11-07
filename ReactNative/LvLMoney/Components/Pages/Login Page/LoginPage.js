import React from "react";
import { StyleSheet, View, StatusBar, PixelRatio } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LvL_L from "../../Images/Icons/LvL_L.png";
import LoginFields from "../../Parts/LoginFields/LoginFields";
import { StackActions } from "@react-navigation/native";
import Server_Path from "../../Parts/Server/Server";

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
    this.storeData = this.storeData.bind(this);
    this.readData = this.readData.bind(this);
    this.SkipStep = this.SkipStep.bind(this);
  }

  componentDidMount() {
    this.readData();
  }

  SkipStep() {
    this.props.navigation.dispatch(StackActions.replace("Home Page"));
  }

  async readData() {
    try {
      const value = await AsyncStorage.getItem("@Username:key");
      if (value != null) {
        this.props.navigation.dispatch(StackActions.replace("Home Page"));
      }
    } catch (e) {
      console.log(e);
    }
  }

  handleLogin(Input1, Input2) {
    if (this.state.TwoFA == false) {
      fetch(Server_Path.concat("/login/"), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Username: Input1,
          Password: Input2,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json["Status"] == true && json["TwoFA"] == true) {
            this.setState({ Username: Input1, Password: Input2, TwoFA: true });
          } else if (json["Status"] == true && json["TwoFA"] == false) {
            this.setState({ Username: Input1, Password: Input2 });
            this.storeData();
          } else if (json["Status"] == false) {
            alert("Invalid Credentials");
          }
        })
        .catch((error) => {
          alert(error.status);
        });
    }
    if (this.state.TwoFA == true) {
      fetch(Server_Path.concat("/login/"), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Username: this.state.Username,
          Password: this.state.Password,
          TwoFA: Input2,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json["Status"] == true) {
            this.storeData();
          } else if (json["Status"] == false) {
            alert("Invalid TOTP");
          }
        })
        .catch((error) => {
          alert(error.status);
        });
    }
  }

  changeAccount() {
    this.setState({ TwoFA: false });
  }

  storeData() {
    try {
      AsyncStorage.setItem("@Username:key", this.state.Username).then(() => {
        this.props.navigation.dispatch(StackActions.replace("Home Page"));
      });
    } catch (e) {
      console.log(e);
    }
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
                  link3_text="Skip this step?"
                  SkipStep={this.SkipStep}
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
                  field1_placeholder={this.state.Username}
                  field2_type="numeric"
                  field2_placeholder="TOTP"
                  button_text="Authenticate"
                  link1_text="Use Another Account"
                  link1_link=""
                  link2_text="Cannot Authenticate?"
                  link2_link="https://lvlmoney.netlify.app/faq"
                  link3_text="Skip this step?"
                  SkipStep={this.SkipStep}
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
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
