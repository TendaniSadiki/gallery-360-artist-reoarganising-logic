import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
  ScrollView,
} from "react-native";
//import Icon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/FontAwesome5";
import { signOut } from "firebase/auth";
import auth from "../../../firebase/firebase.config.js";
import loader2 from "../../../assets/images/loader2.gif";
import styles from "./styles.js";
import { useFetchProfileData } from "../../../hooks/useFetchProfileData.jsx";
// Replace "FontAwesome5" with the icon library of your choice.
const SetupProfileScreen = ({ navigation }) => {

  console.log('in profile');
  const { userData, name, image, dateOfBirth, bio, signature } = useFetchProfileData();

  const Imageloader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Image source={loader2}></Image>
      </View>
    );
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Profile</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfile", { userData })}
          >
            <Icon name="edit" size={25} style={{ padding: 10 }} color="gray" />
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.imageContainer}>
            <Image
              style={{
                width: 150,
                height: 150,
                alignSelf: "center",
                borderRadius: 75,
              }}
              source={image}
            />
            <Text
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: "bold",
                padding: 5,
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontWeight: "bold",
                padding: 5,
              }}
            >
              {dateOfBirth}
            </Text>

            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL("https://" + userData.facebook);
                }}
              >
                <Icon
                  name="facebook"
                  size={25}
                  style={{ padding: 10 }}
                  color="gray"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL("https://" + userData.instagram);
                }}
              >
                <Icon
                  name="instagram"
                  size={25}
                  style={{ padding: 10 }}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={{
              color: "white",
              fontSize: 14,
              marginBottom: 10,
            }}
          >
            {bio}
          </Text>
        </View>

        <Image
          source={signature}
          style={{ width: 300, height: 150, alignSelf: "center" }}
        />
        <View>
          <Text style={styles.profileHeader}>Account</Text>
          <View style={styles.subHeadersContainer}>
            <Text style={styles.subHeaders}>Card Details</Text>
            <Text style={styles.subHeaders}>*** *** **66</Text>
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
            onPress={() => {
              handleSignOut();
            }}
          >
            <Text style={styles.modalButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        {/* Save Profile Button */}
      </ScrollView>
    </View>
  );
};

export default SetupProfileScreen;
