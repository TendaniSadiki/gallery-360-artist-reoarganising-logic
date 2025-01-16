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
import { useImageFunctions } from "../../hooks/useImageFunctions";
import AddSocialMedia from "./AddSocialMedia";
import DateTimePicker from "@react-native-community/datetimepicker";

import useInput from "../../hooks/useDateTimePicker";



const SetupProfileScreenClone = ({ navigation }) => {

  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [localArea, setLocalArea] = useState(""); // Added
  const [type, setType] = useState(""); // Added
  const [zone, setZone] = useState(""); // Added
  const [country, setCountry] = useState(""); // Added
  const [longitude, setLongitude] = useState(null); // Added
  const [latitude, setLatitude] = useState(null); // Added
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const input = useInput();
  const { pickOneImage, image, imageUrl, video, videoUrl, progress, pickVideo } = useImageFunctions();

  const onRegionChange = (region) => {
    setLatitude(region.latitude);
    setLongitude(region.longitude);
  };
  const validateForm = () => {
  };



  const handleSaveProfile = async () => {

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
          <View style={styles.mapContainer}>
            {/* <MapView
              style={styles.map}
              initialRegion={{
                latitude: latitude || -34.9285, // Default coordinates if latitude is not set
                longitude: longitude || 138.6007, // Default coordinates if longitude is not set
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onRegionChangeComplete={onRegionChange}
            >
              {latitude && longitude && <Marker coordinate={{ latitude, longitude }} />}
            </MapView> */}
          </View>
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
            placeholder="LOCAL AREA"
            placeholderTextColor="white"
            value={localArea}
            onChangeText={(text) => {
              setErrors({});
              setLocalArea(text);
            }}
          />
          {errors.localArea && <Text style={styles.errorMessage}>{errors.localArea}</Text>}

          <TextInput
            style={styles.input}
            placeholder="TYPE"
            placeholderTextColor="white"
            value={type}
            onChangeText={(text) => {
              setErrors({});
              setType(text);
            }}
          />
          {errors.type && <Text style={styles.errorMessage}>{errors.type}</Text>}

          <TextInput
            style={styles.input}
            placeholder="ZONE"
            placeholderTextColor="white"
            value={zone}
            onChangeText={(text) => {
              setErrors({});
              setZone(text);
            }}
          />
          {errors.zone && <Text style={styles.errorMessage}>{errors.zone}</Text>}

          <TextInput
            style={styles.input}
            placeholder="COUNTRY"
            placeholderTextColor="white"
            value={country}
            onChangeText={(text) => {
              setErrors({});
              setCountry(text);
            }}
          />
          {errors.country && <Text style={styles.errorMessage}>{errors.country}</Text>}

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
            // value={input.date ? input.date.toLocaleDateString() : ""} 'Is it not '
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
  mapContainer: {
    height: 300, // Adjust height as needed
    marginVertical: 20,
  },
  map: {
    flex: 1,
    borderRadius: 10,
  },
});

export default SetupProfileScreenClone;