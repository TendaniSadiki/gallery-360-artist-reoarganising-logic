import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "./styles";
import auth from "../../firebase/firebase.config.js";
import { FIRESTORE_DB } from "../../firebase/firebase.config";
import {
  addDoc,
  collection,
  Timestamp,
} from "firebase/firestore";
import Carousel from "react-native-snap-carousel"; // Import the library for the carousel.
import { useImageFunctions } from "../../hooks/useImageFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import useInput from "../../hooks/useDateTimePicker";

const SetupProfileScreen = ({ navigation }) => {
  const input = useInput();
  const input2 = useInput();
  const input3 = useInput();
  const input4 = useInput();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [desc, setDesc] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedArtworks, setSelectedArtworks] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const fromDate = Timestamp.fromDate(input.date);
  const toDate = Timestamp.fromDate(input2.date);
  const fromTime = input3.date.toLocaleTimeString().slice(0, 5).toString();
  const toTime = input4.date.toLocaleTimeString().slice(0, 5).toString();
  
  const { pickOneImage, image, imagesUrls, images } = useImageFunctions();
  const user = auth.currentUser;
  const colRef = collection(FIRESTORE_DB, "exhibition");

  useEffect(() => {
    AsyncStorage.getItem("selectedArtworks").then((data) => {
      if (data) {
        setSelectedArtworks(JSON.parse(data));
        AsyncStorage.removeItem("selectedArtworks")
          .then(() => console.log("Data removed from AsyncStorage"))
          .catch((error) => console.error("Error removing data from AsyncStorage: ", error));
      } else {
        console.log("The asyncStorage is empty");
        setSelectedArtworks([]);
      }
    });
  }, []);

  function validateEvent() {
    let errors = {};
    if (!name) errors.name = "Name is required";
    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!contactNumber) errors.contactNumber = "Contact Number is required";
    if (!address) errors.address = "Address is required";
    if (!desc) errors.desc = "Description is required.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const writeUserData = () => {
    addDoc(colRef, {
      name,
      email,
      contactNumber,
      address,
      date: { fromDate: fromDate, toDate: toDate },
      time: { fromTime: fromTime, toTime: toTime },
      desc,
      imgUrls: imagesUrls,
      collections: selectedArtworks,
      artistUid: user.uid,
    })
      .then((result) => {
        console.log("Data saved", result);
        alert("Exhibition data saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving data: ", error);
        alert("Error saving data: " + error.message);
      });
  };

  const handleSaveProfile = () => {
    if (validateEvent()) {
      navigation.navigate("ExhibitionShow", {
        image,
        images,
        name,
        email,
        contactNumber,
        address,
        desc,
      });
      writeUserData();
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.header}>New Exhibition</Text>
        </View>
        <View>
          {image ? (
            <>
              <View>
                <Image
                  source={image}
                  style={{
                    width: "100%",
                    height: 500,
                    resizeMode: "cover",
                    borderRadius: 10,
                    marginBottom: 20,
                  }}
                />
              </View>
              <Text style={styles.header2}>EXHIBITION CONTENT</Text>
              <Carousel
                data={images}
                renderItem={({ item }) => (
                  <Image source={item} style={styles.carouselImage} />
                )}
                sliderWidth={300}
                itemWidth={160}
              />
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  padding: 20,
                  marginHorizontal: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "black",
                  height: 120,
                  borderWidth: 2,
                  borderColor: "white",
                  borderRadius: 10,
                  borderStyle: "dashed",
                }}
                onPress={pickOneImage}
              >
                <Icon name="camera" size={20} color="gray" style={styles.cameraIcon} />
                <Text style={styles.textIcon}>Upload More</Text>
                <Text style={styles.textIcon2}>Gallery must be from the same artwork</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View>
              <TouchableOpacity style={styles.imageContainer} onPress={pickOneImage}>
                <Icon name="camera" size={20} color="gray" style={styles.cameraIcon} />
                <Text style={styles.textIcon}>Exhibition Thumbnail</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={styles.imageContainer2}
            onPress={() => navigation.navigate("ExhibitionCollection")}
          >
            <Icon name="image" size={20} color="gray" style={styles.cameraIcon2} />
            <Text style={styles.textIcon}>Add Collection</Text>
          </TouchableOpacity>
        </View>
        
        <TextInput
          style={styles.input}
          placeholder="NAME"
          placeholderTextColor="white"
          value={name}
          onChangeText={setName}
        />
        {errors.name && <Text style={styles.errorMessage}>{errors.name}</Text>}

        <Text style={{ fontSize: 16, color: "#fff", paddingHorizontal: 12 }}>DATE</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            style={styles.dimensionsInput}
            placeholder="FROM"
            placeholderTextColor="white"
            value={input.date.toLocaleDateString()}
            onPressIn={input.showDatepicker}
          />
          {input.show && (
            <DateTimePicker
              testID="dateTimePicker1"
              value={input.date}
              mode={input.mode}
              is24Hour={true}
              display="default"
              onChange={input.onChange}
            />
          )}
          <TextInput
            style={styles.dimensionsInput}
            placeholder="TO"
            placeholderTextColor="white"
            value={input2.date.toLocaleDateString()}
            onPressIn={input2.showDatepicker}
          />
          {input2.show && (
            <DateTimePicker
              testID="dateTimePicker2"
              value={input2.date}
              mode={input2.mode}
              is24Hour={true}
              display="default"
              onChange={input2.onChange}
            />
          )}
        </View>

        <Text style={{ fontSize: 16, color: "#fff", paddingHorizontal: 12 }}>TIME</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            style={styles.dimensionsInput}
            placeholder="FROM"
            placeholderTextColor="white"
            value={input3.date.toLocaleTimeString()}
            onPressIn={input3.showDatepicker2}
          />
          {input3.show && (
            <DateTimePicker
              testID="dateTimePicker3"
              value={input3.date}
              mode={input3.mode}
              is24Hour={true}
              display="default"
              onChange={input3.onChange}
            />
          )}
          <TextInput
            style={styles.dimensionsInput}
            placeholder="TO"
            placeholderTextColor="white"
            value={input4.date.toLocaleTimeString()}
            onPressIn={input4.showDatepicker2}
          />
          {input4.show && (
            <DateTimePicker
              testID="dateTimePicker4"
              value={input4.date}
              mode={input4.mode}
              is24Hour={true}
              display="default"
              onChange={input4.onChange}
            />
          )}
        </View>

        <TextInput
          style={styles.input}
          placeholder="ADDRESS"
          placeholderTextColor="white"
          value={address}
          onChangeText={setAddress}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {errors.address && <Text style={styles.errorMessage}>{errors.address}</Text>}

        <TextInput
          style={styles.input}
          placeholder="DESCRIPTION"
          placeholderTextColor="white"
          value={desc}
          onChangeText={setDesc}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {errors.desc && <Text style={styles.errorMessage}>{errors.desc}</Text>}

        <TextInput
          style={styles.input}
          placeholder="CONTACT"
          placeholderTextColor="white"
          value={contactNumber}
          onChangeText={setContactNumber}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {errors.contactNumber && <Text style={styles.errorMessage}>{errors.contactNumber}</Text>}

        <TextInput
          style={styles.input}
          placeholder="EMAIL"
          placeholderTextColor="white"
          value={email}
          onChangeText={setEmail}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {errors.email && <Text style={styles.errorMessage}>{errors.email}</Text>}

        <View>
          <TouchableOpacity style={styles.signInButton} onPress={handleSaveProfile}>
            <Text style={styles.textIcon}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SetupProfileScreen;
