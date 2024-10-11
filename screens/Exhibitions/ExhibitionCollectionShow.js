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
import Carousel from "react-native-snap-carousel"; // Import the library for the carousel.
//import BottomNavigationMenu from "./screens/Tabs/components/BottomNavigationMenu";

const ExhibitionScreen = ({ navigation, route }) => {
  console.log('in exhibtion show');
  //const profilePic = require("../../assets/images/userImage.jpg"); // Replace with the path to your profile picture
  //const coverImage = require("../../assets/images/art1.png"); // Replace with the path to your cover image

  // const address = "123 Main Street, City";
  // const fromDate = "19 July 2023";
  // const toDate = "22 July 2023";

  const { image, images, name, email, contactNumber, address, desc } =
    route.params;
  // const images = [
  //   require("../../assets/images/art1.png"), // Replace with the paths to your carousel images
  //   require("../../assets/images/art2.png"),
  //   require("../../assets/images/art3.png"),
  //   // Add more carousel images as needed
  // ];

  //   const description = `"Reflections on Nature" is a solo exhibition of new works by [Artist Name] that explores the intersection of nature and art. The exhibition features a diverse range of paintings, drawings, and mixed media works that showcase the artist's unique vision and creative talent.
  // The works on display capture the beauty and complexity of the natural world, with lush landscapes, delicate flowers, and intricate patterns that evoke a sense of wonder and awe. The artist's use of color, light, and texture is masterful, creating works that are both visually stunning and emotionally resonant.
  // The exhibition will be held at [Gallery Name], a premier contemporary art space located in [Gallery Address]. The show will run from [Exhibition Dates], with an opening reception on [Date and Time]. This will be an exciting opportunity for art lovers to discover the work of a talented artist and experience the beauty and power of nature through the medium of art.
  // Whether you are a seasoned collector or a first-time visitor to the gallery, "Reflections on Nature" is a must-see exhibition that will leave a lasting impression and inspire a deeper appreciation for the natural world.`;

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <Text style={styles.exhibitionText}>New Exhibition</Text>
        </View>
      </View>

      <ScrollView>
        <View>
          <Image source={image} style={styles.coverImage} />
          <Icon
            name="camera"
            size={20}
            color="gray"
            style={{
              padding: 10,
              backgroundColor: "white",
              borderRadius: 20,
              position: "absolute",
              alignSelf: "center",
              bottom: -20,
            }}
          />
        </View>
        <Text style={styles.title}>EXHIBITION CONTENT</Text>
            
        <Carousel
          data={images}
          renderItem={({ item }) => (
            <Image source={item} style={styles.carouselImage} />
          )}
          sliderWidth={300}
          itemWidth={160}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.input}>{name}</Text>
          <Text style={styles.input}>{address}</Text>
          <Text style={styles.input}>{contactNumber}</Text>
          <Text style={styles.input}>{email}</Text>
          
        </View>

        <Text style={styles.description}>{desc}</Text>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigation.navigate("Congradulations", { image })}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Set this to your desired background color for the whole screen
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    padding: 10,
  },
  exhibitionText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginTop: 25,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  detailsContainer: {
    marginBottom: 10,
    marginLeft: 20,
  },
  address: {
    fontSize: 10,
    color: "white",
    textTransform: "uppercase",
  },
  addressHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  datesContainer: {
    flexDirection: "row",
  },
  dates: {
    marginTop: 10,
    fontSize: 14,
    color: "white",
    marginRight: 50,
  },

  coverImage: {
    width: "100%",
    height: 200, // Adjust this value to control the image height
    resizeMode: "cover",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 10,

    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  carouselImage: {
    width: 150,
    height: 150, // Adjust this value to control the image height
    borderRadius: 15,
    alignSelf: "center",
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: "white",
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  viewsContainer: {
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 10,
  },
  views: {
    color: "white",
    padding: 10,
    backgroundColor: "#313041",
    marginRight: 15,
    borderRadius: 25,
    marginBottom: 10,
  },
  signInButton: {
    width: "90%",
    height: 50,
    alignSelf: "center",
    backgroundColor: "#CEB89E", // Set this to your desired button background color
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 15,
  },
  input: {
    width: "100%",
    height: 50,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
    color: "#fff",
  },
});

export default ExhibitionScreen;
