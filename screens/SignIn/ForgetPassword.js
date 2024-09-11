import { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  TextInput,
  Modal,
} from "react-native";
//import SpashScreen from "./screens/OnBording/SpashScreen.js";
export default function App(props) {
  console.log('in forgot password');
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const handleSignIn = () => {
    console.log("signed in!!!");
    props.closeModal();
  };
  console.log('forgot password');
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.header}>Forget Password</Text>

          <Text style={styles.smallerText}> create your new account</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="white"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.buttonText}>RESET PASSWORD</Text>
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
});
