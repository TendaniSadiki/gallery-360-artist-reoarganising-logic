import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ArtworksMenu = ({ menuItems, selectedOption, onOptionPress }) => {
  return (
    <View style={styles.artworksMenu}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item}
          style={[
            styles.menuItem,
            selectedOption === item && styles.activeMenuItem,
          ]}
          onPress={() => onOptionPress(item)}
        >
          <Text
            style={[
              styles.menuText,
              selectedOption === item && styles.activeMenuText,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  // Define your styles for ArtworksMenu component here
  // ...
});

export default ArtworksMenu;
