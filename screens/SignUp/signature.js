//import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { SignatureView } from "react-native-signature-capture-view";

import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { FIRESTORE_DB, storage } from "../../firebase/firebase.config";
import auth from "../../firebase/firebase.config.js";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import {
//   addDoc,
//   collection,
//   onSnapshotm,
//   serverTimestamp,
// } from "firebase/firestore";

//import { db, storage } from "../firebaseConfig";
// Replace "FontAwesome5" with the icon library of your choice.

const MyPage = ({ route, navigation }) => {
  const signatureRef = useRef(null);
  const [text, setText] = useState("");
  console.log('signature');
  const user = auth.currentUser;
  const { userData } = route.params;
  console.log('userdata in signature: ', userData);

  const {
    fullname: fullName,
    contactnumber: contactNumber,
    websiteurl: website,
    dateofbirth: dateOfBirth,
    biography: bio,
    imageUrl: imageUrl,
    facebook: facebook,
    instagram: instagram,
    videoUrl: videoUrl,
  } = userData;

  const writeUserData = () => {
    console.log('trying to save data');
    setDoc(doc(FIRESTORE_DB, "artists", user.uid), {
      artistName: fullName,
      contactnumber: contactNumber,
      websiteurl: website,
      dateofbirth: dateOfBirth,
      biography: bio,
      photoUrl: imageUrl,
      facebook: facebook,
      instagram: instagram,
      artistUid: user.uid,
      videoUrl: videoUrl,
      signature: text,
      isEnabled: false,
      timeStamp: serverTimestamp(),
    })
      .then((result) => {
        // Success callback
        console.log("data ", result);
        Alert.alert("Your Data Is Saved Successfully");
      })
      .catch((error) => {
        // Error callback
        Alert.alert("There was an error capturing your data");
        console.log("error ", error);
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
        <SignatureView
          style={{
            borderWidth: 2,
            flex: 1
          }}
          ref={signatureRef}
          // onSave is automatically called whenever signature-pad onEnd is called and saveSignature is called
          onSave={(val) => {
            //  a base64 encoded image
            console.log("saved signature");
            console.log('signatureVal: ', val);
            setText(val);
          }}
          onClear={() => {
            console.log("cleared signature");
            setText("");
          }}
        />
        <View
          style={{ flexDirection: "row", justifyContent: "center", height: 50 }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              flex: 1,
            }}
            onPress={() => {
              signatureRef.current.clearSignature();
            }}
          >
            <Text style={{ color: "white" }}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",

              flex: 1,
            }}
            onPress={() => {
              signatureRef.current.saveSignature();
            }}
          >
            <Text style={{ color: "white" }}>Save</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.button, { marginVertical: 20, marginHorizontal: 20 }]} onPress={() => writeUserData()}>
          <Text style={styles.smallerButtonText}>UPLOAD SIGNATURE</Text>
        </TouchableOpacity>
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
