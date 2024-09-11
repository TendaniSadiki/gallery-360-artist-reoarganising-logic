import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import ProfilePic from "../../../components/ProfilePic.js";
import ProfileCard from "../../../components/ProfileCard.js";
import loader2 from "../../../assets/images/loader2.gif";
import styles from "./styles.js";
import { useProfileData } from "../../../hooks/useProfilePic.jsx";
import { useFetchArtworks } from "../../../hooks/useFetchArtworks.jsx";
import { useCollection } from "../../../hooks/useCollection.jsx";

const ArtworksScreen = ({ navigation }) => {
  const [navStack, setNavStack] = useState("NewArtwork");
  const [desc, setDesc] = useState("Make your first sale by adding artwork");
  const [btnText, setBtnText] = useState("Add Artworks");
  const [menuItems, setMenuItems] = useState(["All"]);
  const [selectedOption, setSelectedOption] = useState("All");

  const { artworkData, firebaseArtworks } = useFetchArtworks();
  // const { firebaseArtworks } = useFetchArtworks(selectedOption);
  // Fetch profile data from the server
  const { image, name, userData } = useProfileData();

  // Fetch collection data from the server
  const { collectionData } = useCollection();

  // console.log("userData : ", userData);
  console.log('artworks');
  useEffect(() => {
    // Set menu items based on collection data
    if (collectionData) {
      // Extract the "value" property from each object
      const menuItem = collectionData.map((item) => item.value);

      // Use a Set to filter out duplicates
      const uniqueMenuItems = [...new Set(menuItem)];

      // Update the state with the unique menu items
      setMenuItems([...menuItems, ...uniqueMenuItems]);
    }
  }, [collectionData]);

  // console.log("menuItems", menuItems);
  // Function to handle adding artwork
  const handleAddArtwork = () => {
    navigation.navigate("NewArtwork");
  };

  // Function to render the artwork list
  const renderContent = () => {
    // Filter artwork data based on the selected option
    const filteredArtworkData = firebaseArtworks?.filter((artwork) => {
      if (selectedOption === "All") {
        return true;
      }

      const collectionName = artwork.collection.name;
      console.log("collectionData : ", collectionData);
      // console.log("name now : ", artwork.collection.name);
      const artCol = collectionData.find(
        (item) => item.value === collectionName
      );

      console.log("artCol : ", artCol);
      console.log("artCol : ", selectedOption);

      // return collectionData[collectionId]?.name === selectedOption;
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
      {/* Profile Card */}
      {renderContent()}
    </View>
  );
};

export default ArtworksScreen;
