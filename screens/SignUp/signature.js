import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
  Modal,
} from "react-native";
// import { SignatureView } from "react-native-signature-capture-view";
import SignatureScreen from "react-native-signature-canvas";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebase/firebase.config";

const MyPage = ({ route, navigation }) => {
  const ref = useRef();
  const auth = FIREBASE_AUTH;
  const [signature, setSignature] = useState(""); // Holds the captured signature
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);
  const user = auth.currentUser;
  console.log(auth);
  
  // const { userData } = route.params; // User data from the previous screen
  // console.log("Userdata in signature: ", userData);

  // Function to save the signature in Firestore
  const writeUserData = () => {
    if (!signature) {
      setErrorModalVisible(true);
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
        // show
        Alert.alert("Your signature has been uploaded successfully!");
        navigation.navigate('Payment')
      })
      .catch((error) => {
        Alert.alert("Error uploading signature. Please try again.");
        console.log("Error saving signature: ", error);
      });
  };
  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature) => {
    console.log({ sign: signature });
    setSignature(signature)
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleSave = () => {
    console.log("Empty");
    ref.current.readSignature()
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log("clear success!");
    ref.current.clearSignature()
    setSignature(null)
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{}}
        contentContainerStyle={{ flex: 1, paddingTop: 40, paddingBottom: 20,  }}
      >
        <View>
          <Text style={styles.header}>Signature</Text>
          <Text style={styles.paragraph}>
            This signature will be used as proof of authenticity for your artwork.
          </Text>
        </View>

        <View style={{ top: 20 }}>
          {/* Signature Capture Component */}
          <View style={{ height: 300 }}>
            <SignatureScreen
              ref={ref}
              onOK={handleOK}
              // overlayHeight={'5000px'}
              webStyle={`
            .m-signature-pad { border: 1px solid black; background-color: #f0f0f0;}
            .m-signature-pad--footer {display: none; margin: 0px; height: 5px}
          `}
            />
          </View>


          {/* Clear and Save Signature Actions */}
          <View style={{ flexDirection: "row", justifyContent: "center", height: 50, top: 0 }}>
            {/* <Button title="Clear" onPress={handleClear} />
          <Button title="Confirm" onPress={handleSave} /> */}
            <TouchableOpacity
              style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
              onPress={() => handleClear()}
            >
              <Text style={{ color: "white" }}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
              onPress={() => handleSave()}
            >
              <Text style={{ color: "white" }}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>



        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => writeUserData()}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isErrorModalVisible}
        onRequestClose={() => {
          setErrorModalVisible(!isErrorModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Please capture your signature before uploading.</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setErrorModalVisible(!isErrorModalVisible)}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    position: 'absolute',
    bottom: 20,
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
});

export default MyPage;
