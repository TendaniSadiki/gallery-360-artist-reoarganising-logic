import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";

const InternetStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [isStable, setIsStable] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (state.isConnected) {
        // Ping a known reliable URL to check stability
        fetch("https://www.google.com", { method: "HEAD" })
          .then(() => setIsStable(true))
          .catch(() => setIsStable(false));
      } else {
        setIsStable(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={[styles.container, !isConnected || !isStable ? styles.warning : styles.normal]}>
      <Text style={styles.text}>
        {isConnected ? (isStable ? "Internet is Stable" : "Internet is Unstable") : "No Internet Connection"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  warning: {
    backgroundColor: "#ffcccb", // Red background for warning
  },
  normal: {
    backgroundColor: "#d4edda", // Green background for stable connection
  },
  text: {
    fontSize: 16,
    color: "#000",
  },
});

export default InternetStatus;
