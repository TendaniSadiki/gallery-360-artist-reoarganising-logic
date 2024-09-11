import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import {
  ArtworkStack,
  NotificationStack,
  ExhibitionStack,
  ProfileStack,
  DashboardStack,
} from "./StackNavigation";
import { View, Image } from "react-native";

const Tabs = createBottomTabNavigator();

const TabIcon = ({ focused, selected, icon, highlightedIcon }) => {
  const iconSource = selected || focused ? highlightedIcon : icon;

  return (
    <View>
      <Image source={iconSource} />
    </View>
  );
};

export { TabIcon };

const TabsNavigation = () => {
  const tabsConfig = [
    {
      label: "DashboardTab",
      icon: require("../assets/icons/chart.png"),
      highlightedIcon: require("../assets/icons/high-lighted/chart.png"),
      component: DashboardStack,
    },
    {
      label: "ArtworkTab",
      icon: require("../assets/icons/designtools.png"),
      highlightedIcon: require("../assets/icons/high-lighted/designtools.png"),
      component: ArtworkStack,
    },
    {
      label: "NotificationTab",
      icon: require("../assets/icons/notification-status.png"),
      highlightedIcon: require("../assets/icons/high-lighted/notification-status.png"),
      component: NotificationStack,
    },
    {
      label: "ExhibitionTab",
      icon: require("../assets/icons/shop.png"),
      highlightedIcon: require("../assets/icons/high-lighted/shop.png"),
      component: ExhibitionStack,
    },
    {
      label: "ProfileTab",
      icon: require("../assets/icons/profile-circle.png"),
      highlightedIcon: require("../assets/icons/high-lighted/profile-circle.png"),
      component: ProfileStack,
    },
  ];

  return (
    <Tabs.Navigator
      activeColor="red"
      inactiveColor="white"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
        },
      }}
    >
      {tabsConfig.map((tab, index) => (
        <Tabs.Screen
          key={index}
          name={tab.label}
          component={tab.component}
          options={({ route }) => ({
            tabBarShowLabel: false,
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                focused={focused}
                selected={route.state?.index === index} // Check if the current tab index matches the selected tab index
                icon={tab.icon}
                highlightedIcon={tab.highlightedIcon}
              />
            ),
          })}
        />
      ))}
    </Tabs.Navigator>
  );
};

export default TabsNavigation;
