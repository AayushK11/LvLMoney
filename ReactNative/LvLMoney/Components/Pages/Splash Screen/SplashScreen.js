import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  PixelRatio,
  Animated,
} from "react-native";
import LvL_L from "../../Images/Icons/LvL_L.png";
import { StackActions } from "@react-navigation/native";

const pixelratio = PixelRatio.get();

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Progress: 0,
    };
  }

  anim = new Animated.Value(0);

  componentDidMount() {
    let TempProgress = [20, 80, 100, 120];
    interval = setInterval(() => {
      this.onAnimate(TempProgress[0]);
      TempProgress.shift();
      if (TempProgress[0] == 120) {
        window.clearInterval(interval);
        this.changeScreen();
      }
    }, 1000);
  }

  onAnimate(destination) {
    this.anim.addListener(({ value }) => {
      this.setState({ Progress: parseInt(value, 10) });
    });

    Animated.timing(this.anim, {
      toValue: destination,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  changeScreen() {
    setTimeout(() => {
      this.props.navigation.dispatch(StackActions.replace("Login Page"));
    }, 600);
  }

  render() {
    return (
      <View style={styles.SplashScreenBackground}>
        <StatusBar barStyle="light-content" backgroundColor="#010312" />
        <View>
          <Image source={LvL_L} style={styles.SplashScreenImage} />
        </View>
        <View style={styles.SplashScreenProgressBar}>
          <Animated.View
            style={[
              styles.SplashScreenProgressBarInternal,
              { width: this.state.Progress + "%" },
            ]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  SplashScreenBackground: {
    backgroundColor: "#010312",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  SplashScreenImage: {
    marginBottom: 25 * pixelratio,
    maxWidth: 400 / pixelratio,
    maxHeight: 400 / pixelratio,
    resizeMode: "contain",
  },
  SplashScreenProgressBar: {
    height: 4 * pixelratio,
    flexDirection: "row",
    width: "40%",
    backgroundColor: "white",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
  },
  SplashScreenProgressBarInternal: {
    backgroundColor: "#00c9ff",
    borderRadius: 25,
  },
});
