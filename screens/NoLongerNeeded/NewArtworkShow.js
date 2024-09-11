import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Replace "FontAwesome" with the icon library of your choice.
import Carousel from "react-native-snap-carousel"; // Import the library for the carousel.
import { setDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB, storage } from "../../firebase/firebase.config";
import auth from "../../firebase/firebase.config.js";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

//import BottomNavigationMenu from "./screens/Tabs/components/BottomNavigationMenu";

const ExhibitionScreen = ({ route, navigation }) => {
  const [selectedCondition, setSelectedCondition] = useState([]);
  const coverImage = require("../../assets/images/red-house.png"); // Replace with the path to your cover image
  const artworks = ["I agree to Gallery360's Terms & Conditions"];
  const availability = ["Stand alone", "Limited Edition"];
  const [images, setImages] = useState([]);
  const [imagesUrls, setImagesUrls] = useState([]);

  // const images = [
  //   // require("../../assets/images/red-house.png"), // Replace with the paths to your carousel images
  //   // require("../../assets/images/red-house.png"),
  //   // require("../../assets/images/red-house.png"),
  //   // Add more carousel images as needed
  // ];

  const [progress, setProgress] = useState("");
  //const [image, setImage] = useState("");
  function handleArtworkSelection(artwork) {
    setSelectedCondition((prevSelected) =>
      prevSelected.includes(artwork)
        ? prevSelected.filter((item) => item !== artwork)
        : [...prevSelected, artwork]
    );
  }

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const source = { uri: result.assets[0].uri };
      //setImage(source);
      //images.push(source);
      const updatedImages = [...images, source];

      setImages(updatedImages);
      // setImage(result.assets[0].uri);
      // upload the image
      //  await uploadImage(result.assets[0].uri, "image");
    }
  }
  async function uploadImage(uri, fileType) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "Artworks/" + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for events
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress.toFixed());
      },
      (error) => {
        // handle error
        console.log({ errorInNewArtwork: error });
        alert("Upload Error : ", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          // save record
          //setImageUrl(downloadURL);
          const newImageUrl = [...imagesUrls, downloadURL];
          setImagesUrls(newImageUrl);
          await saveRecord(fileType, downloadURL, new Date().toISOString());
        });
      }
    );
  }

  const {
    title,
    width,
    height,
    year,
    condition,
    isAvailable,
    statement,
    imageUrl,
    image,
    medium,
    artworkType,
    price,
    selectedArtworks,
  } = route.params;

  const user = auth.currentUser;
  const writeUserData = () => {
    setDoc(doc(FIRESTORE_DB, "Market", user.uid), {
      title: title,
      dimensions: { width: width, height: height },
      year: year,
      condition: condition,
      isAvailable: isAvailable,
      statement: statement,
      imgUrls: imagesUrls,
      medium: medium,
      price: price,
      artworkType: artworkType,
      availability: selectedArtworks,
      ArtistUid: user.uid,
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

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <Text style={styles.exhibitionText}>New Artwork</Text>
        </View>
      </View>

      <ScrollView>
        {/* <View style={styles.coverImageContainer}>
          <Image source={coverImage} style={styles.coverImage} />
          <Icon
            name="envelope"
            size={20}
            color="red"
            style={{
              padding: 10,
              backgroundColor: "white",
              borderRadius: 20,
              position: "absolute",
              alignSelf: "center",
              bottom: -20,
            }}
          />
        </View> */}
        {image ? (
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
        ) : (
          <View style={styles.coverImageContainer}>
            <Image source={coverImage} style={styles.coverImage} />
            <Icon
              name="envelope"
              size={20}
              color="red"
              style={{
                padding: 10,
                backgroundColor: "white",
                borderRadius: 20,
                position: "absolute",
                alignSelf: "center",
                bottom: -20,
              }}
            />
          </View>
        )}

        <Carousel
          data={images}
          renderItem={({ item }) => (
            <Image source={item} style={styles.carouselImage} />
          )}
          sliderWidth={300}
          itemWidth={160}
        />
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
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
        <View style={styles.detailsContainer}>
          <Text style={styles.input}>{title}</Text>
          <Text style={styles.input}>COLLECTION</Text>
          <View
            style={[styles.availability, styles.availabilityCheckboxContainer]}
          >
            {availability.map((artwork, index) => (
              <View
                style={{
                  flexDirection: "row",

                  marginBottom: 20,
                }}
              >
                <TouchableOpacity
                  key={index}
                  style={[
                    selectedCondition.includes(artwork) &&
                      styles.selectedCheckbox,
                  ]}
                  onPress={() => handleArtworkSelection(artwork)}
                >
                  <View style={styles.availabilityCheckbox}>
                    {selectedCondition.includes(artwork) && (
                      <Icon name="check" size={18} color="white" />
                    )}
                  </View>
                </TouchableOpacity>
                <Text
                  //  key={index}
                  style={[
                    styles.availabilityCheckboxText,
                    selectedCondition.includes(artwork) && styles.selectedText,
                  ]}
                >
                  {artwork}
                </Text>
              </View>
            ))}
          </View>
          <Text style={styles.input}>{artworkType}</Text>
          <Text style={styles.description}>{statement}</Text>
          <View style={styles.returnPolicytextContainer}>
            <Text style={styles.returnPolicytext}>Return Policy </Text>
            <Text style={styles.returnPolicytext2}>GALLERY360</Text>
          </View>

          <View style={[styles.artWorks, styles.checkboxContainer]}>
            {artworks.map((artwork, index) => (
              <>
                <TouchableOpacity
                  key={index}
                  style={[
                    selectedArtworks.includes(artwork) &&
                      styles.selectedCheckbox,
                  ]}
                  onPress={() => handleArtworkSelection(artwork)}
                >
                  <View style={styles.checkbox}>
                    {selectedArtworks.includes(artwork) && (
                      <Icon name="check" size={18} color="white" />
                    )}
                  </View>
                </TouchableOpacity>
                <Text
                  //  key={index}
                  style={[
                    styles.checkboxText,
                    selectedArtworks.includes(artwork) && styles.selectedText,
                  ]}
                >
                  {artwork}
                </Text>
              </>
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigation.navigate("SearchArtwork")}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Set this to your desired background color for the whole screen
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    padding: 10,
  },
  exhibitionText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginTop: 25,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  detailsContainer: {
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 20,
  },

  coverImageContainer: {
    paddingHorizontal: 10,
    marginBottom: 25,
  },
  coverImage: {
    width: "100%",
    height: 500, // Adjust this value to control the image height
    resizeMode: "cover",
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
  },

  carouselImage: {
    width: 150,
    height: 150, // Adjust this value to control the image height
    borderRadius: 15,
    alignSelf: "center",
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: "white",
    paddingHorizontal: 20,
    paddingBottom: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
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
  imageContainer: {
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
  },
  cameraIcon: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 20,
    position: "absolute",
    bottom: "80%", // Move the camera icon a bit lower to center it
  },
  textIcon: {
    color: "#fff",
    fontSize: 14,
    position: "absolute",
    bottom: "50%",
  },
  textIcon2: {
    color: "gray",
    fontSize: 14,
    position: "absolute",
    bottom: "15%",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    //marginRight: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 5,
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 15,
  },
  checkboxText: {
    color: "white",
    // textTransform: "uppercase",
  },
  selectedCheckbox: {
    backgroundColor: "#CEB89E", // Customize the background color when the checkbox is selected
  },
  selectedText: {
    fontWeight: "bold", // Customize the style when the checkbox is selected
  },
  artWorks: {
    flexDirection: "column",
    justifyContent: "space-between",
    //flexWrap: "wrap",
  },
  signInButton: {
    width: "90%",
    alignSelf: "center",
    height: 50,
    backgroundColor: "#CEB89E",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  // buttonContainer: {
  //   position: "relative",
  // },
  availabilityCheckboxContainer: {
    flexDirection: "column",
    //alignItems: "center",
    justifyContent: "space-around",
    margin: 5,
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 20,
  },
  availability: {
    flexDirection: "column",
    // justifyContent: "space-between",
    //flexWrap: "wrap",
  },
  availabilityCheckboxText: {
    color: "white",
    marginLeft: 10,
  },
  availabilityCheckbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  returnPolicytextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  returnPolicytext: {
    color: "#fff",
    fontSize: 16,
  },
  returnPolicytext2: {
    color: "gray",
    fontSize: 14,
  },
});

export default ExhibitionScreen;
