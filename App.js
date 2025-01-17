import React, { useState } from "react";
import MainNavigation from "./navigation/MainNavigation";
import { Provider } from "react-redux";
import store from "./store";
import { StatusBar } from "expo-status-bar";
import ErrorBoundary from 'react-native-error-boundary';
import 'react-native-reanimated';
import { View, Text, Button } from 'react-native'

const CustomFallback = ({ error, resetError }) => (
  <View>
    <Text>Something happened!</Text>
    <Text>{error.toString()}</Text>
    <Button onPress={resetError} title={'Try again'} />
  </View>
)
const CustomFallbackWithTrace = ({ error, stackTrace }) => (
  <View>
    <Text>Something happened!</Text>
    <Text>{error.toString()}</Text>
    <Text>{stackTrace.toString()}</Text>
  </View>
)
export default function App() {
  const [error, setError] = useState(null)
  if(error) {
    return <CustomFallbackWithTrace error={error.error} stackTrace={error.stackTrace}/>
  }
  return (
    <Provider store={store}>
      {/* StatusBar for global configuration */}
      <StatusBar style="light" translucent={true} backgroundColor="rgba(0,0,0,0.3)" />
      <ErrorBoundary onError={(e, s) => setError({error: e, stackTrace: s})}>
        <MainNavigation />
      </ErrorBoundary>
    </Provider>
  );
}
