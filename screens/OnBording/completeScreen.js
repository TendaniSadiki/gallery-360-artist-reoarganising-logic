import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
const SplashScreen = () => {
  return (
    <View style={styles.safeArea}>
      <Text>0</Text>
      <Image
        style={{ width: 200, height: 200, alignSelf: "center" }}
        source={require("../../assets/images/gallery.png")}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Gallery 360</Text>
        <Text style={styles.smallerText}>Africa</Text>
      </View>
    </View>
  );
};

const Onboarding = ({ navigation }) => {
  console.log('in on boarding');
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

  const [counter, setCounter] = useState(0);

  const shouldRenderOnboarding = counter < onBording.length;
  const allElementsDefined =
    onBording[counter] && onBording[counter].title && onBording[counter].info;

  const shouldRenderLogin = shouldRenderOnboarding && !allElementsDefined;

  const handleNextPress = () => {
    if (counter < onBording.length - 1) {
      // If not the last onboarding screen, increment the counter
      setCounter((prev) => prev + 1);
    } else {
      // If the last onboarding screen, navigate to the "Sign In" screen
      navigation.navigate("Login");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{ width: 200, height: 200, alignSelf: "center" }}
          source={require("../../assets/images/gallery.png")}
        />
      </View>
      {shouldRenderOnboarding && allElementsDefined && (
        <View style={styles.infoContainer}>
          <Text style={styles.header}>{onBording[counter].title}</Text>
          <Text style={styles.paragraph}>{onBording[counter].info}</Text>
          <TouchableOpacity style={styles.button} onPress={handleNextPress}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const App = ({ navigation }) => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowOnboarding(true)
    }, 3000)
  }, [])
  return (
    <View style={styles.container}>
      {showOnboarding ? (
        <Onboarding navigation={navigation} />
      ) : (
          <SplashScreen />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    color: "white",
    alignSelf: "center",
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "black",

    // Set this to your desired background color for the whole screen
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CEB89E",
    borderBottomEndRadius: 40,
    borderBottomLeftRadius: 40,
    height: 500,
  },
  safeArea: {
    alignItems: "center",
    height: "100%",
    backgroundColor: "#CEB89E",
    justifyContent: "space-between",
  },

  brownBackground: {
    width: "80%",
    height: "100%",
    backgroundColor: "brown",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  smallerText: {
    color: "white",
    fontSize: 20,

    textAlign: "center",
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
    height: "30%",
    padding: 10,
    justifyContent: "space-between",
    marginBottom: 20,
  },

  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  smallerText: {
    color: "white",
    fontSize: 20,

    textAlign: "center",
  },
});

export default App;
