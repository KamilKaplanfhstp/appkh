import React from "react";
import { View, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import ImpressumPage from "./pages/ImpressumPage"
import { createBottomTabNavigator } from 'react-navigation-tabs';


const ListNavigator = createStackNavigator({
  Home: {
    screen: ListPage
  },
  DetailPage: {
    screen: DetailPage
  }
});

const TabNavigator = createBottomTabNavigator({
 
  Home: ListNavigator,
  // Favoriten: 
  ImpressumPage: ImpressumPage,
});



export default createAppContainer(TabNavigator);
