import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Header = ({ name, profilePic }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerInfo}>
        <Text style={styles.name}>Hi {name}</Text>
        <Image source={profilePic} style={styles.profilePic} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Define your styles for Header component here
  // ...
});

export default Header;
