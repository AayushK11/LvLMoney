import React from "react";
import { StyleSheet, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../Profile/Profile";

const Tab = createBottomTabNavigator();

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.HomePageBackground}>
        <Tab.Navigator
          initialRouteName="Stocks"
          backBehavior="none"
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#2196F3",
            tabBarInactiveTintColor: "#010312",
            tabBarActiveBackgroundColor: "#010312",
            tabBarInactiveBackgroundColor: "white",
          }}
        >
          <Tab.Screen
            name="Stocks"
            component={Profile}
            options={{
              tabBarLabel: "Stocks",
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="barschart" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Mutual Funds"
            component={Profile}
            options={{
              tabBarLabel: "Mutual Funds",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-timer-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Personal Finance"
            component={Profile}
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
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: "Profile",
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
