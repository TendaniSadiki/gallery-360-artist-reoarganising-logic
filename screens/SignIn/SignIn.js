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
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import ForgetPassword from "./ForgetPassword";

import auth from "../../firebase/firebase.config.js";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import ActionButton from "../../components/ActionButton.jsx";
import { FIRESTORE_DB } from "../../firebase/firebase.config.js";
import { collection, doc, getDoc } from "firebase/firestore";
import { showToast } from "../../hooks/useToast";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);
  const handleOpenErrorModal = () => setErrorModalVisible(true);
  const handleCloseErrorModal = () => setErrorModalVisible(false);

  console.log('in sign in');

  console.log('Sign in');

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

    // Initialize an empty errors object
    const newErrors = {};

    // Basic email and password validation before sign-in
    if (!email.trim()) {
      newErrors.email = "Please enter a valid email.";
    } else if (!/\S+@\S+\.\S{2,}/.test(email.replace(/ /g, ""))) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Please enter your password.";
    }

    // If errors are found, update the state and show error modal
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      handleOpenErrorModal();
      return;
    }

    try {
      // Sign in the user with email and password
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      showToast(user.email);

      // Check if the user's email is verified
      if (!user.emailVerified) {
        setErrors({ email: "Please verify your email before signing in." });
        await auth.signOut();
        setIsLoading(false);
        handleOpenErrorModal();
        return;
      }

      // If successful, reset errors and navigate to the next screen
      setErrors({});
      console.log("Logged in with:", user.email);
      setIsLoading(false);
      navigation.replace("Tabs");
    } catch (error) {
      // Handle various Firebase authentication errors and set error messages
      if (error.code === "auth/wrong-password") {
        setErrors({ password: "Your password is incorrect. Please try again." });
      } else if (error.code === "auth/user-not-found") {
        setErrors({ email: "No user found with this email." });
      } else {
        console.error("Authentication error:", error);
        setErrors({ general: "Failed to connect to the database. Please try again later." });
      }
      setIsLoading(false);
      handleOpenErrorModal();
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
          <Text style={styles.header}>Welcome Back!</Text>
          <View style={styles.accountLoginContainer}>
            <Text style={styles.smallerText}>Login to your account</Text>
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

          {/* Email Input */}
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Email"
            placeholderTextColor="white"
            value={email}
            onChangeText={setEmail}
            autoCompleteType="email"
            autoComplete="email"
            textContentType="emailAddress"
          />

          {/* Password Input */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="Password"
              placeholderTextColor="white"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
              autoComplete="password"
              textContentType="password"
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.eyeIconContainer}
            >
              <Icon
                name={isPasswordVisible ? "eye" : "eye-slash"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
            <Text style={styles.smallerButtonText}>I forgot my password</Text>
          </TouchableOpacity>
          <ActionButton handleOnPress={handleLogin} isLoading={isLoading} text="Sign In" />

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.smallerButtonText}>I don't have an account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Password Reset Modal */}
      <ForgetPassword isModalVisible={isModalVisible} handleCloseModal={handleCloseModal} />

      {/* Error Modal */}
      <Modal visible={isErrorModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.header}>Error</Text>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}
            <TouchableOpacity style={styles.button} onPress={handleCloseErrorModal}>
              <Text style={styles.buttonText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  eyeIconContainer: {
    position: "absolute",
    right: 10,
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
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: -10, // Adjust based on layout
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
  },
});
