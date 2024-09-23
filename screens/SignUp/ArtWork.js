import { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5"; // Replace "FontAwesome5" with the icon library of your choice.
import {FIREBASE_AUTH, FIRESTORE_DB } from "../../firebase/firebase.config";
import { doc, setDoc } from "firebase/firestore";

const MyPage = ({ route, navigation }) => {
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
  const [items, setItems] = useState(artworks);
  const [query, setQuery] = useState("");
  const [selectedArtworks, setSelectedArtworks] = useState([]);
  const inputRef = useRef();

  const { userData } = route.params; // Get userData passed from previous screen

  // Function to handle artwork selection
  function handleArtworkSelection(artwork) {
    setSelectedArtworks((prevSelected) =>
      prevSelected.includes(artwork)
        ? prevSelected.filter((item) => item !== artwork)
        : [...prevSelected, artwork]
    );
  }

  // Filter artworks based on query input
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return item.toLowerCase().includes(query.toLowerCase());
    });
  }, [items, query]);

  // Function to save artwork selections along with existing user data to Firestore
  const handleSaveProfile = async () => {
    try {
      const auth = FIREBASE_AUTH;
      const user = auth.currentUser; // Get the authenticated user

      if (user) {
        const uid = user.uid; // Get user ID
        const userDocRef = doc(FIRESTORE_DB, "artists", uid); // Firestore document reference

        // Add selected artworks to userData
        const updatedUserData = {
          ...userData,
          selectedArtworks: selectedArtworks, // Add selected artworks
        };

        // Save updated data to Firestore
        await setDoc(userDocRef, updatedUserData);

        // Navigate to the next screen after saving
        navigation.navigate("Signature", { userData: updatedUserData });
      } else {
        console.log("User is not authenticated");
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };
  return (
    <View style={styles.container}>
      {/* Paragraph */}
      <Text style={styles.paragraph}>
        There are many types of artworks created by artists across different
        mediums and styles.
      </Text>

      {/* Search Input */}
      <View style={styles.searchInputContainer}>
        <Icon
          name="search"
          size={20}
          color="#CEB89E"
          style={styles.searchIcon}
        />
        <TextInput
          value={query}
          style={styles.searchInput}
          onChangeText={setQuery}
          placeholder="Search"
          placeholderTextColor="#CEB89E"
        />
      </View>
      <View style={styles.artWorks}>
        {filteredItems.map((art, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.checkboxContainer,
                selectedArtworks.includes(art) && styles.selectedCheckbox,
              ]}
              onPress={() => handleArtworkSelection(art)}
            >
              <Text
                ref={inputRef}
                key={index}
                style={{
                  color: "white",
                  textTransform: "uppercase",
                }}
              >
                {art}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Continue Button */}
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate("Signature", { userData })}
        >
          <Text style={styles.buttonText} onPress={handleSaveProfile}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 40,
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
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  artWorks: {
    flexDirection: "row",
    flexWrap: "wrap",
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
    // position: "absolute",
    backgroundColor: "#CEB89E",
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    // bottom: 40,
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
    backgroundColor: "#CEB89E",
  },
  selectedText: {
    fontWeight: "bold",
  },
  // artWorks: {
  //   flexDirection: "column",
  // },

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
