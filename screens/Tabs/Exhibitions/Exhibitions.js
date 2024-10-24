import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import moment from "moment";
import { useFetchExhibition } from "../../../hooks/useFetchExhibition.jsx";
import { useFetchProfileData } from "../../../hooks/useFetchProfileData.jsx";
import loader2 from "../../../assets/images/loader2.gif";
import styles from "./styles.js";
import ProfilePic from "../../../components/ProfilePic.js";
import { deleteDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebase/firebase.config";
import Icon from "react-native-vector-icons/MaterialIcons"; // Importing the icon library

export default function ExhibitionScreen({ navigation }) {
  const [selectedOption, setSelectedOption] = useState("All");
  const { exhibitionData, firebaseExhibition, isLoading } = useFetchExhibition(); 
  const { image, name } = useFetchProfileData();

  const handleAddArtwork = () => {
    navigation.navigate("NewExhibition");
  };

  const convertFirestoreTimestampToMoment = (timestamp) => {
    if (timestamp?.seconds) {
      return moment(timestamp.seconds * 1000);
    }
    return null;
  };

  const Imageloader = () => (
    <View style={styles.loaderContainer}>
      <Image source={loader2} />
    </View>
  );

  const filteredExhibitions = () => {
    if (!firebaseExhibition) return [];

    if (selectedOption === "All") {
      return firebaseExhibition;
    } else if (selectedOption === "UPCOMING") {
      return firebaseExhibition.filter((exhibition) =>
        convertFirestoreTimestampToMoment(exhibition?.date?.fromDate).isAfter(moment())
      );
    } else if (selectedOption === "PAST") {
      return firebaseExhibition.filter((exhibition) =>
        convertFirestoreTimestampToMoment(exhibition?.date?.toDate).isBefore(moment())
      );
    } else if (selectedOption === "DRAFTS") {
      return firebaseExhibition.filter((exhibition) => exhibition?.isDraft);
    }
  };

  const filteredData = filteredExhibitions();
// Function to delete an exhibition by its ID from Firestore
const deleteExhibitionById = async (exhibitionId) => {
  try {
    const docRef = doc(FIRESTORE_DB, "exhibition", exhibitionId);
    await deleteDoc(docRef);
    console.log("Exhibition deleted successfully");
  } catch (error) {
    console.error("Error deleting exhibition:", error);
  }
};

  // Function to handle deletion of an exhibition
  const handleDeleteExhibition = (exhibitionId) => {
    Alert.alert(
      "Delete Exhibition",
      "Are you sure you want to delete this exhibition?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteExhibitionById(exhibitionId), // Now it uses the defined function
          style: "destructive",
        },
      ]
    );
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.card} key={item.key}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ExhibitionShow2", { item, image, name })
        }
      >
        <Image
          source={{ uri: item?.imgUrls[0]?.imgUrl }}
          style={styles.cardImage}
        />
        <View style={styles.cardInfoContainer}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardAddress}>{item.address}</Text>
          <Text style={styles.cardDescription}>
            {item.desc.slice(0, 160)}
            {item.desc.length > 160 ? "..." : ""}
          </Text>
          {/* Bin icon for deleting the exhibition */}
          <TouchableOpacity onPress={() => handleDeleteExhibition(item.key)} style={styles.deleteIconContainer}>
            <Icon name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  const exhibitionItem = () => {
    return (
      <View style={styles.container}>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
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

      {isLoading ? Imageloader() : exhibitionItem()}
    </View>
  );
}
