import React from "react";
import MainNavigation from "./navigation/MainNavigation";
import { Provider } from "react-redux";
import store from "./store";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <Provider store={store}>
      {/* StatusBar for global configuration */}
      <StatusBar style="light" translucent={true} backgroundColor="rgba(0,0,0,0.3)" />
      <MainNavigation />
    </Provider>
  );
}
