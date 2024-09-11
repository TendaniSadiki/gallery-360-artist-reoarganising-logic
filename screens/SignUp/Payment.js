import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5"; // Replace "FontAwesome5" with the icon library of your choice.
import { StackActions } from "@react-navigation/native";
import { setDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB, storage } from "../../firebase/firebase.config";
import auth from "../../firebase/firebase.config.js";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

const PaymentScreen = ({ navigation }) => {
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});
  console.log('payment');
  const validateForm = () => {
    console.log("validateForm is hit");
    let errors = {};
    // Ensures at least first and last name
    if (cardHolder.trim() === "") {
      errors.cardHolder = "Card holder is required";
    } else if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(cardHolder)) {
      errors.cardHolder = "Please enter a valid full name (e.g., John Doe)";
    }

    // Matches only digits
    if (!cardNumber) {
      errors.cardNumber = "Card number is required";
    } else if (cardNumber.length < 14) {
      errors.cardNumber = "Enter a valid card number";
    } else if (!/^\d+$/.test(cardNumber)) {
      errors.cardNumber = "Please enter a valid card number (digits only)";
    }

    if (!expiry) {
      errors.expiry = "Expiry date is required";
    }

    // if (!cvv) {
    //   errors.cvv = "Profile image is required";
    // } else if (!/^\d+$/.test(cvv)) {
    //   errors.cvv = "Please enter a valid card number (digits only)";
    // }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const user = auth.currentUser;
  const writeUserData = () => {
    setDoc(doc(FIRESTORE_DB, "paymentDetails", user.uid), {
      cardHolder,
      cardNumber,
      expiry,
      cvv,
      artistUid: user.uid,
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

  const handleContinue = () => {
    // You can perform any action here, such as processing the payment details
    // For simplicity, we'll just log the data for now.
    if (validateForm()) {
      writeUserData();
      navigation.dispatch(StackActions.replace("Tabs"));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            style={{
              width: 300,
              height: 220,
              alignSelf: "center",
              borderRadius: 50,
            }}
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
        {errors.website ? (
          <Text style={styles.errorMessage}>{errors.website}</Text>
        ) : null}
        {/* Card Number Input */}
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          placeholderTextColor="white"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
        />
        {errors.cardNumber ? (
          <Text style={styles.errorMessage}>{errors.cardNumber}</Text>
        ) : null}
        {/* Expiry Input */}
        <TextInput
          style={styles.input}
          placeholder="Expiry (MM/YY)"
          placeholderTextColor="white"
          value={expiry}
          onChangeText={setExpiry}
          keyboardType="numeric"
        />
        {errors.expiry ? (
          <Text style={styles.errorMessage}>{errors.expiry}</Text>
        ) : null}
        {/* CVV Input */}
        <TextInput
          style={styles.input}
          placeholder="CVV (Optional)"
          placeholderTextColor="white"
          value={cvv}
          onChangeText={setCvv}
          keyboardType="numeric"
        />
        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("might do, might not, might maybe")}
        >
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
