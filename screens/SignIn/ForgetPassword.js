import React, { useState } from "react";
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
  const [errors, setErrors] = useState({}); // Track errors for input fields
  const [message, setMessage] = useState(""); // To show success messages
  console.log("Resetting password")
  const handlePasswordReset = async () => {
    // Clear previous errors
    setErrors({});
    setMessage("");

    const newErrors = {};

    // Basic validation for email
    if (!email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S{2,}/.test(email.replace(/ /g, ""))) {
      newErrors.email = "Please enter a valid email address.";
    }

    // If there are validation errors, update the errors state and exit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Send the password reset email using Firebase
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
      setMessage("Password reset email sent successfully!");
      setEmail(""); // Clear email input on success
    } catch (error) {
      console.error("Password Reset Error:", error);
      // Set a general error message
      setErrors({ email: "Failed to send reset email. Please try again later." });
    }
  };

  return (
    <Modal visible={isModalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.header}>Forget Password</Text>
          <Text style={styles.smallerText}>Enter your email to reset your password</Text>

          {/* Email Input */}
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Email"
            placeholderTextColor="white"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrors({}); // Clear error when user types
              setMessage(""); // Clear success message on new input
            }}
          />
          {/* Display error message for email */}
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          
          {/* Display success message */}
          {message && <Text style={styles.successText}>{message}</Text>}

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
    marginBottom: 10,
    color: "#fff",
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
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
    borderWidth: 1,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
  },
  successText: {
    color: "green",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
  },
});
