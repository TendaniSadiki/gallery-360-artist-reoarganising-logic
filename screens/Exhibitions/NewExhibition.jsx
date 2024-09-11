import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "./styles";
import auth from "../../firebase/firebase.config.js";
// import { setDoc, doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB, storage } from "../../firebase/firebase.config";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import Carousel from "react-native-snap-carousel"; // Import the library for the carousel.

import { useImageFunctions } from "../../hooks/useImageFunctions";

import AsyncStorage from "@react-native-async-storage/async-storage";

import DateTimePicker from "@react-native-community/datetimepicker";

import CustomDateTimePicker from "../../components/DateTimePicker";

import useInput from "../../hooks/useDateTimePicker";

const SetupProfileScreen = ({ navigation }) => {
  console.log('in new exhibiton');
  const input = useInput();
  const input2 = useInput();
  const input3 = useInput();
  const input4 = useInput();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [desc, setDesc] = useState("");

  const options = { month: "long" };
  const fullMonthName = input.date.toLocaleString("en-US", options);
  const fullMonthName2 = input2.date.toLocaleString("en-US", options);
  const [errors, setErrors] = useState({});
  // const fromDate = input.date;
  // Create a JavaScript Date object
  const myDate = new Date("2023-11-30");

  const fromDate = Timestamp.fromDate(input.date);
  const toDate = Timestamp.fromDate(input2.date);

  // Convert the Date object to a Firestore Timestamp

  console.log("fromDate : ", fromDate);
  console.log("toDate : ", toDate);

  const fromTime = input3.date.toLocaleTimeString().slice(0, 5).toString();
  const toTime = input4.date.toLocaleTimeString().slice(0, 5).toString();

  const [selectedArtworks, setSelectedArtworks] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("selectedArtworks").then((data) => {
      if (data) {
        setSelectedArtworks(JSON.parse(data));

        AsyncStorage.removeItem("selectedArtworks")
          .then(() => {
            console.log("Data removed from AsyncStorage");
          })
          .catch((error) => {
            console.error("Error removing data from AsyncStorage: ", error);
          });
      } else {
        // Handle the case when there's no data in AsyncStorage.
        // For example, set a default value.
        console.log("The asyncStorage is empty");
        setSelectedArtworks([]); // Set an empty array as the default value
      }
    });
  }, []);

  const user = auth.currentUser;
  const colRef = collection(FIRESTORE_DB, "exhibition");

  const { pickOneImage, image, imagesUrls, images } = useImageFunctions();

  function validateEvent() {
    let errors = {};

    // Check for falsy values
    if (!name) {
      errors.name = "Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!contactNumber) {
      errors.contactNumber = "Contact Number is required";
    }
    if (!address) {
      errors.address = "Address is required";
    }
    // if (!date || !date.fromDate || !date.toDate) {
    //   errors.date = "Invalid date range. From and To dates are required.";
    // }
    // if (!time || !time.fromTime || !time.toTime) {
    //   errors.time = "Invalid time range. From and To times are required.";
    // }
    if (!desc) {
      errors.desc = "Description is required.";
    }
    // if (!imgUrls || !imgUrls.length) {
    //   errors.imgUrls = "Please upload at least one image.";
    // }
    // if (!collections || !collections.length) {
    //   errors.collections = "Please select at least one collection.";
    // }

    setErrors(errors);
    // Return errors as an array (empty if no errors)
    return Object.keys(errors).length === 0;
  }

  const writeUserData = () => {
    const handleAddDoc = () => {
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
          // Success callback
          console.log("data ", result);
          alert("data saved");
        })
        .catch((error) => {
          // Error callback
          alert(error);
          console.log("error ", error);
        });
    };
    handleAddDoc();
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

  // <View style={{ padding: 20 }}>
  //   <TextInput

  //     style={{ height: 40, borderWidth: 1, padding: 10 }}
  //   />
  // </View>

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
                    width: 150,
                    height: 150,
                    alignSelf: "center",
                    borderRadius: 75,
                    marginTop: 40,
                    padding: 20,
                    borderRadius: 10,
                    width: "100%",
                    height: 500, // Adjust this value to control the image height
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
                <Icon
                  name="camera"
                  size={20}
                  color="gray"
                  style={styles.cameraIcon}
                />
                <Text style={styles.textIcon}>Upload More</Text>
                <Text style={styles.textIcon2}>
                  Gallery must be from the same artwork
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <View>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={pickOneImage}
              >
                <Icon
                  name="camera"
                  size={20}
                  color="gray"
                  style={styles.cameraIcon}
                />
                <Text style={styles.textIcon}>Exhibition Thumbnail</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={styles.imageContainer2}
            onPress={() => {
              navigation.navigate("ExhibitionCollection");
            }}
          >
            <Icon
              name="image"
              size={20}
              color="gray"
              style={styles.cameraIcon2}
            />
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
        {errors.name ? (
          <Text style={styles.errorMessage}>{errors.name}</Text>
        ) : null}
        <Text
          style={{
            // height: 50,
            fontSize: 16,
            color: "#fff",
            paddingHorizontal: 12,
          }}
        >
          DATE
        </Text>
        {/* {errors.date ? (
          <Text style={styles.errorMessage}>{errors.date}</Text>
        ) : null} */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {input.toggleInput ? (
            <TextInput
              style={styles.dimensionsInput}
              placeholder="FROM"
              placeholderTextColor="white"
              value={input?.date.toLocaleDateString()}
              onPressIn={input.showDatepicker}
            />
          ) : (
            <TextInput
              style={styles.dimensionsInput}
              placeholder="FROM"
              placeholderTextColor="white"
              value={
                input.date !== null ? "" : input?.date.toLocaleDateString()
              }
              onPressIn={input.showDatepicker}
            />
          )}

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

          {input2.toggleInput ? (
            <TextInput
              style={styles.dimensionsInput}
              placeholder="TO"
              placeholderTextColor="white"
              value={input2?.date.toLocaleDateString()}
              onPressIn={input2.showDatepicker}
            />
          ) : (
            <TextInput
              style={styles.dimensionsInput}
              placeholder="TO"
              placeholderTextColor="white"
              value={
                input2.date !== null
                  ? ""
                  : input2?.date.toLocaleDateString().slice(0, 5)
              }
              onPressIn={input2.showDatepicker}
            />
          )}
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
        {/*Content of Single Collapsible*/}
        <Text
          style={{
            // height: 50,
            fontSize: 16,
            color: "#fff",
            paddingHorizontal: 12,
          }}
        >
          TIME
        </Text>
        {/* {errors.time ? (
          <Text style={styles.errorMessage}>{errors.time}</Text>
        ) : null} */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {input3.toggleInput ? (
            <TextInput
              style={styles.dimensionsInput}
              placeholder="FROM"
              placeholderTextColor="white"
              value={input3?.date.toLocaleTimeString()}
              onPressIn={input3.showDatepicker2}
            />
          ) : (
            <TextInput
              style={styles.dimensionsInput}
              placeholder="FROM"
              placeholderTextColor="white"
              value={
                input3.date !== null ? "" : input3?.date.toLocaleDateString()
              }
              onPressIn={input3.showDatepicker2}
            />
          )}
          {input3.show && (
            <DateTimePicker
              testID="dateTimePicker2"
              value={input3.date}
              mode={input3.mode}
              is24Hour={true}
              display="default"
              onChange={input3.onChange}
            />
          )}
          {input4.toggleInput ? (
            <TextInput
              style={styles.dimensionsInput}
              placeholder="TO"
              placeholderTextColor="white"
              value={input4?.date.toLocaleTimeString()}
              onPressIn={input4.showDatepicker2}
            />
          ) : (
            <TextInput
              style={styles.dimensionsInput}
              placeholder="TO"
              placeholderTextColor="white"
              value={
                input4.date !== null ? "" : input4?.date.toLocaleDateString()
              }
              onPressIn={input4.showDatepicker2}
            />
          )}
          {input4.show && (
            <DateTimePicker
              testID="dateTimePicker2"
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
          placeholder={
            isFocused
              ? "e.g. 123 street name, suburb, city, postal code"
              : "ADDRESS"
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor="white"
          value={address}
          onChangeText={setAddress}
        />
        {errors.address ? (
          <Text style={styles.errorMessage}>{errors.address}</Text>
        ) : null}
        {/* Contact Number Input */}
        <TextInput
          style={styles.input}
          placeholder="PHONE NUMBER"
          placeholderTextColor="white"
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="numeric"
          maxLength={10}
        />
        {errors.contactNumber ? (
          <Text style={styles.errorMessage}>{errors.contactNumber}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="EMAIL"
          placeholderTextColor="white"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email ? (
          <Text style={styles.errorMessage}>{errors.email}</Text>
        ) : null}
        {/* Desc Input */}
        <TextInput
          style={{
            width: "100%",
            height: 100,
            fontSize: 16,
            borderBottomWidth: 1,
            paddingHorizontal: 12,
            borderBottomColor: "#ccc",
            marginBottom: 20,
            color: "#fff",
          }}
          placeholder="DESCRIPTION"
          placeholderTextColor="white"
          value={desc}
          onChangeText={setDesc}
          multiline
        />
        {errors.desc ? (
          <Text style={styles.errorMessage}>{errors.desc}</Text>
        ) : null}
        {/* Save Profile Button */}
        <TouchableOpacity
          style={styles.signInButton}
          onPress={handleSaveProfile}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SetupProfileScreen;
