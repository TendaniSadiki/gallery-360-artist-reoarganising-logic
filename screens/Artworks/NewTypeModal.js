import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  TextInput,
  Modal,
} from "react-native";
import NewCollectionModal from "../../components/Modals/NewCollection";

export default function NewTypeModal(props) {
  console.log('in new type modal');
  const [name, setName] = useState("");
  const [collectionModalVisible, setCollectionModalVisible] = useState(false);

  const handleOpenCollectionModal = () => {
    setCollectionModalVisible(true);
  };

  const handleCloseCollectionModal = () => {
    setCollectionModalVisible(false);
  };

  const handleAddType = () => {
    // Logic to handle adding the new artwork type goes here
    // You can use the 'name' state for this

    // After adding, you can open the collection modal
    handleOpenCollectionModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>New Artwork Type</Text>
      <TouchableOpacity style={styles.NewTypeButton} onPress={handleAddType}>
        <Text style={styles.buttonText}>NEW TYPE</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="NAME"
        placeholderTextColor="white"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity style={styles.signInButton} onPress={handleAddType}>
        <Text style={styles.buttonText}>ADD</Text>
      </TouchableOpacity>

      <NewCollectionModal
        Modalvisible={collectionModalVisible}
        animationType="slide"
        closeModal={handleCloseCollectionModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  smallerText: {
    color: "white",
    marginRight: 135,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    padding: 10,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // Set this to your desired background color for the whole screen
  },
  input: {
    width: "80%",
    height: 50,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 12,
    marginBottom: 20,
    color: "#fff",
    textDecorationColor: "white",
  },
  signInButton: {
    width: "80%",
    height: 50,
    backgroundColor: "#CEB89E", // Set this to your desired button background color
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 16,
  },

  button: {
    backgroundColor: "transparent", // Set this to your desired button color
    width: "80%",
    height: 50,
    // Set this to your desired button background color
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  NewTypeButton: {
    width: "25%",
    height: 45,
    backgroundColor: "gray",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // justifyContent: "space-between",
  },
});
