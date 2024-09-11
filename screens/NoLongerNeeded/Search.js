import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5"; // Replace "FontAwesome5" with the icon library of your choice.
import NewTypeModal from "../Artworks/NewTypeModal"
const MyPage = ({navigation}) => {
  
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const handleOpenModal = () => {
    console.log("openModal ", modalIsVisible)
    setModalIsVisible(true);
  };

  const handleCloseModal = () => {
    setModalIsVisible(false);
  };


  const [selectedArtworks, setSelectedArtworks] = useState([]);
  const artworks = [
    "Painting",
    "Drawing",
    "Sculpture",
    "Photography",
    "Printmaking",
    "Collage",
    "Installation",
    "Performance",
    "Digital Art",
    "Mixed Media",
    "Ceramics",
    "Textile Art",
    "Graffiti",
    "Engraving",
    "Pottery",
    "Calligraphy",
    "Assemblage",
    "Mosaic",
    "Fresco",
    "Watercolor",
    "Ink Wash Painting",
    "Oil Pastel",
    "Woodcut",
    "Lithography",
  ];
  function handleAddArtwork() {
    console.log("One Art piece add to your collection");
  }

  function handleArtworkSelection(artwork) {
    setSelectedArtworks((prevSelected) =>
      prevSelected.includes(artwork)
        ? prevSelected.filter((item) => item !== artwork)
        : [...prevSelected, artwork]
    );
  }
  return (
    <View style={styles.container}>
      {/* Paragraph */}
      <View style={styles.newArtworkContainer}>
        <Text style={styles.header}>Artwork Type</Text>
        
        <TouchableOpacity style={styles.signInButton} onPress={handleOpenModal}>
          <Text style={styles.buttonText}>NEW TYPE</Text>
        </TouchableOpacity>
      </View>
      
        <NewTypeModal
          visible={modalIsVisible}
          closeModal={handleCloseModal}
        />
      

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
      <ScrollView>
        <View style={styles.artWorks}>
          {artworks.map((artwork, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.checkboxContainer,
                selectedArtworks.includes(artwork) && styles.selectedCheckbox,
              ]}
              onPress={() => handleArtworkSelection(artwork)}
            >
              <View style={styles.checkbox}>
                {selectedArtworks.includes(artwork) && (
                  <Icon name="check" size={18} color="white" />
                )}
              </View>
              <Text
                style={[
                  styles.checkboxText,
                  selectedArtworks.includes(artwork) && styles.selectedText,
                ]}
              >
                {artwork}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  paragraph: {
    marginTop: 40,
    fontSize: 20,
    color: "white",
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
  continueButton: {
    position: "absolute",
    backgroundColor: "#CEB89E",
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    bottom: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  artWorks: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    textAlign: "left",
  },
  welcomeHeader: {
    color: "white",
    marginLeft: 10,
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
  },
  artworksHeader: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 10,
  },
  signInButton: {
    width: "30%",
    height: 40,
    backgroundColor: "gray",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", 
    fontSize: 15,
  },
  newArtworkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    padding: 10,
    backgroundColor: "gray",
    borderRadius: 15,
  },
  checkboxText: {
    color: "white",
    textTransform: "uppercase",
  },
  selectedCheckbox: {
    backgroundColor: "green",
  },
  selectedText: {
    fontWeight: "bold", 
  },
  artWorks: {
    flexDirection: "column",
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

});

export default MyPage;
