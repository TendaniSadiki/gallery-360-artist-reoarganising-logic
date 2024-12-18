import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Share,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles"; // Ensure your styles are imported here
import { useFetchProfileData } from "../../hooks/useFetchProfileData";

const ExhibitionScreen = ({ route, navigation }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  const { item } = route.params;

  // Fetch artist profile data
  const { name: artistName, image: artistImage } = useFetchProfileData();

  // Calculate average rating and total ratings on load
  useEffect(() => {
    if (item?.ratings?.total > 0) {
      const avgRating = item?.ratings?.sumOfRatings / item?.ratings?.total;
      setAverageRating(avgRating);
      setTotalRatings(item?.ratings?.total);
    }
  }, [item]);

  // Function to share the artwork
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this amazing artwork "${item?.title}" by ${artistName || "the artist"}. Price: R${item?.price}.`,
      });
      if (result.action === Share.sharedAction) {
        console.log("Shared successfully");
      }
    } catch (error) {
      console.error("Error sharing artwork:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.pop()}>
            <Icon name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.exhibitionText}>Artwork</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileTab")}>
          {artistImage ? (
            <Image source={artistImage} style={styles.profilePic} />
          ) : (
            <Icon name="user-circle" size={40} color="white" />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Artwork Image */}
        <View style={styles.coverImageContainer}>
          <Image source={{ uri: item?.imgUrls[0]?.imgUrl }} style={styles.coverImage} />
        </View>

        {/* Title and Price */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.titleMoney}>R{item?.price}</Text>
        </View>

        {/* Artwork Details */}
        <Text style={styles.description}>
          {item?.medium} - {item?.dimensions.height}" x {item?.dimensions.width}" x {item?.dimensions.breadth}" - {item?.year}
        </Text>
        <Text style={styles.description}>Artist: {artistName || "Unknown Artist"}</Text>
        
        <Text style={styles.description}>{item?.statement}</Text>

        {/* Availability Indicator */}
        <Text style={[styles.description, { color: item?.isAvailable ? "green" : "red" }]}>
          {item?.isAvailable ? "Available for Purchase" : "Sold Out"}
        </Text>

        {/* Rating Section */}
        <Text style={styles.description}>
          Average Rating: {averageRating.toFixed(1)} ({totalRatings} ratings)
        </Text>

        {/* Comments Section */}
        <Text style={styles.title}>Comments</Text>
        <View style={styles.commentsContainer}>
          {item?.comments?.length > 0 ? (
            item.comments.map((comment, index) => (
              <View key={index} style={styles.commentContainer}>
                <Text style={styles.commentAuthor}>{comment.author}</Text>
                <Text style={styles.commentText}>{comment.text}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noComments}>No comments yet</Text>
          )}
        </View>

        {/* Actions Section */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.addButton} onPress={onShare}>
            <Text style={styles.addButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ExhibitionScreen;
