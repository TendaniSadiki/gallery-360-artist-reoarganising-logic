import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import ProfilePic from "../../../components/ProfilePic.js";
import loader2 from "../../../assets/images/loader2.gif";
import styles from "./styles.js";
import { useProfileData } from "../../../hooks/useProfilePic.jsx";
import { useFetchArtworks } from "../../../hooks/useFetchArtworks.jsx";
import { useCollection } from "../../../hooks/useCollection.jsx";

const ArtworksScreen = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState(["All"]);
  const [selectedOption, setSelectedOption] = useState("All");

  const { firebaseArtworks } = useFetchArtworks();
  const { image, name, userData } = useProfileData();
  const { collectionData } = useCollection();

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
    // Filter artwork data based on the selected option
    const filteredArtworkData = firebaseArtworks?.filter((artwork) => {
      if (selectedOption === "All") {
        return true; // Show all artworks if "All" is selected
      }
      return artwork.collection?.name === selectedOption; // Match the selected collection
    });

    // Render the artwork list
    const renderItem = ({ item }) => (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Artworks2", { item, image, name })
          }
        >
          <Image
            source={{ uri: item?.imgUrls[0].imgUrl }}
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={styles.container}>
        <FlatList
          data={filteredArtworkData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    );
  };

  return userData?.length === 0 ? (
    <View style={styles.container}>
      <Image source={loader2} />
    </View>
  ) : (
    <View style={styles.container}>
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
