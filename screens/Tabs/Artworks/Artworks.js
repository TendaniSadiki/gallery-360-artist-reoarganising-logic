import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import ProfilePic from "../../../components/ProfilePic.js"; // Ensure ProfilePic handles image and name props
import loader2 from "../../../assets/images/loader2.gif";
import styles from "./styles.js";
import { useFetchProfileData } from "../../../hooks/useFetchProfileData"; // Updated hook import
import { useFetchArtworks } from "../../../hooks/useFetchArtworks.jsx";
import { useCollection } from "../../../hooks/useCollection.jsx";

const ArtworksScreen = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState(["All"]);
  const [selectedOption, setSelectedOption] = useState("All");

  // Fetch profile data using useFetchProfileData hook
  const { name, image, userData } = useFetchProfileData(); 
  const { firebaseArtworks } = useFetchArtworks();
  const { collectionData } = useCollection();
  console.log("firebaseArtworks:", firebaseArtworks); // Check the structure of the artwork data

  console.log("Profile name:", name); // Debug to check if name is fetched properly

  // Update menu items based on collection data
  useEffect(() => {
    if (collectionData) {
      const menuItem = collectionData.map((item) => item.value);
      const uniqueMenuItems = [...new Set(menuItem)];
      setMenuItems(["All", ...uniqueMenuItems]); // Include "All" as the default option
    }
  }, [collectionData]);

  // Function to handle adding artwork
  const handleAddArtwork = () => {
    navigation.navigate("NewArtwork");
  };

  // Function to render the artwork list
  const renderContent = () => {
    // Filter artwork data based on the selected option (collection name)
    const filteredArtworkData = firebaseArtworks?.filter((artwork) => {
      if (selectedOption === "All") {
        return true; // Show all artworks if "All" is selected
      }
      return artwork.collection?.name === selectedOption; // Match the selected collection name
    });
  
    // Render the artwork list
    const renderItem = ({ item }) => (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Artworks2", { item, image, name })}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title || "Untitled Artwork"}</Text>
            <Text style={styles.cardText}>Type: {item.artworkType?.join(', ')}</Text>
            <Text style={styles.cardText}>Year: {item.year}</Text>
            <Text style={styles.cardText}>Price: {item.price} USD</Text>
            <Text style={styles.cardText}>Condition: {item.condition}</Text>
            <Text style={styles.cardText}>Availability: {item.availability?.join(', ')}</Text>
            <Text style={styles.cardText}>Collection: {item.collection?.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <FlatList
          data={filteredArtworkData}
          renderItem={renderItem}
          keyExtractor={(item) => item.key} // Ensure `key` is used to identify each artwork
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    );
  };
  

  return userData === null ? (
    <View style={styles.container}>
      <Image source={loader2} />
    </View>
  ) : (
    <View style={styles.container}>
      {/* Display the ProfilePic with name and image */}
      <ProfilePic data={{ name, image, navigation }} /> 
      <View style={styles.newArtworkContainer}>
        <Text style={styles.welcomeHeader}>Artworks</Text>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={handleAddArtwork}
        >
          <Text style={styles.buttonText}>NEW ARTWORK</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 50 }}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.artworksMenu}
          style={styles.scrollView}
        >
          {menuItems.map((menuItem, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                selectedOption === menuItem && styles.activeMenuItem,
              ]}
              onPress={() => setSelectedOption(menuItem)}
            >
              <Text
                style={[
                  styles.menuText,
                  selectedOption === menuItem && styles.activeMenuText,
                ]}
              >
                {menuItem}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {renderContent()}
    </View>
  );
};

export default ArtworksScreen;
