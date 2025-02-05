import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  Alert,
  Modal,
  ProgressBarAndroid,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { signOut } from "firebase/auth";
import auth from "../../../firebase/firebase.config.js";
import styles from "./styles.js";
import { useFetchProfileData } from "../../../hooks/useFetchProfileData.jsx";
import { useFetchAccountData } from "../../../hooks/useFetchAccountData"; // Custom hook for account data
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../../firebase/firebase.config.js";

const SetupProfileScreen = ({ navigation }) => {
  const { userData, name, image, dateOfBirth, bio, signature, address, contactNumber, facebook, instagram, websiteUrl, videoUrl } = useFetchProfileData();
  const { accountHolder, accountNumber, bankName, branchCode, documentUrl } = useFetchAccountData();
  const [isProfileIncomplete, setProfileIncomplete] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    checkProfileCompletion();
  }, [userData, accountHolder, accountNumber, bankName, branchCode, documentUrl]);

  const checkProfileCompletion = async () => {
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      const uid = user.uid;
      const userDocRef = doc(FIRESTORE_DB, "artists", uid);
      const paymentDocRef = doc(FIRESTORE_DB, "paymentDetails", uid);

      const userDoc = await getDoc(userDocRef);
      const paymentDoc = await getDoc(paymentDocRef);

      if (!userDoc.exists() || !paymentDoc.exists()) {
        setProfileIncomplete(true);
        setMissingFields(["Profile data or payment details are missing"]);
      } else {
        const userData = userDoc.data();
        const paymentData = paymentDoc.data();
        const fields = [
          { field: userData.fullname, name: "Full Name" },
          { field: userData.contactnumber, name: "Contact Number" },
          { field: userData.address, name: "Address" },
          { field: userData.websiteurl, name: "Website URL" },
          { field: userData.dateofbirth, name: "Date of Birth" },
          { field: userData.biography, name: "Biography" },
          { field: userData.imageUrl, name: "Image URL" },
          { field: userData.facebook, name: "Facebook" },
          { field: userData.instagram, name: "Instagram" },
          { field: userData.signature, name: "Signature" },
          { field: paymentData.accountHolder, name: "Account Holder" },
          { field: paymentData.bankName, name: "Bank Name" },
          { field: paymentData.accountNumber, name: "Account Number" },
          { field: paymentData.branchCode, name: "Branch Code" },
          { field: paymentData.documentUrl, name: "Document URL" },
        ];

        const missing = fields.filter(item => !item.field).map(item => item.name);
        setMissingFields(missing);
        setProfileIncomplete(missing.length > 0);
        setCompletionPercentage(((fields.length - missing.length) / fields.length) * 100);
      }
    }
  };

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
            <Text style={{ color: "white" }}>{accountHolder || "N/A"}</Text>
          </View>
          <View style={styles.subHeadersContainer}>
            <Text style={styles.subHeaders}>Account Number:</Text>
            <Text style={{ color: "white" }}>{accountNumber || "N/A"}</Text>
          </View>
          <View style={styles.subHeadersContainer}>
            <Text style={styles.subHeaders}>Bank Name:</Text>
            <Text style={{ color: "white" }}>{bankName || "N/A"}</Text>
          </View>
          <View style={styles.subHeadersContainer}>
            <Text style={styles.subHeaders}>Branch Code:</Text>
            <Text style={{ color: "white" }}>{branchCode || "N/A"}</Text>
          </View>

          {/* Display Document Preview */}
          <View style={styles.subHeadersContainer}>
            <Text style={styles.subHeaders}>Document:</Text>
            {documentUrl ? (
              documentUrl.endsWith(".pdf") ? (
                <TouchableOpacity onPress={handleDocumentPress}>
                  <Text style={{ color: "white" }}>Click to open document (PDF)</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={handleDocumentPress}>
                  <Image source={{ uri: documentUrl }} style={{ width: 100, height: 100 }} />
                </TouchableOpacity>
              )
            ) : (
              <Text style={{ color: "white" }}>No document found</Text> // Show message if no document is found
            )}
          </View>

          <Text style={styles.profileHeader}>Help & Info</Text>
          <View style={styles.subHeadersContainer}>
            <Text style={styles.subHeaders}>Contact Number:</Text>
            <Text style={{ color: "white" }}>{contactNumber}</Text>
          </View>
          <View style={styles.subHeadersContainer}>
            <Text style={styles.subHeaders}>Address:</Text>
            <Text style={{ color: "white" }}>{address.street}, {address.city}, {address.province}, {address.postalCode}, {address.localArea}, {address.type}, {address.zone}, {address.country}</Text>
          </View>
          <View style={styles.subHeadersContainer}>
            <Text style={styles.subHeaders}>Website URL:</Text>
            <Text style={{ color: "white" }}>{websiteUrl}</Text>
          </View>
          <View style={styles.subHeadersContainer}>
            <Text style={styles.subHeaders}>Video URL:</Text>
            <Text style={{ color: "white" }}>{videoUrl}</Text>
          </View>
          <Text style={styles.subHeaders}>Terms & conditions</Text>
          <View style={styles.subHeadersContainer}>
            <Text style={styles.subHeaders}>Return Policy</Text>
            <Text style={{ color: "white" }}>Gallery360 Default</Text>
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

      {/* Profile Incomplete Modal */}
      <Modal visible={isProfileIncomplete} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.header}>Profile Incomplete</Text>
            <Text style={styles.smallerText}>Please complete your profile to proceed.</Text>
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              progress={completionPercentage / 100}
              color="#2196F3"
            />
            <Text style={styles.percentageText}>{completionPercentage.toFixed(2)}% Complete</Text>
            {missingFields.map((field, index) => (
              <Text key={index} style={styles.missingFieldText}>{field}</Text>
            ))}
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => {
                setProfileIncomplete(false);
                navigation.navigate("EditProfile", { userData });
              }}
            >
              <Text style={styles.buttonText}>Complete Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SetupProfileScreen;
