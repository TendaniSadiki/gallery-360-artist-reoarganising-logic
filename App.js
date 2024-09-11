import React from "react";
import MainNavigation from "./navigation/MainNavigation";
import { Provider } from "react-redux";
import store from "./store";
//import registerNNPushToken from "native-notify";

//registerNNPushToken(13831, "rXk3WpVsqQqqMouyNW7BXd");

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}
