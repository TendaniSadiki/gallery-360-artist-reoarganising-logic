import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Replace "FontAwesome" with the icon library of your choice.

const ExhibitionScreen = ({ navigation, route }) => {
  console.log('in congratulations');
  // const coverImage = require("../../assets/images/art1.png"); // Replace with the path to your cover image
  const { image } = route.params;
  const description = `You have successfully created a new exhibition for your collection.`;
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={image}
          style={styles.coverImage}
          resizeMode="cover"
          opacity={0.5}
        />
        <Icon name="check" size={40} color="white" style={styles.checkIcon} />
        <View style={styles.congratsContainer}>
          <Text style={styles.congratsText}>Congratulations</Text>
          <Text style={styles.paragraph}>{description}</Text>
        </View>

        {/* Congratulations Text */}
      </View>
      <View style={styles.lineContainer}></View>
      <View style={styles.belowImageContainer}>
        <Text style={styles.belowHeader}>Share your work</Text>
        <Text style={styles.belowText}>
          Please feel free to share the link to your exhibition with your
          followers and on your social media platforms.
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="facebook" size={25} style={{ padding: 15 }} color="gray" />

        <Icon name="instagram" size={25} style={{ padding: 15 }} color="gray" />
      </View>
      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.belowText}>
          Thank you for using our platform to showcase your talent and share
          your creativity with the world. We wish you all the best in your
          artistic endeavors!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Set this to your desired background color for the whole screen
  },
  imageContainer: {
    position: "relative",
  },
  coverImage: {
    width: "100%",
    height: 300, // Adjust this value to control the image height
  },
  checkIcon: {
    position: "absolute",
    bottom: "30%",
    alignSelf: "center",
    // transform: [{ translateX: -20 }],
    backgroundColor: "transparent",
    borderRadius: 70,
    padding: 30,
    borderColor: "white",
    borderWidth: 1,
  },
  congratsContainer: {
    position: "absolute",
    bottom: "0%",
    alignSelf: "center",
    paddingHorizontal: 12,

    // backgroundColor: "rgba(0, 0, 0, 0.7)", // Lower opacity for the background
  },
  lineContainer: {
    marginTop: 10,
    borderBottomWidth: 2.5,
    borderBottomColor: "#ccc",
    alignSelf: "center",
    width: "30%",
  },
  congratsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  belowImageContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  belowHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  belowText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  iconContainer: {
    alignSelf: "center",
    marginTop: 30,
    flexDirection: "row",
    marginBottom: 10,
  },
  signInButton: {
    width: "90%",
    height: 50,
    alignSelf: "center",
    backgroundColor: "#CEB89E",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "column",
    height: "20%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

export default ExhibitionScreen;
