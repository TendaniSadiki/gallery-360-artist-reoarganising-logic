import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import DateTimePicker from '@react-native-community/datetimepicker';
import AddSocialMedia from "../../SignUp/AddSocialMedia";
import { useImageFunctions } from "../../../hooks/useImageFunctions";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../../firebase/firebase.config";
import { updateDoc, doc } from "firebase/firestore";

const SetupProfileScreen = ({ navigation, route }) => {
  const { userData } = route.params;
  const defaultImage = userData?.photoUrl ? { uri: userData.photoUrl } : null;

  const [sourceImage, setImage] = useState(defaultImage); // Set default user image
  const [fullName, setFullName] = useState(userData?.fullname || "");
  const [contactNumber, setContactNumber] = useState(userData?.contactnumber || "");
  const [streetAddress, setStreetAddress] = useState(userData?.address?.street || "");
  const [city, setCity] = useState(userData?.address?.city || "");
  const [province, setProvince] = useState(userData?.address?.province || "");
  const [postalCode, setPostalCode] = useState(userData?.address?.postalCode || "");
  const [localArea, setLocalArea] = useState(userData?.address?.localArea || "");
  const [type, setType] = useState(userData?.address?.type || "");
  const [zone, setZone] = useState(userData?.address?.zone || "");
  const [country, setCountry] = useState(userData?.address?.country || "");
  const [website, setWebsite] = useState(userData?.websiteurl || "");
  const [facebook, setFacebook] = useState(userData?.facebook || "");
  const [instagram, setInstagram] = useState(userData?.instagram || "");
  const [dateOfBirth, setDateOfBirth] = useState(userData?.dateofbirth || "");
  const [bio, setBio] = useState(userData?.biography || "");
  const [idNumber, setIdNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [isImagePreviewVisible, setImagePreviewVisible] = useState(false);

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

  const handleOpenImagePreview = () => setImagePreviewVisible(true);
  const handleCloseImagePreview = () => setImagePreviewVisible(false);

  const user = FIREBASE_AUTH.currentUser;
  const docRef = doc(FIRESTORE_DB, "artists", user.uid);

  const validateForm = () => {
    let validationErrors = {};

    if (!fullName.trim()) {
      validationErrors.fullName = "Full name is required";
    }

    if (!contactNumber.trim()) {
      validationErrors.contactNumber = "Contact number is required";
    }

    if (!streetAddress.trim()) {
      validationErrors.streetAddress = "Street address is required";
    }

    if (!city.trim()) {
      validationErrors.city = "City is required";
    }

    if (!province.trim()) {
      validationErrors.province = "Province is required";
    }

    if (!postalCode.trim()) {
      validationErrors.postalCode = "Postal code is required";
    }

    if (!localArea.trim()) {
      validationErrors.localArea = "Local area is required";
    }

    if (!type.trim()) {
      validationErrors.type = "Type is required";
    }

    if (!zone.trim()) {
      validationErrors.zone = "Zone is required";
    }

    if (!country.trim()) {
      validationErrors.country = "Country is required";
    }

    if (!website.trim()) {
      validationErrors.website = "Website is required";
    }

    if (!dateOfBirth.trim()) {
      validationErrors.dateOfBirth = "Date of birth is required";
    }

    if (!bio.trim()) {
      validationErrors.bio = "Bio is required";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const updateProfileData = () => {
    if (!validateForm()) {
      setErrorModalVisible(true);
      return;
    }

    // Build the update object
    const updatePayload = {
      fullname: fullName,
      contactnumber: contactNumber,
      address: {
        street: streetAddress,
        city: city,
        province: province,
        postalCode: postalCode,
        localArea: localArea,
        type: type,
        zone: zone,
        country: country,
      },
      websiteurl: website,
      dateofbirth: dateOfBirth,
      biography: bio,
      facebook: facebook,
      instagram: instagram,
    };

    // Conditionally add `photoUrl` only if it exists
    if (imageUrl || userData?.imageUrl) {
      updatePayload.imageUrl = imageUrl || userData.imageUrl;
    }

    updateDoc(docRef, updatePayload)
      .then(() => {
        alert("Profile updated successfully");
        navigation.navigate("ArtWorkUpdate", { userData });
      })
      .catch((error) => {
        alert("Error updating profile: " + error.message);
      });
  };

  const handleNext = () => {
    updateProfileData();
  };

  const handleSkip = () => {
    navigation.navigate("ArtWorkUpdate", { userData });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setDateOfBirth(currentDate.toISOString().split('T')[0]); // Format date as YYYY-MM-DD
  };

  const handleIdNumberChange = (text) => {
    setIdNumber(text);
    if (text.length >= 6) {
      const year = text.substring(0, 2);
      const month = text.substring(2, 4);
      const day = text.substring(4, 6);
      const fullYear = parseInt(year) < 50 ? `20${year}` : `19${year}`; // Adjust century
      const date = new Date(`${fullYear}-${month}-${day}`);
      setDateOfBirth(date.toISOString().split('T')[0]);
    }
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
              <TouchableOpacity onPress={handleOpenImagePreview}>
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleOpenImagePreview}>
                <Image
                  source={sourceImage}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
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
          placeholder="Street Address"
          placeholderTextColor="white"
          value={streetAddress}
          onChangeText={setStreetAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          placeholderTextColor="white"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.input}
          placeholder="Province"
          placeholderTextColor="white"
          value={province}
          onChangeText={setProvince}
        />
        <TextInput
          style={styles.input}
          placeholder="Postal Code"
          placeholderTextColor="white"
          value={postalCode}
          onChangeText={setPostalCode}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Local Area"
          placeholderTextColor="white"
          value={localArea}
          onChangeText={setLocalArea}
        />
        <TextInput
          style={styles.input}
          placeholder="Type"
          placeholderTextColor="white"
          value={type}
          onChangeText={setType}
        />
        <TextInput
          style={styles.input}
          placeholder="Zone"
          placeholderTextColor="white"
          value={zone}
          onChangeText={setZone}
        />
        <TextInput
          style={styles.input}
          placeholder="Country"
          placeholderTextColor="white"
          value={country}
          onChangeText={setCountry}
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
          placeholder="ID Number"
          placeholderTextColor="white"
          value={idNumber}
          onChangeText={handleIdNumberChange}
          keyboardType="numeric" // Ensure numeric input
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={styles.input}
            placeholder="Date of Birth"
            placeholderTextColor="white"
            value={dateOfBirth}
            editable={false} // Make the TextInput non-editable
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dateOfBirth ? new Date(dateOfBirth) : new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
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
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={handleSkip}
        >
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Error Modal */}
      <Modal visible={isErrorModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.header}>Error</Text>
            {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
            {errors.contactNumber && <Text style={styles.errorText}>{errors.contactNumber}</Text>}
            {errors.streetAddress && <Text style={styles.errorText}>{errors.streetAddress}</Text>}
            {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
            {errors.province && <Text style={styles.errorText}>{errors.province}</Text>}
            {errors.postalCode && <Text style={styles.errorText}>{errors.postalCode}</Text>}
            {errors.localArea && <Text style={styles.errorText}>{errors.localArea}</Text>}
            {errors.type && <Text style={styles.errorText}>{errors.type}</Text>}
            {errors.zone && <Text style={styles.errorText}>{errors.zone}</Text>}
            {errors.country && <Text style={styles.errorText}>{errors.country}</Text>}
            {errors.website && <Text style={styles.errorText}>{errors.website}</Text>}
            {errors.dateOfBirth && <Text style={styles.errorText}>{errors.dateOfBirth}</Text>}
            {errors.bio && <Text style={styles.errorText}>{errors.bio}</Text>}
            <TouchableOpacity style={styles.button} onPress={() => setErrorModalVisible(false)}>
              <Text style={styles.buttonText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Image Preview Modal */}
      <Modal visible={isImagePreviewVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Image
              source={imageUrl ? { uri: imageUrl } : sourceImage}
              style={styles.previewImage}
            />
            <TouchableOpacity style={styles.button} onPress={handleCloseImagePreview}>
              <Text style={styles.buttonText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

    marginTop: 10,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "black",
    borderRadius: 10,
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
  },
  previewImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
});

export default SetupProfileScreen;
