import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import AddSocialMedia from "../../SignUp/AddSocialMedia";
import { useImageFunctions } from "../../../hooks/useImageFunctions";
import { FIRESTORE_DB, storage, FIREBASE_AUTH } from "../../../firebase/firebase.config";
import {
  updateDoc,
  doc,
} from "firebase/firestore";

const SetupProfileScreen = ({ navigation, route }) => {
  const { userData } = route.params;
  const defaultImage = userData.photoUrl ? { uri: userData.photoUrl } : null;
  
  const [sourceImage, setImage] = useState(defaultImage); // Set default user image
  const [fullName, setFullName] = useState(userData.fullname || "");
  const [contactNumber, setContactNumber] = useState(userData.contactnumber || "");
  const [website, setWebsite] = useState(userData.websiteurl || "");
  const [facebook, setFacebook] = useState(userData.facebook || "");
  const [instagram, setInstagram] = useState(userData.instagram || "");
  const [dateOfBirth, setDateOfBirth] = useState(userData.dateofbirth || "");
  const [bio, setBio] = useState(userData.biography || "");

  const [modalIsVisible, setModalIsVisible] = useState(false);
  
  const { pickOneImage, imageUrl } = useImageFunctions();
  
  // Set selected image as the profile image
  const handleImagePick = async () => {
    await pickOneImage();
    if (imageUrl) {
      setImage({ uri: imageUrl });
    }
  };

  const handleOpenModal = () => setModalIsVisible(true);
  const handleCloseModal = () => setModalIsVisible(false);

  const user = FIREBASE_AUTH.currentUser;
  const docRef = doc(FIRESTORE_DB, "artists", user.uid);

 const updateProfileData = () => {
  // Build the update object
  const updatePayload = {
    fullname: fullName,
    contactnumber: contactNumber,
    websiteurl: website,
    dateofbirth: dateOfBirth,
    biography: bio,
    facebook: facebook,
    instagram: instagram,
  };

  // Conditionally add `photoUrl` only if it exists
  if (imageUrl || userData.imageUrl) {
    updatePayload.imageUrl = imageUrl || userData.imageUrl;
  }

  updateDoc(docRef, updatePayload)
    .then(() => {
      alert("Profile updated successfully");
      navigation.popToTop();
    })
    .catch((error) => {
      alert("Error updating profile: " + error.message);
    });
};


  const handleSaveProfile = () => {
    console.log("Profile Data:");
    console.log("Image:", imageUrl || userData.photoUrl);
    console.log("Full Name:", fullName);
    console.log("Contact Number:", contactNumber);
    console.log("Website:", website);
    console.log("Date of Birth:", dateOfBirth);
    console.log("Bio:", bio);

    updateProfileData();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.popToTop()}
          >
            <Icon name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.exhibitionText}> Edit Profile</Text>
        </View>
        <View>
          <View style={styles.imageContainer}>
            {imageUrl ? (
              <Image
                source={{ uri: imageUrl }}
                style={styles.profileImage}
              />
            ) : (
              <Image
                source={sourceImage}
                style={styles.profileImage}
              />
            )}
            <TouchableOpacity onPress={pickOneImage}>
              <Icon
                name="camera"
                size={20}
                color="gray"
                style={styles.cameraIcon}
              />
            </TouchableOpacity>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={handleOpenModal}>
                <Icon
                  name="facebook"
                  size={25}
                  style={styles.socialMediaIcon}
                  color="gray"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleOpenModal}>
                <Icon
                  name="instagram"
                  size={25}
                  style={styles.socialMediaIcon}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
              <Icon
                name="plus"
                style={styles.plusIcon}
                size={20}
                color="white"
              />
              <Text style={styles.smallerButtonText}>ADD SOCIAL MEDIA</Text>
            </TouchableOpacity>
            <AddSocialMedia
              visible={modalIsVisible}
              closeModal={handleCloseModal}
              setLinks={{ setInstagram, setFacebook }}
            />
          </View>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="white"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          placeholderTextColor="white"
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Website"
          placeholderTextColor="white"
          value={website}
          onChangeText={setWebsite}
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          placeholderTextColor="white"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.bioInput}
          placeholder="Bio"
          placeholderTextColor="white"
          value={bio}
          onChangeText={setBio}
          multiline
        />
        <TouchableOpacity
          style={styles.signInButton}
          onPress={handleSaveProfile}
        >
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
    paddingTop: 40,
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
  signInButton: {
    width: "100%",
    height: 50,
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
  header: {
    fontSize: 44,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    textAlign: "left",
  },
  smallerText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 14,
  },
  imageContainer: {
    marginTop: 40,
    marginBottom: 30,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    height: 250,
  },
  button: {
    marginTop: 15,
    backgroundColor: "transparent", // Set this to your desired button color
    padding: 12,
    borderRadius: 5,
    marginBottom: 30,
    borderRadius: 50,
    flexDirection: "row",
    backgroundColor: "gray",
  },
  smallerButtonText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 14,
  },
  iconContainer: {
    marginTop: 30,
    flexDirection: "row",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerButton: {
    padding: 10,
  },
  exhibitionText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
});

export default SetupProfileScreen;
