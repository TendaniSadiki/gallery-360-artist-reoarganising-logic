import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { StackActions } from "@react-navigation/native";
import { setDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../firebase/firebase.config";
import { sendEmailVerification } from "firebase/auth";
import { useDocumentFunctions } from "../../hooks/useDocumentFunctions";

const PaymentScreen = ({ navigation }) => {
  const auth = FIREBASE_AUTH;
  const user = auth.currentUser;
  const { pickDocument, document, documentUrl, loading } = useDocumentFunctions();

  // Define state variables
  const [accountHolder, setAccountHolder] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [errors, setErrors] = useState({});

  // Form validation
  const validateForm = () => {
    let errors = {};

    if (!accountHolder.trim()) {
      errors.accountHolder = "Account holder name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(accountHolder)) {
      errors.accountHolder = "Account holder name must only contain letters";
    }

    if (!bankName.trim()) {
      errors.bankName = "Bank name is required";
    }

    if (!accountNumber.trim()) {
      errors.accountNumber = "Account number is required";
    } else if (!/^\d{6,16}$/.test(accountNumber)) {
      errors.accountNumber = "Enter a valid account number (6-16 digits)";
    }

    if (!branchCode.trim()) {
      errors.branchCode = "Branch code is required";
    } else if (!/^\d{6}$/.test(branchCode)) {
      errors.branchCode = "Branch code must be 6 digits";
    }

    if (!document) {
      errors.document = "Please upload a supporting document";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Write payment data to Firestore
  const writeUserData = async () => {
    try {
      await setDoc(doc(FIRESTORE_DB, "paymentDetails", user.uid), {
        accountHolder,
        bankName,
        accountNumber,
        branchCode,
        userId: user.uid,
        documentName: document?.name || "N/A", // Save document name
        documentUrl: documentUrl || "N/A",   // Save document URL
      });
      console.log("Account info saved");

      // Send email verification if needed
      if (user && !user.emailVerified) {
        await sendEmailVerification(user);
        alert("Email verification sent. Please check your inbox.");
      }

      // Navigate to login
      navigation.dispatch(StackActions.replace("Login"));
    } catch (error) {
      console.error("Error saving account info: ", error);
      alert("Error saving account info. Please try again.");
    }
  };

  // Handle Continue button click
  const handleContinue = () => {
    if (validateForm()) {
      writeUserData(); // Save data and send the email
    }
  };

  // Skip Button - directly navigate to login
  const handleSkip = () => {
    if (user && !user.emailVerified) {
      sendEmailVerification(user)
        .then(() => alert("Email verification sent. Please check your inbox."))
        .catch((error) => console.error("Error sending email:", error));
    }
    navigation.dispatch(StackActions.replace("Login"));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Bank Account Details</Text>
        <Text style={styles.paragraph}>
          Provide the bank account details where payments will be sent.
        </Text>

        {/* Account Holder Name */}
        <TextInput
          style={styles.input}
          placeholder="Account Holder Name"
          placeholderTextColor="white"
          value={accountHolder}
          onChangeText={setAccountHolder}
        />
        {errors.accountHolder && (
          <Text style={styles.errorMessage}>{errors.accountHolder}</Text>
        )}

        {/* Bank Name */}
        <TextInput
          style={styles.input}
          placeholder="Bank Name"
          placeholderTextColor="white"
          value={bankName}
          onChangeText={setBankName}
        />
        {errors.bankName && (
          <Text style={styles.errorMessage}>{errors.bankName}</Text>
        )}

        {/* Account Number */}
        <TextInput
          style={styles.input}
          placeholder="Account Number"
          placeholderTextColor="white"
          value={accountNumber}
          onChangeText={setAccountNumber}
          keyboardType="numeric"
        />
        {errors.accountNumber && (
          <Text style={styles.errorMessage}>{errors.accountNumber}</Text>
        )}

        {/* Branch Code */}
        <TextInput
          style={styles.input}
          placeholder="Branch Code"
          placeholderTextColor="white"
          value={branchCode}
          onChangeText={setBranchCode}
          keyboardType="numeric"
        />
        {errors.branchCode && (
          <Text style={styles.errorMessage}>{errors.branchCode}</Text>
        )}

        {/* Document Upload */}
        <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
          <Text style={styles.buttonText}>
            {document ? `Selected: ${document.name}` : "Upload Supporting Document"}
          </Text>
        </TouchableOpacity>
        {errors.document && (
          <Text style={styles.errorMessage}>{errors.document}</Text>
        )}

        {/* Document Upload Progress */}
        {loading && (
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>Uploading...</Text>
            <ActivityIndicator size="small" color="#CEB89E" />
          </View>
        )}

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>

        {/* Skip Button */}
        <TouchableOpacity style={styles.button} onPress={handleSkip}>
          <Text style={styles.smallerButtonText}>I'll do it later</Text>
        </TouchableOpacity>
      </ScrollView>
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
  input: {
    width: "100%",
    height: 50,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
    color: "#fff",
  },
  continueButton: {
    backgroundColor: "#CEB89E",
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  button: {
    marginTop: 10,
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  smallerButtonText: {
    color: "white",
    fontSize: 16,
  },
  errorMessage: {
    width: "80%",
    color: "red",
    marginBottom: 10,
    textAlign: "left",
  },
  uploadButton: {
    backgroundColor: "#6C63FF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  progressContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  progressText: {
    color: "white",
    fontSize: 16,
  },
});

export default PaymentScreen;
