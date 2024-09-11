import { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  TextInput,
  Modal,
  Alert, // Import Alert for feedback
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

export default function App(props) {
  const [linkToProfile, setLinkToProfile] = useState("");
  const [selected, setSelected] = useState("");

  const data = [
    { key: "1", value: "facebook" },
    { key: "2", value: "instagram" },
  ];

  const handleSignIn = () => {
    if (!linkToProfile.trim()) {
      Alert.alert("Error", "Please enter a link to your social media profile."); // Show an error if input is empty
      return;
    }

    if (selected === "facebook") {
      props.setLinks.setFacebook(linkToProfile);
    } else if (selected === "instagram") {
      props.setLinks.setInstagram(linkToProfile);
    }

    props.closeModal();
    Alert.alert("Success", "Social media link added successfully."); // Show a success message
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.header}>Add Social Media</Text>

          <SelectList
            data={data}
            setSelected={setSelected}
            boxStyles={{
              backgroundColor: "black",
              width: "58%",
              color: "white",
            }}
            dropdownStyles={{
              backgroundColor: "black",
              height: 100,
            }}
            save="value"
            inputStyles={{ color: "white" }}
            search={false}
            maxHeight={100}
            placeholder="Your Socials"
            placeholderTextColor="white"
            dropdownTextStyles={{ color: "white" }}
          />

          <TextInput
            style={styles.input}
            placeholder="e.g., facebook.com/username"
            placeholderTextColor="white"
            value={linkToProfile}
            onChangeText={setLinkToProfile}
            accessibilityLabel="Social media profile link"
            accessibilityHint="Enter the link to your social media profile"
          />

          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.buttonText}>ADD</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={props.closeModal}>
            <Text style={styles.buttonText}>CANCEL</Text>
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
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
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
    backgroundColor: "#CEB89E",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "transparent",
    width: "80%",
    height: 50,

    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
