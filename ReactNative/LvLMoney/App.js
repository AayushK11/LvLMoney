import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import SplashScreen from "./Components/Pages/Splash Screen/SplashScreen";
import LoginPage from "./Components/Pages/Login Page/LoginPage";
import HomePage from "./Components/Pages/Home Page/HomePage";
import Forecasting from "./Components/Pages/Forecasting/Forecasting";
import MarketSentiment from "./Components/Pages/MarketSentiment/MarketSentiment";
import SectorWiseRanking from "./Components/Pages/SectorWiseRanking/SectorWiseRanking";
import TradingStrategies from "./Components/Pages/TradingStrategies/TradingStrategies";
import ReturnsCalculator from "./Components/Pages/ReturnsCalculator/ReturnsCalculator";
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
          <Stack.Screen
            name="Home Page"
            component={HomePage}
            options={TransitionScreenOptions}
          />
          <Stack.Screen
            name="Forecasting"
            component={Forecasting}
            options={TransitionScreenOptions}
          />
          <Stack.Screen
            name="Market Sentiment Analysis"
            component={MarketSentiment}
            options={TransitionScreenOptions}
          />
          <Stack.Screen
            name="Sector Wise Ranking"
            component={SectorWiseRanking}
            options={TransitionScreenOptions}
          />
          <Stack.Screen
            name="Trading Strategies"
            component={TradingStrategies}
            options={TransitionScreenOptions}
          />
          <Stack.Screen
            name="Returns Calculator"
            component={ReturnsCalculator}
            options={TransitionScreenOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
