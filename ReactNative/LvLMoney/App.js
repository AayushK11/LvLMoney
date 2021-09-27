import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import SplashScreen from "./Components/Pages/Splash Screen/SplashScreen";
import LoginPage from "./Components/Pages/Login Page/LoginPage";
import * as Font from "expo-font";

const Stack = createStackNavigator();
const TransitionScreenOptions = { ...TransitionPresets.SlideFromRightIOS };

export default class App extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      Trebuchet: require("./assets/fonts/Trebuchet.ttf"),
    });
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash Screen"
          screenOptions={{
            headerShown: false,
            bottom: "never",
          }}
        >
          <Stack.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={TransitionScreenOptions}
          />
          <Stack.Screen
            name="Login Page"
            component={LoginPage}
            options={TransitionScreenOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
