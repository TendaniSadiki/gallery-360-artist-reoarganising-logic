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
  const { item, image, name } = route.params;
  console.log('in exhibition show');

  return (
    <View style={styles.container}>
      {/* Button and Exhibition Text */}
      <ScrollView>
        <View style={styles.topContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.pop()}
            >
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.exhibitionText}>Exhibition</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("ProfileTab")}>
            <Image source={image} style={styles.profilePic} />
          </TouchableOpacity>
        </View>

        {/* Profile Pic */}

        {/* Address and Dates */}

        {/* Cover Image */}
        <Image
          source={{ uri: item?.imgUrls[0].imgUrl }}
          style={styles.coverImage}
        />

        {/* Title */}
        <Text style={styles.title}>{item.name}</Text>

        {/* Profile Image and Name */}
        <View style={styles.profileInfo}>
          <Image source={image} style={styles.profileImage} />
          <Text style={styles.profileName}>{name}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.addressHeader}>{item.address.split(",")[0]}</Text>
          <Text style={styles.address}>{item.address.split(",")[1]}</Text>
          <View style={styles.datesContainer}>
            <Text style={styles.dates}>
              From{"\n"}
              {item?.date?.fromDate}
            </Text>
            <Text style={styles.dates}>
              {" "}
              To {"\n"}
              {item?.date?.toDate}
            </Text>
          </View>
        </View>
        {/* Carousel of Images */}
        <Carousel
          data={item.imgUrls}
          renderItem={({ item }) => (
            <Image source={{ uri: item.imgUrl }} style={styles.carouselImage} />
          )}
          sliderWidth={300}
          itemWidth={160}
        />

        {/* Full Description */}
        <View style={styles.viewsContainer}>
          <Text style={styles.views}>0 views</Text>
          <Text style={styles.views}>0 views</Text>
        </View>
        <Text style={styles.description}>{item.desc}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 20,
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
    fontSize: 20,
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
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginLeft: 20,
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
  navigationMenu: {
    position: "absolute",
    backgroundColor: "black",
    bottom: 0,
    width: 350,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderColor: "#CEB89E",
    paddingTop: 10,
  },
  menuItem: {
    alignItems: "center",
  },
  menuIcon: {
    marginBottom: 5,
  },
  menuText: {
    color: "white",
    fontSize: 10,
  },
});

export default ExhibitionScreen;
