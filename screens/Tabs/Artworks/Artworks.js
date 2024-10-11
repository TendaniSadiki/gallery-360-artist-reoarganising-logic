import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from "react-native";
import ProfilePic from "../../../components/ProfilePic.js";
import loader2 from "../../../assets/images/loader2.gif";
import styles from "./styles.js";
import { useFetchProfileData } from "../../../hooks/useFetchProfileData";
import { useFetchArtworks } from "../../../hooks/useFetchArtworks.jsx";
import { useCollection } from "../../../hooks/useCollection.jsx";

const ArtworksScreen = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState(["All"]);
  const [selectedOption, setSelectedOption] = useState("All");

  const { name, image, userData } = useFetchProfileData();
  const { firebaseArtworks } = useFetchArtworks();
  const { collectionData } = useCollection();
  console.log("Artwork Data new:", JSON.stringify(firebaseArtworks, null, 2));

  useEffect(() => {
    if (collectionData?.length) {
      const menuItem = collectionData.map((item) => item.value);
      setMenuItems(["All", ...new Set(menuItem)]);
    }
  }, [collectionData]);

  const handleAddArtwork = () => {
    navigation.navigate("NewArtwork");
  };

  const filteredArtworkData = firebaseArtworks?.filter((artwork) => {
    return selectedOption === "All" || artwork.collection?.name === selectedOption;
  });

  // Log to check the structure of `filteredArtworkData`
  console.log("Filtered Artwork Data:", filteredArtworkData);

  const renderItem = ({ item }) => {
    console.log({ item });

    if (!item) {
      console.warn("Empty or undefined item:", item);
      return null;
    }
    return (
      <View style={[styles.card, { backgroundColor: '#f0f0f0', margin: 5 }]}>
        <TouchableOpacity onPress={() => navigation.navigate("Artworks2", { item, image, name })} >
          <Text style={styles.cardTitle}>{item.title || "Untitled Artwork"}</Text>
          <Text style={styles.cardText}>Type: {item.artworkType?.join(", ") || "Unknown"}</Text>
          <Text style={styles.cardText}>Year: {item.year || "N/A"}</Text>
          <Text style={styles.cardText}>Price: {item.price ? `R ${item.price} ` : "Not Specified"}</Text>
          <Text style={styles.cardText}>Condition: {item.condition || "N/A"}</Text>
          <Text style={styles.cardText}>Availability: {item.availability?.join(", ") || "N/A"}</Text>
          <Text style={styles.cardText}>Collection: {item.collection?.name || "None"}</Text>
        </TouchableOpacity>

      </View>
    )

  };

  return userData === null ? (
    <View style={styles.container}>
      <Image source={loader2} />
    </View>
  ) : (
    <View style={styles.container}>
      <ProfilePic data={{ name, image, navigation }} />
      <View style={styles.newArtworkContainer}>
        <Text style={styles.welcomeHeader}>Artworks</Text>
        <TouchableOpacity style={styles.signInButton} onPress={handleAddArtwork}>
          <Text style={styles.buttonText}>NEW ARTWORK</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 50 }}>
        <ScrollView horizontal contentContainerStyle={styles.artworksMenu} style={styles.scrollView}>
          {menuItems.map((menuItem) => (
            <TouchableOpacity
              key={menuItem}
              style={[styles.menuItem, selectedOption === menuItem && styles.activeMenuItem]}
              onPress={() => setSelectedOption(menuItem)}
            >
              <Text style={[styles.menuText, selectedOption === menuItem && styles.activeMenuText]}>
                {menuItem}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {/* Render the FlatList with debug checks */}
      {filteredArtworkData?.length > 0 ? (
        <FlatList
          data={filteredArtworkData}
          renderItem={renderItem}
          keyExtractor={(item) => item.uid || item.key || Math.random().toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      ) : (
        <Text style={{ textAlign: "center", marginTop: 20, color: "white" }}>No Artworks Available</Text>
      )}
    </View>
  );
};

export default ArtworksScreen;
