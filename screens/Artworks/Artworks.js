import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Replace "FontAwesome" with the icon library of your choice.
//import Carousel from "react-native-snap-carousel"; // Import the library for the carousel.
//import BottomNavigationMenu from "./screens/Tabs/components/BottomNavigationMenu";
import ReviewsComponent from "./ReviewsComponent";
import ProfilePic from "../../components/ProfilePic";
import { useSelector } from "react-redux";
import { setLoading } from "../../features/loginDetails.js";
import { useDispatch } from "react-redux";
import auth from "../../firebase/firebase.config.js";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB, storage } from "../../firebase/firebase.config";
import styles from "./styles";

const ExhibitionScreen = ({ route, navigation }) => {
  console.log('in artwork');
  const [rating, setRating] = useState(0);
  console.log("route data : ", route.params);

  const { item, image, name } = route.params;
  // Step 2: Function to set the rating
  const handleRatingSubmit = (newRating) => {
    setRating(newRating);
  };

  return (
    <View style={styles.container}>
      {/* Button and Exhibition Text */}
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.pop()}
          >
            <Icon name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.exhibitionText}>Artwork</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("ProfileTab")}>
          <Image source={image} style={styles.profilePic} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.coverImageContainer}>
          <Image
            source={{ uri: item?.imgUrls[0].imgUrl }}
            style={styles.coverImage}
          />
        </View>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.titleMoney}>R{item?.price}</Text>
        </View>

        <Text style={styles.description}>
          {item?.medium} &nbsp;- &nbsp;{item?.dimensions.height}" x{" "}
          {item?.dimensions.width}" x {item?.dimensions.breadth}"
          &nbsp;&nbsp;-&nbsp; {item?.year}
        </Text>

        <Text style={styles.description}>{item?.statement}</Text>
        <Text style={styles.title}>Reviews</Text>
        {/* Use the ReviewsComponent here */}
        <ReviewsComponent
          handleRatingSubmit={handleRatingSubmit}
          rating={rating}
        />
        {/* <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Icon
              name="comment"
              size={30}
              color="white"
              style={styles.menuIcon}
            />
            <View style={styles.profileText}>
              <Text style={styles.profileName}>{name}</Text>
              <Text style={styles.profileInfoText}>
                Be the first to comment
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => console.log("comment added!!!")}
          >
            <Text style={styles.addButtonText}>Add Comment</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </View>
  );
};

export default ExhibitionScreen;
