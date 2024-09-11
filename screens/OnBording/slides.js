import { useState } from "react";
import { TouchableOpacity, StyleSheet, View, Text, Image } from "react-native";
//import SpashScreen from "./screens/OnBording/SpashScreen.js";
export default function App() {
  console.log('in slides');
  const onBording = [
    {
      id: 1,
      title: "Welcome Creative",
      info: "We're thrilled to have you join us and showcase your artwork to a global audience. With out platform, you can easily upload your artwork, manage your inventory, and even host your own exihibitions.",
    },
    {
      id: 2,
      title: "Your Profile",
      info: "To get started, you'll need to create your artist profile. Simply provide your personal informationl. We encourage you to include your social media accounts, to help promote your artwork.",
    },
    {
      id: 3,
      title: "Your Artwork",
      info: "Once your profile is complete, you can start u[ploading your artwork. We recommend taking high-quality images of your artworkm including detailed shot of the nature and color  .",
    },
    {
      id: 4,
      title: "Your Showcasing",
      info: "Our platform makes it easy to manage your inventory, keep track of your artwork's location, and update your price list as needed. You can also receive notifications about upcoming exhibitions and art fairs, and apply to participate directly through the platform.",
    },
  ];

  //const [currentInfo, setCurrentInfo] = useState(onBording[0])
  const [counter, setCounter] = useState(0);

  const shouldRenderOnboarding = counter < onBording.length;
  const allElementsDefined =
    onBording[counter] && onBording[counter].title && onBording[counter].info;

  const shouldRenderLogin = shouldRenderOnboarding && !allElementsDefined;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{ width: 200, height: 200, alignSelf: "center" }}
          source={require("./assets/images/gallery.png")}
        />
      </View>
      {shouldRenderOnboarding && allElementsDefined && (
        <View style={styles.infoContainer}>
          <Text style={styles.header}>{onBording[counter].title}</Text>
          <Text style={styles.paragraph}>{onBording[counter].info}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setCounter((prev) => prev + 1)}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
      {shouldRenderLogin && (
        /* Your Login component here */
        <LoginComponent />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Set this to your desired background color for the whole screen
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CEB89E",
    borderBottomEndRadius: 40,
    borderBottomLeftRadius: 40,
    height: 500,
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
    color: "white",
  },
  button: {
    backgroundColor: "transparent", // Set this to your desired button color
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  infoContainer: {
    padding: 10,
    marginBottom: 20,
  },
});
