import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import { MainStack } from "./StackNavigation";

const InternetStatusModal = ({ visible, isConnected, isStable, onRetry }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.header}>
            {isConnected
              ? "Internet is Unstable"
              : "No Internet Connection"}
          </Text>
          <Text style={styles.smallerText}>
            {isConnected
              ? "Please check your connection for a more stable experience."
              : "Please check your connection."}
          </Text>
          <TouchableOpacity style={styles.signInButton} onPress={onRetry}>
            <Text style={styles.buttonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const MainNavigation = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [isStable, setIsStable] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);

      if (state.isConnected) {
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

  const handleRetry = () => {
    fetch("https://www.google.com", { method: "HEAD" })
      .then(() => setIsStable(true))
      .catch(() => setIsStable(false));
  };

  return (
    <NavigationContainer>
      <InternetStatusModal
        visible={!isConnected || !isStable}
        isConnected={isConnected}
        isStable={isStable}
        onRetry={handleRetry}
      />
      <MainStack />
    </NavigationContainer>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "black", // Changed to black as per new style
    borderRadius: 10,
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white", // White text for contrast
  },
  smallerText: {
    color: "white", // White text for better visibility
    marginBottom: 20,
    textAlign: "center",
  },
  signInButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#CEB89E", // Button color
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff", // White text inside button
    fontSize: 16,
  },
});
