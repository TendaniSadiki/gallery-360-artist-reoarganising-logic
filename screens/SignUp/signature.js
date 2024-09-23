import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SignatureView } from "react-native-signature-capture-view";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebase/firebase.config";

const MyPage = ({ route, navigation }) => {
  const auth = FIREBASE_AUTH;
  const signatureRef = useRef(null);
  const [signature, setSignature] = useState(""); // Holds the captured signature
  const user = auth.currentUser;
  const { userData } = route.params; // User data from the previous screen
  console.log("Userdata in signature: ", userData);

  // Function to save the signature in Firestore
  const writeUserData = () => {
    if (!signature) {
      Alert.alert("Please capture your signature before uploading.");
      return;
    }

    setDoc(
      doc(FIRESTORE_DB, "artists", user.uid), 
      {
        signature: signature, // Save the captured signature
        isEnabled: false, // Setting the user profile as not yet enabled
        timeStamp: serverTimestamp(), // Add a timestamp
      },
      { merge: true } // Merge to avoid overwriting existing data
    )
      .then(() => {
        Alert.alert("Your signature has been uploaded successfully!");
      })
      .catch((error) => {
        Alert.alert("Error uploading signature. Please try again.");
        console.log("Error saving signature: ", error);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{  }}
        contentContainerStyle={{ flex: 1, paddingTop: 40, paddingBottom: 20 }}
      >
        <Text style={styles.header}>Signature</Text>
        <Text style={styles.paragraph}>
          This signature will be used as proof of authenticity for your artwork.
        </Text>
        
        {/* Signature Capture Component */}
        <SignatureView
          style={{
            borderWidth: 2,
            flex: 1,
          }}
          ref={signatureRef}
          // onSave is automatically called whenever signature-pad onEnd is called and saveSignature is called
          onSave={(val) => {
            console.log("Saved signature:", val);
            setSignature(val); // Correct function to update signature state
          }}
          onClear={() => {
            console.log("Cleared signature");
            setSignature(""); // Correct function to clear signature
          }}
        />

        {/* Clear and Save Signature Actions */}
        <View style={{ flexDirection: "row", justifyContent: "center", height: 50 }}>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
            onPress={() => signatureRef.current.clearSignature()}
          >
            <Text style={{ color: "white" }}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
            onPress={() => signatureRef.current.saveSignature()}
          >
            <Text style={{ color: "white" }}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Upload Signature Button */}
        <TouchableOpacity
          style={[styles.button, { marginVertical: 20, marginHorizontal: 20 }]}
          onPress={writeUserData}
        >
          <Text style={styles.smallerButtonText}>UPLOAD SIGNATURE</Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate("Payment")}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    // paddingTop: 40,
    //padding: 20,
  },
  paragraph: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  continueButton: {
    backgroundColor: "#CEB89E",
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  smallerButtonText: {
    color: "white",
    fontSize: 16,
  },
  artWorks: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    marginTop: 10,
    backgroundColor: "transparent", // Set this to your desired button color
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    paddingHorizontal: 20,
  },
});

export default MyPage;
