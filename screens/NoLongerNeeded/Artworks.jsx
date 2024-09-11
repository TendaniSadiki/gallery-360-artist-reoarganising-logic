import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome5"; // Replace "FontAwesome5" with the icon library of your choice.
// import auth from "../../../firebase/firebase.config.js";
// import { setDoc, doc, getDoc } from "firebase/firestore";
// import { FIRESTORE_DB, storage } from "../../../firebase/firebase.config.js";
import ProfilePic from "../../components/ProfilePic.js";
import ProfileCard from "../../components/ProfileCard.js";
import loader2 from "../../../assets/images/loader2.gif";
import styles from "../Tabs/Artworks/styles.js";
import { useProfileData } from "../../hooks/useProfilePic.jsx";
import { useFetchArtworks } from "../../hooks/useFetchArtworks.jsx";
import { useCollection } from "../../hooks/useCollection.jsx";

const ArtworksScreen = ({ navigation }) => {
  const [navStack, setNavStack] = useState("NewArtwork");
  const [desc, setDesc] = useState(" make your first sale by adding artwork");
  const [btnText, setBtnText] = useState("Add Artworks");

  const [selectedOption, setSelectedOption] = useState("All");

  const { image, name, userData } = useProfileData();
  const { artworkData, firebaseArtworks } = useFetchArtworks();

  const { collectionData } = useCollection();
  console.log("collectionData", collectionData);
  console.log("firebaseArtworks : ", firebaseArtworks);
  function handleAddArtwork() {
    navigation.navigate("NewArtwork");
  }

  const Imageloader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Image source={loader2}></Image>
      </View>
    );
  };
  // Function to render the content based on the selected option
  const renderContent = () => {
    collectionData.map((colItem) => {
      if (selectedOption === "All") {
        // Render the profile card for "All" option
        const renderItem = ({ item }) => (
          <View style={styles.card} key={item?.imgUrls[0].imgUrl}>
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
                <Text style={styles.cardTitle}>{item?.title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );

        return firebaseArtworks === null || firebaseArtworks === [] ? (
          <ProfileCard
            data={{ name, image, desc, btnText, navStack, navigation }}
          />
        ) : (
          <View style={styles.container}>
            <FlatList
              data={firebaseArtworks}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
            />
          </View>
        );
      } else if (selectedOption === colItem.value.capitalize()) {
        const cardsData = [
          {
            id: "1",
            image: require("../../../assets/images/art1.png"), // Replace with the path to your image
            title: "Card 1",
          },
          {
            id: "2",
            image: require("../../../assets/images/art2.png"), // Replace with the path to your image
            title: "Card 2",
          },
          {
            id: "3",
            image: require("../../../assets/images/art3.png"), // Replace with the path to your image
            title: "Card 3",
          },
          {
            id: "4",
            image: require("../../../assets/images/art4.png"), // Replace with the path to your image
            title: "Card 4",
          },
          // Add more cards data as needed
        ];

        const renderItem = ({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate("Artworks2")}>
              <Image source={item.image} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );

        return (
          <View style={styles.container}>
            <FlatList
              data={cardsData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
            />
          </View>
        );
      } else if (selectedOption === "NATURE'S BEAUTY") {
        const cardsData = [
          {
            id: "1",
            image: require("../../../assets/images/art1.png"), // Replace with the path to your image
            title: "Card 1",
          },
          {
            id: "2",
            image: require("../../../assets/images/art3.png"), // Replace with the path to your image
            title: "Card 2",
          },
          {
            id: "3",
            image: require("../../../assets/images/art4.png"), // Replace with the path to your image
            title: "Card 3",
          },
          {
            id: "4",
            image: require("../../../assets/images/art2.png"), // Replace with the path to your image
            title: "Card 4",
          },
          // Add more cards data as needed
        ];

        const renderItem = ({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate("Artworks2")}>
              <Image source={item.image} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );

        return (
          <View style={styles.container}>
            <FlatList
              data={cardsData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
            />
          </View>
        );
      } else if (selectedOption === "URBAN LANDSCAPE") {
        const cardsData = [
          {
            id: "1",
            image: require("../../../assets/images/art4.png"), // Replace with the path to your image
            title: "Card 1",
          },
          {
            id: "2",
            image: require("../../../assets/images/art2.png"), // Replace with the path to your image
            title: "Card 2",
          },
          {
            id: "3",
            image: require("../../../assets/images/art1.png"), // Replace with the path to your image
            title: "Card 3",
          },
          {
            id: "4",
            image: require("../../../assets/images/art3.png"), // Replace with the path to your image
            title: "Card 4",
          },
          // Add more cards data as needed
        ];

        const renderItem = ({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate("Artworks2")}>
              <Image source={item.image} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );

        return (
          <View style={styles.container}>
            <FlatList
              data={cardsData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
            />
          </View>
        );
      }
    });
  };
  return userData === null ? (
    <View style={styles.container}>
      <Imageloader />
    </View>
  ) : (
    <View style={styles.container}>
      {<ProfilePic data={{ name, image, navigation }} />}
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
          <TouchableOpacity
            style={[
              styles.menuItem,
              selectedOption === "All" && styles.activeMenuItem,
            ]}
            onPress={() => setSelectedOption("All")}
          >
            <Text
              style={[
                styles.menuText,
                selectedOption === "All" && styles.activeMenuText,
              ]}
            >
              ALL
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.menuItem,
              selectedOption === "STAND ALONE" && styles.activeMenuItem,
            ]}
            onPress={() => setSelectedOption("STAND ALONE")}
          >
            <Text
              style={[
                styles.menuText,
                selectedOption === "STAND ALONE" && styles.activeMenuText,
              ]}
            >
              STAND ALONE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.menuItem,
              selectedOption === "NATURE'S BEAUTY" && styles.activeMenuItem,
            ]}
            onPress={() => setSelectedOption("NATURE'S BEAUTY")}
          >
            <Text
              style={[
                styles.menuText,
                selectedOption === "NATURE'S BEAUTY" && styles.activeMenuText,
              ]}
            >
              NATURE'S BEAUTY
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.menuItem,
              selectedOption === "URBAN LANDSCAPE" && styles.activeMenuItem,
            ]}
            onPress={() => setSelectedOption("URBAN LANDSCAPE")}
          >
            <Text
              style={[
                styles.menuText,
                selectedOption === "URBAN LANDSCAPE" && styles.activeMenuText,
              ]}
            >
              URBAN LANDSCAPE
            </Text>
          </TouchableOpacity>
          {/* Add more menu items as needed */}
        </ScrollView>
      </View>

      {/* Profile Card */}
      {renderContent()}
    </View>
  );
};

export default ArtworksScreen;
