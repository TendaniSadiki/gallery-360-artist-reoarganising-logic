import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { StackActions } from "@react-navigation/native";
import { setDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../firebase/firebase.config";
import { sendEmailVerification } from "firebase/auth";

const PaymentScreen = ({ navigation }) => {
  const auth = FIREBASE_AUTH;

  const user = auth.currentUser;

  // Define state variables
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Form validation
  const validateForm = () => {
    let errors = {};
    if (cardHolder.trim() === "") {
      errors.cardHolder = "Card holder is required";
    } else if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(cardHolder)) {
      errors.cardHolder = "Please enter a valid full name (e.g., John Doe)";
    }
    if (!cardNumber) {
      errors.cardNumber = "Card number is required";
    } else if (cardNumber.length < 14) {
      errors.cardNumber = "Enter a valid card number";
    } else if (!/^\d+$/.test(cardNumber)) {
      errors.cardNumber = "Please enter a valid card number (digits only)";
    }
    if (!expiry) {
      errors.expiry = "Expiry date is required";
    } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiry)) {
      errors.expiry = "Expiry date must be in MM/YY format";
    } else {
      const [month, year] = expiry.split("/").map(Number);
      const currentYear = new Date().getFullYear() % 100; // Get last two digits of current year
      const currentMonth = new Date().getMonth() + 1;

      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        errors.expiry = "Expiry date cannot be in the past";
      }
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
// Handle expiry date input
const handleExpiryInput = (text) => {
  // Remove any characters that are not digits
  let formattedText = text.replace(/[^0-9]/g, "");

  // Add the '/' after the second digit (MM part)
  if (formattedText.length > 2) {
    formattedText = `${formattedText.substring(0, 2)}/${formattedText.substring(2, 4)}`;
  }

  setExpiry(formattedText);  // Set the formatted value
};

  // Write payment data to Firestore
  const writeUserData = async () => {
    try {
      setLoading(true); // Start loading
      await setDoc(doc(FIRESTORE_DB, "paymentDetails", user.uid), {
        cardHolder,
        cardNumber,
        expiry,
        cvv,
        artistUid: user.uid,
      });
      console.log("Payment data saved");

      // Check if email is verified, if not, send verification
      if (user && !user.emailVerified) {
        await sendEmailVerification(user);
        alert("Email verification sent. Please check your inbox.");
      }

      // Navigate to login
      navigation.dispatch(StackActions.replace("Login"));
    } catch (error) {
      console.log("Error saving payment data: ", error);
      alert("Error saving payment data. Please try again.");
    } finally {
      setLoading(false); // Stop loading
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
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/images/visa.png")}
          />
        </View>
        <Text style={styles.header}>Payment Cards</Text>
        <Text style={styles.paragraph}>
          Payment account that will be used to receive payments
        </Text>

        {/* Card Holder Input */}
        <TextInput
          style={styles.input}
          placeholder="Card Holder"
          placeholderTextColor="white"
          value={cardHolder}
          onChangeText={setCardHolder}
        />
        {errors.cardHolder && <Text style={styles.errorMessage}>{errors.cardHolder}</Text>}

        {/* Card Number Input */}
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          placeholderTextColor="white"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
          maxLength={16}
        />
        {errors.cardNumber && <Text style={styles.errorMessage}>{errors.cardNumber}</Text>}

        {/* Expiry Input */}
        <TextInput
          style={styles.input}
          placeholder="Expiry (MM/YY)"
          placeholderTextColor="white"
          value={expiry}
          onChangeText={(text) => handleExpiryInput(text)}  // Use the handler function
          keyboardType="numeric"
          maxLength={5} // Limit the length to 5 (MM/YY)
        />

        {errors.expiry && <Text style={styles.errorMessage}>{errors.expiry}</Text>}

        {/* CVV Input */}
        <TextInput
          style={styles.input}
          placeholder="CVV (Optional)"
          placeholderTextColor="white"
          value={cvv}
          onChangeText={setCvv}
          keyboardType="numeric"
          maxLength={4}
        />

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue</Text>}
        </TouchableOpacity>

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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",

    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
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
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CEB89E",
    borderRadius: 40,

    height: 280,
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
    backgroundColor: "transparent", // Set this to your desired button color
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
});

export default PaymentScreen;
