import { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  TextInput,
  Modal,
} from "react-native";
import { FIRESTORE_DB, storage } from "../../firebase/firebase.config";
import auth from "../../firebase/firebase.config.js";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

export default function App(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  //const handleAddCollection = () => {};
  const user = auth.currentUser;
  const colRef = collection(FIRESTORE_DB, "collection");

  const handleAddCollection = () => {
    writeCollectionData();
    props.closeModal();
  };

  const writeCollectionData = () => {
    addDoc(colRef, {
      name: name,
      description: description,
      uid: user.uid,
    })
      .then((result) => {
        // Success callback
        console.log("data ", result);
        alert("data saved");
      })
      .catch((error) => {
        // Error callback
        alert(error);
        console.log("error ", error);
      });
  };

  return (
    <Modal
      visible={props.Modalvisible}
      transparent={true}
      animationType="slide"
      //  animationType="slide"
      onRequestClose={props.closeModal}
    >
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.buttonContainer}>
            <Text style={styles.header}>New collection</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="NAME"
            placeholderTextColor="white"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={{
              width: "80%",
              height: 100,
              fontSize: 16,
              paddingHorizontal: 12,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              marginBottom: 20,
              color: "#fff",
            }}
            placeholder="DESCRIPTION"
            placeholderTextColor="white"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <TouchableOpacity
            style={styles.signInButton}
            onPress={handleAddCollection}
          >
            <Text style={styles.buttonText}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    //padding: 8,
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
    width: "80%",
    justifyContent: "space-between",
    // justifyContent: "space-between",
  },
});
