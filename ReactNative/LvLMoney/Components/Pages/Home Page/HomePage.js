import React from "react";
import { StyleSheet, View, StatusBar, PixelRatio } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Account from "../Account/Account";
import PersonalFinance from "../PersonalFinance/PersonalFinance";
import MutualFunds from "../MutualFunds/MutualFunds";
import Stocks from "../Stocks/Stocks";

const Tab = createBottomTabNavigator();
const pixelratio = PixelRatio.get();

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.HomePageBackground}>
        <StatusBar barStyle="light-content" backgroundColor="#010312" />
        <Tab.Navigator
          initialRouteName="Stocks"
          backBehavior="none"
          screenOptions={{
            tabBarLabelStyle: {
              margin: 10 / pixelratio,
              padding: 0,
            },
            headerShown: false,
            bottom: "never",
            tabBarActiveTintColor: "#2196F3",
            tabBarInactiveTintColor: "#010312",
            tabBarActiveBackgroundColor: "#010312",
            tabBarInactiveBackgroundColor: "#ffffff",
            safeAreaInsets: {
              bottom: 0,
            },
            tabBarStyle: {
              borderTopWidth: 0,
              elevation: 0,
              height: 45 + 10 / pixelratio,
            },
          }}
        >
          <Tab.Screen
            name="Stocks"
            component={Stocks}
            options={{
              tabBarLabel: "Stocks",
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="barschart" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Mutual Funds"
            component={MutualFunds}
            options={{
              tabBarLabel: "Mutual Funds",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-timer-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Personal Finance"
            component={PersonalFinance}
            options={{
              tabBarLabel: "Personal Finance",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="finance"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Account"
            component={Account}
            options={{
              tabBarLabel: "Account",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="face-profile"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  HomePageBackground: {
    justifyContent: "flex-start",
    flex: 1,
  },
});
