import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ExhibitionCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardInfoContainer}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDate}>{item.date}</Text>
        </View>
        <Text style={styles.cardAddress}>{item.address}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Define your styles for ExhibitionCard component here
  // ...
});

export default ExhibitionCard;
