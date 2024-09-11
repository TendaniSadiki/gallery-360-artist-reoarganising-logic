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

const DashboardScreen = ({ navigation, route }) => {
  // Sample data for the line chart
  //const [name, setName] = useState("John Doe");
  console.log('in notifications policy');
  const { image } = route.params;
  const profilePic = require("../../../assets/images/userImage.jpg"); // Replace with the actual path to the profile picture

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerInfo}>
            <View style={styles.notificationArrow}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => navigation.popToTop()}
              >
                <Icon name="arrow-left" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.name}>Notifications</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("ProfileTab")}>
              <Image source={image} style={styles.profilePic} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Navigation Menu */}

        {/* Profile Card */}

        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Icon
              name="comment"
              size={30}
              color="white"
              style={{ marginLeft: 10 }}
            />
            <Text style={styles.profileName}>Return Policy update</Text>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.profileInfoText}>
              Effective immediately, we have made some changes to our return
              policy to better serve our customers and ensure that they have a
              positive experience when purchasing your artwork.
              {"\n"}
              {"\n"}
              1. Information We Collect{"\n"}
              We may collect the following types of information from or about
              you:
              {"\n"}* Personal information: When you register for an account on
              our App, we collect your name, email address, and payment
              information, such as your credit card or PayPal account
              information. {"\n"} * Artwork information: When you upload an
              artwork for sale on our App, we collect information about the
              artwork, such as its title, description, and price.{"\n"}* Usage
              information: We collect information about how you use our App,
              such as the artworks you view or purchase, and your interactions
              with other users. {"\n"}* Device information: We collect
              information about the device you use to access our App, such as
              your device type, operating system, and browser type. {"\n"}
              1. How We Use Your Information {"\n"}
              We may use your information for the following purposes: {"\n"}* To
              provide our services to you: We use your personal and artwork
              information to allow you to sell and purchase artworks on our App.
              {"\n"}* To improve our services: We use your usage and device
              information to analyze how our App is used and to improve its
              functionality and user experience. {"\n"}* To communicate with
              you: We may use your personal information to send you updates
              about our App, such as new features or promotions.{"\n"}* To
              enforce our policies: We may use your information to enforce our
              terms of service and other policies. {"\n"} * How We Share Your
              Information We may share your information with the following
              parties: Other users: When you sell an artwork on our App, we may
              share your name and artwork information with the buyer. {"\n"} *
              Service providers: We may share your information with third-party
              service providers who perform services on our behalf, such as
              payment processing and email marketing. {"\n"} * Law enforcement
              and legal proceedings: We may disclose your information to comply
              with applicable laws, regulations, or legal proceedings.{"\n"} *
              Security We take reasonable measures to protect your information
              from unauthorized access, use, or disclosure. However, no security
              measures can guarantee 100% security.{"\n"} * Your Choices You can
              control certain aspects of your information, such as your email
              preferences and payment information, through your account settings
              on our App. Updates to this Privacy Policy We may update this
              Privacy Policy from time to time.{"\n"} * We will notify you of
              any material changes by posting the updated policy on our App or
              by email. {"\n"} * Contact Us If you have any questions or
              concerns about this Privacy Policy, please contact us at [EMAIL
              ADDRESS]. By using our App, you agree to the terms of this Privacy
              Policy.
            </Text>
          </View>
        </View>
      </ScrollView>
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

  profileCard: {
    //backgroundColor: "red",
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
    fontSize: 28,
    //fontWeight: "bold",
    textAlign: "center",
    marginLeft: 20,

    //backgroundColor: "red",
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
