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
import AddSocialMedia from "./AddSocialMedia";
import { useImageFunctions } from "../../hooks/useImageFunctions";
import useInput from "../../hooks/useDateTimePicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { doc, setDoc } from "firebase/firestore";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../firebase/firebase.config.js";

const SetupProfileScreen = ({ navigation }) => {
  
  const auth = FIREBASE_AUTH;
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); 

  const input = useInput();
  const { pickOneImage, image, imageUrl, video, videoUrl, progress, pickVideo } = useImageFunctions();

  const validateForm = () => {
    let validationErrors = {};

    // Full Name Validation
    if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(fullName.trim())) {
      validationErrors.fullName = "Please enter a valid full name (e.g., John Doe)";
    }

    // Contact Number Validation
    if (!/^\d{10}$/.test(contactNumber)) {
      validationErrors.contactNumber = "Please enter a valid contact number (10 digits)";
    }

    // Physical Address Validation
    if (!streetAddress.trim()) {
      validationErrors.streetAddress = "Street address is required";
    }
    if (!city.trim()) {
      validationErrors.city = "City or suburb is required";
    }
    if (!province.trim()) {
      validationErrors.province = "Province is required";
    }
    if (!/^\d{4}$/.test(postalCode)) {
      validationErrors.postalCode = "Please enter a valid 4-digit postal code";
    }
    // Website URL Validation
    if (website && !/^(http|https):\/\/[^\s]+/.test(website)) {
      validationErrors.website = "Please enter a valid website URL (starting with http or https)";
    }

    // Profile Image Validation
    if (!image) {
      validationErrors.image = "Profile image is required";
      console.log("Image is not defined");
    }

    // Date of Birth Validation
    if (!input.date) {
      validationErrors.dateOfBirth = "Please select your date of birth";
      console.log("Date:", input.date);

    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (validateForm()) {
      try {
        const user = auth.currentUser; // Get the current user
        if (user) {
          const uid = user.uid; // Get the user's UID
          console.log("User UID:", uid);

          // Define the user data to save
          const userData = {
            fullname: fullName,
            contactnumber: contactNumber,
            address: {
              street: streetAddress,
              city: city,
              province: province,
              postalCode: postalCode,
            },
            websiteurl: website,
            dateofbirth: input.date ? input.date.toLocaleDateString() : "",
            biography: bio,
            imageUrl: imageUrl || "",  // Ensure it's not undefined
            facebook: facebook || "",  // Ensure it's not undefined
            instagram: instagram || "",  // Ensure it's not undefined
            videoUrl: videoUrl || "",
          };
          console.log("User Data:", userData);

          // Save the profile data to Firestore
          const userDocRef = doc(FIRESTORE_DB, "artists", uid);
          await setDoc(userDocRef, userData);

          // Navigate to the Artwork screen, passing userData
          navigation.navigate("Artwork", { userData });
        } else {
          console.log("User is not authenticated");
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    }
  };

  const handleOpenModal = () => setModalIsVisible(true);
  const handleCloseModal = () => setModalIsVisible(false);


  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ marginBottom: 90 }}>
          <Text style={styles.header}>Setup Profile</Text>
          <Text style={styles.smallerText}>
            Once your profile is complete, you can start uploading your artwork.
          </Text>
        </View>

        <View>
          {/* Profile Image Section */}
          <View style={styles.imageContainer}>
            <Image
              source={image ? { uri: image } : require("../../assets/images/profile_image.jpg")}
              style={{
                width: 150,
                height: 150,
                alignSelf: "center",
                borderRadius: 75,
              }}
            />
            <TouchableOpacity onPress={pickOneImage}>
              <Icon
                name="camera"
                size={20}
                color="gray"
                style={styles.cameraIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Upload Progress */}
          {progress !== 0 && (
            <Text style={styles.smallerText}>
              {progress < 100 ? `Uploading...${progress}%` : "Image Uploaded"}
            </Text>
          )}
          {errors.image && <Text style={styles.errorMessage}>{errors.image}</Text>}

          {/* Video Section */}
          <Text style={styles.smallerText}>Please record a (5mb) video introducing yourself</Text>
          {video && (
            <Text style={{ color: "gray", fontSize: 14 }}>
              {video.split("Picker/")[1]}
            </Text>
          )}
          <TouchableOpacity style={styles.button} onPress={pickVideo}>
            <Icon name="play" style={{ marginHorizontal: 12 }} size={20} color="white" />
            <Text style={styles.smallerButtonText}>UPLOAD VIDEO</Text>
          </TouchableOpacity>

          {/* Social Media Section */}
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleOpenModal}>
              <Icon name="facebook" size={25} style={styles.socialIcon} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOpenModal}>
              <Icon name="instagram" size={25} style={styles.socialIcon} color="gray" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
            <Icon name="plus" style={{ marginRight: 10 }} size={20} color="white" />
            <Text style={styles.smallerButtonText}>ADD SOCIAL MEDIA</Text>
          </TouchableOpacity>

          <AddSocialMedia visible={modalIsVisible} closeModal={handleCloseModal} setLinks={{ setInstagram, setFacebook }} />
        </View>

        {/* Form Section */}
        <View style={{ marginTop: 120 }}>
          <TextInput
            style={styles.input}
            placeholder="FULL NAME"
            placeholderTextColor="white"
            value={fullName}
            onChangeText={(text) => {
              setErrors({});
              setFullName(text);
            }}
          />
          {errors.fullName && <Text style={styles.errorMessage}>{errors.fullName}</Text>}

          <TextInput
            style={styles.input}
            placeholder="CONTACT NUMBER"
            placeholderTextColor="white"
            value={contactNumber}
            onChangeText={(text) => {
              setErrors({});
              setContactNumber(text);
            }}
            maxLength={10}
            keyboardType="numeric"
          />
          {errors.contactNumber && <Text style={styles.errorMessage}>{errors.contactNumber}</Text>}
          <TextInput
          style={styles.input}
          placeholder="STREET ADDRESS"
          placeholderTextColor="white"
          value={streetAddress}
          onChangeText={(text) => {
            setErrors({});
            setStreetAddress(text);
          }}
        />
        {errors.streetAddress && <Text style={styles.errorMessage}>{errors.streetAddress}</Text>}

        <TextInput
          style={styles.input}
          placeholder="CITY / SUBURB"
          placeholderTextColor="white"
          value={city}
          onChangeText={(text) => {
            setErrors({});
            setCity(text);
          }}
        />
        {errors.city && <Text style={styles.errorMessage}>{errors.city}</Text>}

        <TextInput
          style={styles.input}
          placeholder="PROVINCE"
          placeholderTextColor="white"
          value={province}
          onChangeText={(text) => {
            setErrors({});
            setProvince(text);
          }}
        />
        {errors.province && <Text style={styles.errorMessage}>{errors.province}</Text>}

        <TextInput
          style={styles.input}
          placeholder="POSTAL CODE"
          placeholderTextColor="white"
          value={postalCode}
          onChangeText={(text) => {
            setErrors({});
            setPostalCode(text);
          }}
          keyboardType="numeric"
        />
        {errors.postalCode && <Text style={styles.errorMessage}>{errors.postalCode}</Text>}

          <TextInput
            style={styles.input}
            placeholder="WEBSITE"
            placeholderTextColor="white"
            value={website}
            onChangeText={(text) => {
              setErrors({});
              setWebsite(text);
            }}
          />
          {errors.website && <Text style={styles.errorMessage}>{errors.website}</Text>}

          {/* Date Picker */}
          <TextInput
            style={styles.input}
            placeholder="DATE OF BIRTH"
            placeholderTextColor="white"
            value={input.date ? input.date.toLocaleDateString() : ""}
            onPressIn={input.showDatepicker}
          />
          {input.show && (
            <DateTimePicker
              testID="dateTimePicker2"
              value={input.date}
              mode={input.mode}
              is24Hour={true}
              display="default"
              onChange={input.onChange}
            />
          )}
          {errors.dateOfBirth && <Text style={styles.errorMessage}>{errors.dateOfBirth}</Text>}

          {/* Bio Section */}
          <TextInput
            style={styles.textArea}
            placeholder="BIO"
            placeholderTextColor="white"
            value={bio}
            onChangeText={(text) => {
              setErrors({});
              setBio(text);
            }}
            multiline
          />
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={handleSaveProfile}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 40,
    padding: 20,
  },
  input: {
    width: "100%",
    height: 50,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 12,
    marginBottom: 20,
    color: "#fff",
  },
  textArea: {
    width: "100%",
    height: 100,
    fontSize: 16,
    borderBottomWidth: 1,
    paddingHorizontal: 12,
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
    color: "#fff",
    fontSize: 14,
  },
  imageContainer: {
    marginTop: 40,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    height: 250,
  },
  cameraIcon: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 20,
    position: "absolute",
    bottom: -10,
    alignSelf: "center",
  },
  button: {
    marginTop: 15,
    backgroundColor: "gray",
    padding: 12,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  smallerButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  iconContainer: {
    marginTop: 30,
    flexDirection: "row",
  },
  socialIcon: {
    padding: 15,
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
});

export default SetupProfileScreen;
