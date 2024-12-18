import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { signOut } from "firebase/auth";
import auth from "../../../firebase/firebase.config.js";
import styles from "./styles.js";
import { useFetchProfileData } from "../../../hooks/useFetchProfileData.jsx";
import { useFetchAccountData } from "../../../hooks/useFetchAccountData"; // Custom hook for account data

const SetupProfileScreen = ({ navigation }) => {
  const { userData, name, image, dateOfBirth, bio, signature } = useFetchProfileData();
  const { accountHolder, accountNumber, bankName, branchCode, documentUrl } = useFetchAccountData();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDocumentPress = () => {
    console.log("Document URL pressed:", documentUrl); // Debugging log

    if (documentUrl) {
      if (documentUrl.endsWith(".pdf")) {
        Linking.openURL(documentUrl); // Open the document URL if it's a PDF
      } else if (documentUrl.startsWith("http") || documentUrl.startsWith("https")) {
        // If it's an image URL
        Alert.alert("Image Preview", "The document is displayed below.");
      } else {
        Alert.alert("Invalid URL", "The document URL is not valid.");
      }
    } else {
      Alert.alert("No Document", "No document available to preview.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Profile</Text>
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile", { userData })}>
            <Icon name="edit" size={25} style={{ padding: 10 }} color="gray" />
          </TouchableOpacity>
        </View>

        <View>
          <View style={styles.imageContainer}>
            <Image
              style={{ width: 150, height: 150, alignSelf: "center", borderRadius: 75 }}
              source={image}
            />
            <Text style={{ color: "white", fontSize: 22, fontWeight: "bold", padding: 5 }}>
              {name}
            </Text>
            <Text style={{ color: "white", fontSize: 14, fontWeight: "bold", padding: 5 }}>
              {dateOfBirth}
            </Text>

            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL("https://" + userData?.facebook);
                }}
              >
                <Icon name="facebook" size={25} style={{ padding: 10 }} color="gray" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL("https://" + userData?.instagram);
                }}
              >
                <Icon name="instagram" size={25} style={{ padding: 10 }} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{ color: "white", fontSize: 14, marginBottom: 10 }}>{bio}</Text>
        </View>

        <Image source={signature} style={{ width: 300, height: 150, alignSelf: "center" }} />

        {/* Display Account Information */}
        <View>
          <Text style={styles.profileHeader}>Account Information</Text>
          <View style={styles.subHeadersContainer}>
            <Text style={styles.subHeaders}>Account Holder:</Text>
            <Text style={styles.subHeaders}>{accountHolder || "N/A"}</Text>
          </View>
          <View style={styles.subHeadersContainer}>
            <Text style={styles.subHeaders}>Account Number:</Text>
            <Text style={styles.subHeaders}>{accountNumber || "N/A"}</Text>
          </View>
          <View style={styles.subHeadersContainer}>
            <Text style={styles.subHeaders}>Bank Name:</Text>
            <Text style={styles.subHeaders}>{bankName || "N/A"}</Text>
          </View>
          <View style={styles.subHeadersContainer}>
            <Text style={styles.subHeaders}>Branch Code:</Text>
            <Text style={styles.subHeaders}>{branchCode || "N/A"}</Text>
          </View>

          {/* Display Document Preview */}
          <View style={styles.subHeadersContainer}>
            <Text style={styles.subHeaders}>Document:</Text>
            {documentUrl ? (
              documentUrl.endsWith(".pdf") ? (
                <TouchableOpacity onPress={handleDocumentPress}>
                  <Text style={styles.subHeaders}>Click to open document (PDF)</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={handleDocumentPress}>
                  <Image source={{ uri: documentUrl }} style={{ width: 100, height: 100 }} />
                </TouchableOpacity>
              )
            ) : (
              <Text style={styles.subHeaders}>Loading document...</Text> // Show loading text if document is not available yet
            )}
          </View>

          <Text style={styles.profileHeader}>Help & Info</Text>
          <Text style={styles.subHeaders}>Terms & conditions</Text>
          <View style={styles.subHeadersContainer}>
            <Text style={styles.subHeaders}>Return Policy</Text>
            <Text style={styles.subHeaders}>Gallery360 Default</Text>
          </View>
        </View>

        <View style={styles.modalContent}>
          <TouchableOpacity
            style={[styles.modalButton, styles.signOutButton]}
            onPress={handleSignOut}
          >
            <Text style={styles.modalButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SetupProfileScreen;
