import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5"; // Replace "FontAwesome5" with the icon library of your choice.
import { useFetchArtworks } from "../../hooks/useFetchArtworks";
import { useCollection } from "../../hooks/useCollection";

import AsyncStorage from "@react-native-async-storage/async-storage";
import FIREBASE_AUTH, { FIRESTORE_DB } from "../../firebase/firebase.config";

const ArtworksScreen = ({ navigation }) => {
  console.log('in exhibition collection');
  const [selectedArtworks, setSelectedArtworks] = useState([]);
  const { artworkData, firebaseArtworks } = useFetchArtworks();

  function handleArtworkSelection(artwork) {
    const updatedArtworks = selectedArtworks.includes(artwork)
      ? selectedArtworks.filter((item) => item !== artwork)
      : [...selectedArtworks, artwork];

    setSelectedArtworks(updatedArtworks);
    AsyncStorage.setItem("selectedArtworks", JSON.stringify(updatedArtworks));
  }
  const { collectionData, firebaseCollection } = useCollection();
  console.log("firebaseCollection : ", firebaseCollection);

  const renderContents = () => {
    // Render the profile card for "All" option
    const renderItem = ({ item }) => (
      <View style={styles.card}>
        <TouchableOpacity>
          <Image
            source={{ uri: item?.imgUrls[0].imgUrl }}
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item?.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );

    return firebaseArtworks === null || firebaseArtworks.length === 0 ? (
      <View>
        <Text>This Collection Is Empty</Text>
      </View>
    ) : (
      firebaseCollection?.map((artwork, index) => (
        <View style={styles.container}>
          <View style={{ height: 50 }}>
            <View style={[styles.artWorks, styles.checkboxContainer]}>
              <Text
                style={[
                  styles.checkboxText,
                  selectedArtworks.includes(artwork) && styles.selectedText,
                ]}
              >
                {artwork.name}
              </Text>
              <TouchableOpacity
                key={index}
                style={[
                  selectedArtworks.includes(artwork) && styles.selectedCheckbox,
                ]}
                onPress={() => handleArtworkSelection(artwork)}
              >
                <View style={styles.checkbox}>
                  {selectedArtworks.includes(artwork) && (
                    <Icon name="check" size={18} color="white" />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={firebaseArtworks}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
          />
        </View>
      ))
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, height: "60vh" }}>
        <View style={styles.newArtworkContainer}>
          <Text style={styles.welcomeHeader}>Exhibition Collection</Text>
        </View>
        {/* Search Input */}
        <View style={styles.searchInputContainer}>
          <Icon
            name="search"
            size={20}
            color="#CEB89E"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#CEB89E"
          />
        </View>
        {renderContents()}
      </ScrollView>
      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => navigation.pop()}
      >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "black",
    padding: 10,
    paddingTop: 40,
  },
  newArtworkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  welcomeHeader: {
    color: "white",
    marginLeft: 10,
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#CEB89E",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#616161",
    borderRadius: 15,
    marginBottom: 20,
  },
  cardImage: {
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 200, // Adjust this value to control the image height
    resizeMode: "cover",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  signInButton: {
    width: "100%",
    height: 50,
    left: 12,
    position: "absolute",
    bottom: 20,
    backgroundColor: "#CEB89E", // Set this to your desired button background color
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 15,
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
    fontSize: 14,
  },
  flatlistContainer: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
    paddingTop: 20,
    marginBottom: 30,
  },
  card: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 15,
    overflow: "hidden",
    margin: 5,
  },
  cardImage: {
    width: "100%",
    height: 220, // Adjust this value to control the image height
    resizeMode: "cover",
  },
  cardContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  artWorks: {
    flexDirection: "column",
    justifyContent: "space-between",
    //flexWrap: "wrap",
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
    margin: 5,
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 15,
  },
  checkboxText: {
    color: "white",
    textTransform: "uppercase",
  },
  selectedCheckbox: {
    backgroundColor: "#CEB89E", // Customize the background color when the checkbox is selected
  },
  selectedText: {
    fontWeight: "bold", // Customize the style when the checkbox is selected
  },
});

export default ArtworksScreen;
