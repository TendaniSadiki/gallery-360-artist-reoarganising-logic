import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5"; // Replace "FontAwesome5" with the icon library of your choice.
import ProfilePic from "../../../components/ProfilePic";

const DashboardScreen = ({ navigation, route }) => {
  // Sample data for the line chart
  //const [name, setName] = useState("John Doe");
  console.log('in notifications show');
  const { image, name } = route.params;
  //const profilePic = require("../../../assets/images/userImage.jpg"); // Replace with the actual path to the profile picture

  return (
    <View style={styles.container}>
      <ProfilePic data={{ name, image, navigation }} />

      <Text style={styles.welcomeHeader}>Notifications</Text>

      {/* Navigation Menu */}

      {/* Profile Card */}
      <View style={styles.cardContainer}>
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Icon name="file" size={30} color="white" style={styles.menuIcon} />
            <Text style={styles.profileName}>Return Policy update</Text>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.profileInfoText}>
              Effective immediately, we have made some changes to our return
              policy to better serve our customers and ensure that they have a
              positive experience when purchasing your artwork.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("NotificationPolicy", { image })}
          >
            <Text style={styles.addButtonText}>CONTINUE READING</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Icon name="file" size={30} color="white" style={styles.menuIcon} />
            <Text style={styles.profileName}>Ts & Cs Update</Text>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.profileInfoText}>
              We are writing to inform you of an important update to our Terms
              and Conditions. The updated Terms and Conditions will go into
              effect on 28 Dec 202x, and we encourage you to review them
              carefully.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("NotificationPolicy")}
          >
            <Text style={styles.addButtonText}>CONTINUE READING</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
    paddingTop: 40,
  },
  header: {
    marginBottom: 20,
  },
  profileInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    color: "white",
    fontSize: 20,
    marginLeft: 20,
    // fontWeight: "bold",
  },
  welcomeHeader: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
  },
  artworksHeader: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 25,
    marginBottom: 10,
  },

  cardContainer: {
    marginBottom: 10,
  },
  profileCard: {
    backgroundColor: "transparent",
    borderRadius: 8,
    borderWidth: 0.2,
    borderColor: "#CEB89E",
    padding: 10,
    width: "100%",
    alignSelf: "center",
  },

  profileText: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: 320,
    padding: 10,
  },
  profileName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
  },
  profileInfoText: {
    fontSize: 14,
    color: "white",
    textAlign: "left",
  },

  addButton: {
    marginTop: 10,
    backgroundColor: "gray",
    borderRadius: 10,
    borderColor: "#CEB89E",
    borderWidth: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
  },
  notificationArrow: {
    flexDirection: "row",
  },
});

export default DashboardScreen;
