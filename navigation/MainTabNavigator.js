import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import BibleScreen from "../screens/BibleScreen";
import StudyGuideScreen from "../screens/StudyGuideScreen";
import OnlineEcclesiaScreen from "../screens/OnlineEcclesiaScreen";
import DonationScreen from "../screens/DonationScreen";
import SettingsScreen from "../screens/SettingsScreen";

const BibleStack = createStackNavigator({
  Bible: BibleScreen
});

BibleStack.navigationOptions = {
  tabBarLabel: "Bible",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const StudyGuideStack = createStackNavigator({
  StudyGuide: StudyGuideScreen
});

StudyGuideStack.navigationOptions = {
  tabBarLabel: "Study Guide",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-link${focused ? "" : "-outline"}`
          : "md-link"
      }
    />
  )
};

const OnlineEcclesiaStack = createStackNavigator({
  OnlineEcclesia: OnlineEcclesiaScreen
});

OnlineEcclesiaStack.navigationOptions = {
  tabBarLabel: "Online Ecclesia",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-link${focused ? "" : "-outline"}`
          : "md-link"
      }
    />
  )
};

const DonationStack = createStackNavigator({
  Donation: DonationScreen
});

DonationStack.navigationOptions = {
  tabBarLabel: "Donation",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-link${focused ? "" : "-outline"}`
          : "md-link"
      }
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-options${focused ? "" : "-outline"}`
          : "md-options"
      }
    />
  )
};

export default createBottomTabNavigator({
  BibleStack,
  StudyGuideStack,
  OnlineEcclesiaStack,
  DonationStack,
  SettingsStack
});
