import { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  TextInput,
  Modal,
} from "react-native";
import { FIREBASE_AUTH } from "../../firebase/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgetPassword({ isModalVisible, handleCloseModal }) {
  const [email, setEmail] = useState("");

  const handlePasswordReset = async () => {
    try {
      if (!email) {
        alert("Please enter a valid email.");
        return;
      }

      // Send the password reset email using the Firebase method
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
      alert("Password reset email sent!");
      handleCloseModal(); // Close the modal after sending the reset email
    } catch (error) {
      alert(`Failed to send reset email: ${error.message}`);
    }
  };

  return (
    <Modal visible={isModalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.header}>Forget Password</Text>
          <Text style={styles.smallerText}>Enter your email to reset your password</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="white"
            value={email}
            onChangeText={setEmail}
          />

          {/* Reset Password Button */}
          <TouchableOpacity style={styles.signInButton} onPress={handlePasswordReset}>
            <Text style={styles.buttonText}>RESET PASSWORD</Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity style={styles.button} onPress={handleCloseModal}>
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "black",
    borderRadius: 10,
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  smallerText: {
    color: "white",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 12,
    marginBottom: 20,
    color: "#fff",
  },
  signInButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#CEB89E", // Button color
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderColor: "#CEB89E",
    borderWidth: 1, // Add a border to distinguish the button
  },
});
