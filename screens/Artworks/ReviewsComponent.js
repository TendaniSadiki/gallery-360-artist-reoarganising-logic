import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ReviewsComponent = ({ rating }) => {
  // Check if rating is 0 and show a default message
  const displayRating = rating === 0 ? "No rating yet" : `${rating}.0`;

  return (
    <View style={styles.ratingContainer}>
      <View style={styles.reviewsCount}>
        <Text style={styles.reviewsText}>{displayRating}</Text>
      </View>

      <View style={styles.ratingButtonContainer}>
        {[5, 4, 3, 2, 1].map((num) => (
          <View
            key={num}
            style={[
              styles.ratingButton,
              num <= rating ? styles.selectedRating : null,
            ]}
          >
            <Text style={styles.ratingButtonText}>{num}</Text>
          </View>
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
    flexDirection: "row", // Make the buttons row instead of column
    alignItems: "center",
  },
  ratingButton: {
    backgroundColor: "transparent",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    margin: 2, // Add some spacing between buttons
  },
  selectedRating: {
    backgroundColor: "#CEB89E", // Highlight the selected rating button
    borderRadius: 5, // Add rounded corners to the selected button
  },
  ratingButtonText: {
    color: "white",
    fontSize: 16,
    marginHorizontal: 5, // Add some spacing between numbers
  },
  reviewsCount: {
    height: 60,
    width: "40%",
    justifyContent: "center",
    alignItems: "center", // Center the reviews text
  },
  reviewsText: {
    color: "white",
    fontSize: 30, // Adjusted font size for better visibility
    textAlign: "center",
  },
});

export default ReviewsComponent;
