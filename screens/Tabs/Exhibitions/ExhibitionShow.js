import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; 
import Carousel from "react-native-snap-carousel"; 
import { useFetchProfileData } from "../../../hooks/useFetchProfileData.jsx";

// Utility function to format date
const formatDate = (timestamp) => {
  if (timestamp && timestamp.seconds) {
    const date = timestamp.toDate(); // Convert to JavaScript Date object
    return date.toDateString(); // Format to string (customize format as needed)
  }
  return ""; // Return empty string if timestamp is null/undefined
};

const ExhibitionScreen = ({ navigation, route }) => {
  const { item } = route.params; 
  
  const { userData, loading, error } = useFetchProfileData();

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
            <Image source={userData?.image} style={styles.profilePic} />
          </TouchableOpacity>
        </View>

        {/* Cover Image */}
        <Image
          source={{ uri: item?.imgUrls[0]?.imgUrl }}
          style={styles.coverImage}
        />

        {/* Title */}
        <Text style={styles.title}>{item.name}</Text>

        {/* Profile Image and Name */}
        <View style={styles.profileInfo}>
          <Image source={userData?.image} style={styles.profileImage} />
          <Text style={styles.profileName}>{userData?.name}</Text>
        </View>

        {/* Address and Dates */}
        <View style={styles.detailsContainer}>
          <Text style={styles.addressHeader}>{item.address.split(",")[0]}</Text>
          <Text style={styles.address}>{item.address.split(",")[1]}</Text>
          <View style={styles.datesContainer}>
            <Text style={styles.dates}>
              From{"\n"}
              {formatDate(item?.date?.fromDate)} {/* Fix for fromDate */}
            </Text>
            <Text style={styles.dates}>
              To{"\n"}
              {formatDate(item?.date?.toDate)} {/* Fix for toDate */}
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
    backgroundColor: "black",
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
    height: 200,
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
    height: 150,
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});

export default ExhibitionScreen;
