import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
//import Icon from "react-native-vector-icons/FontAwesome";

const ReviewsComponent = ({ handleRatingSubmit, rating }) => {
  console.log('in reviews components', rating);
  return (
    <View style={styles.ratingContainer}>
      <View style={styles.reviewsCount}>
        <Text style={styles.reviewsText}>{rating}.0</Text>
      </View>

      <View style={styles.ratingButtonContainer}>
        {[5, 4, 3, 2, 1].map((num) => (
          <TouchableOpacity
            key={num}
            onPress={() => handleRatingSubmit(num)}
            style={[
              styles.ratingButton,
              num === rating ? styles.selectedRating : null,
            ]}
          >
            <Text style={styles.ratingButtonText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 10,
  },
  ratingText: {
    fontSize: 16,
    color: "white",
    marginRight: 10,
  },
  ratingButtonContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  ratingButton: {
    backgroundColor: "transparent",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  selectedRating: {
    backgroundColor: "#CEB89E",
  },
  ratingButtonText: {
    color: "white",
    fontSize: 16,
    marginHorizontal: 5, // Add some spacing between numbers
  },
  reviewsCount: {
    height: 200,
    width: "40%",

    justifyContent: "center",
  },
  reviewsText: {
    color: "white",
    fontSize: 60,
    textAlign: "center",
  },
});

export default ReviewsComponent;
