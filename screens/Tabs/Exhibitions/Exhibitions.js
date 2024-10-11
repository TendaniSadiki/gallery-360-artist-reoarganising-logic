import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { useFetchExhibition } from "../../../hooks/useFetchExhibition.jsx";
import { useFetchProfileData } from "../../../hooks/useFetchProfileData.jsx";
import loader2 from "../../../assets/images/loader2.gif";
import styles from "./styles.js";
import ProfilePic from "../../../components/ProfilePic.js";

export default function ExhibitionScreen({ navigation }) {
  const [selectedOption, setSelectedOption] = useState("All");
  const { exhibionData, firebaseExhibition } = useFetchExhibition();
  const firebaseExhibitionLength = firebaseExhibition?.length;
  const { image, name } = useFetchProfileData();

  const handleAddArtwork = () => {
    navigation.navigate("NewExhibition");
  };

  // Loader component
  const Imageloader = () => (
    <View style={styles.loaderContainer}>
      <Image source={loader2} />
    </View>
  );

  // Filter exhibitions based on selected option
  const filteredExhibitions = () => {
    if (selectedOption === "All") {
      return firebaseExhibition;
    } else if (selectedOption === "UPCOMING") {
      // Assuming exhibitions have a date field that can be used to filter
      return firebaseExhibition.filter(
        (exhibition) => new Date(exhibition?.date?.fromDate) > new Date()
      );
    } else if (selectedOption === "PAST") {
      return firebaseExhibition.filter(
        (exhibition) => new Date(exhibition?.date?.toDate) < new Date()
      );
    } else if (selectedOption === "DRAFTS") {
      return firebaseExhibition.filter((exhibition) => exhibition?.isDraft);
    }
  };

  // Render each exhibition item
  const renderItem = ({ item }) => (
    <View style={styles.card} key={item.key}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ExhibitionShow2", { item, image, name })
        }
      >
        <Image
          source={{ uri: item?.imgUrls[0]?.imgUrl }} // Assuming you have an image URL in imgUrls[0]
          style={styles.cardImage}
        />
        <View style={styles.cardInfoContainer}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardAddress}>{item.address}</Text>
          <Text style={styles.cardDescription}>
            {item.desc.slice(0, 160)}
            {item.desc.length > 160 ? "..." : ""}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  // Main rendering logic for exhibitions
  const exhibitionItem = () => {
    const filteredData = filteredExhibitions();
    return (
      <View style={styles.container}>
        <FlatList
          data={filteredData} // List of exhibitions after filtering
          renderItem={renderItem} // Render each exhibition item
          keyExtractor={(item) => item.key}
          ListEmptyComponent={() => (
            <View style={styles.noDataContainer}>
              <Text>No Exhibitions Found</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddArtwork}
              >
                <Text style={styles.addButtonText}>LIST EXHIBITION</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ProfilePic data={{ name, image, navigation }} />
      <View style={styles.newArtworkContainer}>
        <Text style={styles.welcomeHeader}>Exhibition</Text>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => handleAddArtwork()}
        >
          <Text style={styles.buttonText}>NEW EXHIBITION</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 50 }}>
        <ScrollView horizontal contentContainerStyle={styles.artworksMenu}>
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
              selectedOption === "UPCOMING" && styles.activeMenuItem,
            ]}
            onPress={() => setSelectedOption("UPCOMING")}
          >
            <Text
              style={[
                styles.menuText,
                selectedOption === "UPCOMING" && styles.activeMenuText,
              ]}
            >
              UPCOMING
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.menuItem,
              selectedOption === "PAST" && styles.activeMenuItem,
            ]}
            onPress={() => setSelectedOption("PAST")}
          >
            <Text
              style={[
                styles.menuText,
                selectedOption === "PAST" && styles.activeMenuText,
              ]}
            >
              PAST
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.menuItem,
              selectedOption === "DRAFTS" && styles.activeMenuItem,
            ]}
            onPress={() => setSelectedOption("DRAFTS")}
          >
            <Text
              style={[
                styles.menuText,
                selectedOption === "DRAFTS" && styles.activeMenuText,
              ]}
            >
              DRAFTS
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {firebaseExhibitionLength > 0 ? exhibitionItem() : Imageloader()}
    </View>
  );
}
