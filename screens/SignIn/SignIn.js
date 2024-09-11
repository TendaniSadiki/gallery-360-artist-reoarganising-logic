import { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import ForgetPassword from "./ForgetPassword";

import auth from "../../firebase/firebase.config.js";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import ActionButton from "../../components/ActionButton.jsx";

export default function App({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  console.log('in sign in');
  const handleOpenModal = () => {
    setModalIsVisible(true);
  };

  const handleCloseModal = () => {
    setModalIsVisible(false);
  };
  console.log('Sign in');
  //const auth = getAuth(app);

  // async function handleSignIn() {
  //   if (email === "" || password === "") {
  //     setError("Email and password are mandatory.");
  //     Alert(error)
  //     return;
  //   }

  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //   } catch (err) {
  //     console.log(err);
  //     setError(err.message);
  //   }
  // }

  useEffect(() => {
    console.log({ authInSignIn: auth });
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // navigation.replace("Tabs");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // Sign in the user with email and password
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
  
      // Check if the user's email is verified
      if (!user.emailVerified) {
        // Handle email not verified
        Alert.alert(
          "Email Not Verified",
          "Please verify your email before signing in.",
          [{ text: "OK" }]
        );
        // Optionally sign the user out
        await auth.signOut();
        setIsLoading(false);
        return;
      }
  
      // Email is verified, navigate to the next screen
      console.log("Logged in with:", user.email);
      setIsLoading(false);
      navigation.replace("Tabs");
    } catch (error) {
      setIsLoading(false);
      if (error.code === "auth/wrong-password") {
        // Handle incorrect password error
        console.log("Your password is incorrect. Please try again.");
        Alert.alert("Your password is incorrect. Please try again.");
      } else if (error.code === "auth/wrong-email") {
        // Handle other authentication errors
        Alert.alert("Enter a Valid Email");
        console.error("Authentication error:", error);
      } else {
        console.error("Authentication error:", error);
        Alert.alert("Failed to connect to the database");
      }
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            style={{ width: 200, height: 200, alignSelf: "center" }}
            source={require("../../assets/images/gallery36.png")}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.header}>Welcome Back !</Text>
          <View style={styles.accountLoginContainer}>
            <Text style={styles.smallerText}> Login to your account</Text>
            <View style={styles.iconContainer}>
              <Icon
                name="google"
                size={20}
                style={{ paddingRight: 20 }}
                color="gray"
              />
              <Icon name="facebook" size={20} color="gray" />
            </View>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="white"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="white"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
            <Text style={styles.smallerButtonText}>I forgot my password</Text>
          </TouchableOpacity>
          <ActionButton
              handleOnPress={handleLogin}
              isLoading={isLoading}
              text="Sign In"
            />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.smallerButtonText}>
              I don't have an account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  imageContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CEB89E",
    borderBottomEndRadius: 40,
    borderBottomLeftRadius: 40,
    height: 380,
  },
  accountLoginContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%'
  },
  iconContainer: {
    marginLeft: 100,
    flexDirection: "row",
  },
  image: {
    width: "50%", // Adjust this value to control the image size
    height: "100%", // Adjust this value to control the image size
    resizeMode: "contain",
  },
  card: {
    flex: 1,
    backgroundColor: "#f0f0f0", // Set this to your desired card background color
    padding: 20,
  },
  smallerText: {
    color: "white",
    textAlign: "right",
  },
  header: {
    fontSize: 44,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    
  },
  inputContainer: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "transparent", // Set this to your desired background color for the whole screen
    // backgroundColor: 'green',
    padding: 20
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
    textDecorationColor: "white",
  },
  signInButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#CEB89E", // Set this to your desired button background color
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "transparent", // Set this to your desired button color
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    borderRadius: 5,
    // backgroundColor: 'red',
    marginVertical: 10,
    marginLeft: 100,
    alignSelf: 'flex-end',
  },
  smallerButtonText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 14,
  },
  smallerButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: 'green',
    flex: 1
  },
});
