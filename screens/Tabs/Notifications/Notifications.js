import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
//import { View, Text, , , StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5"; // Replace "FontAwesome5" with the icon library of your choice.
import ProfilePic from "../../../components/ProfilePic";
import auth from "../../../firebase/firebase.config.js";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB, storage } from "../../../firebase/firebase.config";
//import ProfilePic from "../../components/ProfilePic.js";
import ProfileCard from "../../../components/ProfileCard.js";
import loader2 from "../../../assets/images/loader2.gif";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useProfileData } from "../../../hooks/useProfilePic.jsx";
import { setData } from "../../../features/loginDetails.js";
//import { useSelector } from "react-redux";
import { useFetchExhibition } from "../../../hooks/useFetchExhibition";
import UseFetchUpcoming from "../../../hooks/UseFetchUpcoming";
import { useFetchProfileData } from "../../../hooks/useFetchProfileData.jsx";
const DashboardScreen = ({ navigation }) => {

  console.log('in notifications');
  const { image, name, userData } = useFetchProfileData();

  const [navStack, setNavStack] = useState("NewArtwork");
  const [desc, setDesc] = useState(
    " make your first sale by adding artwork collections"
  );
  const [btnText, setBtnText] = useState("Add Artworks");
  // const [isModalVisible, setModalVisible] = useState(false);

  // const toggleModal = () => {
  //   setModalVisible(!isModalVisible);
  // };
  const { exhibionData, firebaseExhibition, past, upComing } =
    useFetchExhibition();

  console.log("firebaseExhibition : ", firebaseExhibition);
  console.log("upcoming : ", upComing);
  // console.log("past : ", past);

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
  return userData === null ? (
    <View style={styles.container}>
      <Imageloader />
    </View>
  ) : (
    <View style={styles.container}>
      {/* <Text style={styles.openButton} onPress={toggleModal}>
        Open Modal
      </Text>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text>This is a modal</Text>
              <Text>Click outside to close</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal> */}
      <ProfilePic data={{ name, image, navigation }} />

      <Text style={styles.welcomeHeader}>Notifications</Text>

      {/* Navigation Menu */}

      {/* Profile Card */}
      <UseFetchUpcoming />
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => navigation.navigate("NotificationShow", { image, name })}
      >
        <View style={styles.profileCard}>
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
                Your important announcements and updates will be listed here.
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

//import React, { useState } from "react";

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
    flexDirection: "column",
    justifyContent: "center",
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
    fontSize: 16,
    fontWeight: "bold",
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
  lineChart: {
    marginVertical: 8,
    borderRadius: 16,
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
    fontSize: 12,
  },
  artworksMenu: {
    flexDirection: "row",
    justifyContent: "space-around",

    paddingTop: 10,
    marginBottom: 20,
  },
  menuItem: {
    alignItems: "center",
  },
  menuText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  profileCard: {
    backgroundColor: "transparent",
    borderRadius: 8,
    borderWidth: 0.2,
    borderColor: "#CEB89E",
    padding: 10,
    width: 330,
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
  },
  profileInfoText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
  addButton: {
    marginTop: 10,
    backgroundColor: "transparent",
    borderRadius: 10,
    borderColor: "#CEB89E",
    borderWidth: 1,
    paddingVertical: 10,
    alignItems: "center",
    alignSelf: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
  },
  salesList: {
    marginTop: 20,
  },
  saleItem: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  activeMenuItem: {
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: "#CEB89E",
  },
  activeMenuText: {
    color: "black",
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "75%",
  },
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // openButton: {
  //   backgroundColor: "blue",
  //   color: "white",
  //   padding: 10,
  //   borderRadius: 5,
  // },
  // modalOverlay: {
  //   flex: 1,
  //   backgroundColor: "rgba(0, 0, 0, 0.5)",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // modalContent: {
  //   backgroundColor: "white",
  //   padding: 20,
  //   borderRadius: 10,
  //   width: 300,
  //   alignItems: "center",
  // },
});

export default DashboardScreen;
