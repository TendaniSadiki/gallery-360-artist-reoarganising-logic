import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const NewArtworkContainer = ({ handleAddArtwork }) => {
  return (
    <View style={styles.newArtworkContainer}>
      <Text style={styles.welcomeHeader}>Exhibitions</Text>
      <TouchableOpacity style={styles.signInButton} onPress={handleAddArtwork}>
        <Text style={styles.buttonText}>NEW EXHIBITION</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Define your styles for NewArtworkContainer component here
  // ...
});

export default NewArtworkContainer;
