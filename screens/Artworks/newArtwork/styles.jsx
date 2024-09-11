import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
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
    paddingHorizontal: 12,
    borderBottomColor: "#ccc",
    marginBottom: 20,
    color: "#fff",
  },
  dimensionsInput: {
    width: "40%",
    height: 50,
    fontSize: 16,
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    borderBottomColor: "#ccc",
    marginBottom: 20,
    alignSelf: "center",
    color: "#fff",
  },

  signInButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#CEB89E",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  header: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    textAlign: "left",
  },
  smallerText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 14,
  },

  button: {
    marginTop: 15,
    backgroundColor: "transparent", // Set this to your desired button color
    padding: 12,
    borderRadius: 5,
    marginBottom: 30,
    borderRadius: 50,
    flexDirection: "row",
    backgroundColor: "gray",
  },
  smallerButtonText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 14,
  },
  iconContainer: {
    marginTop: 30,
    flexDirection: "row",
  },
  imageContainer: {
    marginTop: 40,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    borderStyle: "dashed", // Add dashed border style
    width: "100%",
    height: 500, // Adjust this value to control the image height
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 20,
  },

  imageContainer2: {
    marginTop: 10,
    padding: 20,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    height: 120,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    borderStyle: "dashed",
  },
  textIcon: {
    color: "#fff",
    fontSize: 14,
    position: "absolute",
    bottom: "50%",
  },
  textIcon2: {
    color: "gray",
    fontSize: 14,
    position: "absolute",
    bottom: "15%",
  },
  cameraIcon: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 5,
    // Move the camera icon a bit lower to center it
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    //marginRight: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 5,
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 15,
  },
  checkboxText: {
    color: "white",
    // textTransform: "uppercase",
  },
  selectedCheckbox: {
    backgroundColor: "#CEB89E", // Customize the background color when the checkbox is selected
  },
  selectedText: {
    fontWeight: "bold", // Customize the style when the checkbox is selected
  },
  artWorks: {
    flexDirection: "column",
    justifyContent: "space-between",
    //flexWrap: "wrap",
  },
  availabilityCheckboxContainer: {
    flexDirection: "column",
    //alignItems: "center",
    justifyContent: "space-around",
    margin: 5,
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 20,
  },
  availability: {
    flexDirection: "column",
    // justifyContent: "space-between",
    //flexWrap: "wrap",
  },
  availabilityCheckboxText: {
    color: "white",
    marginLeft: 10,
  },
  availabilityCheckbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  returnPolicytextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  returnPolicytext: {
    color: "#fff",
    fontSize: 16,
  },
  returnPolicytext2: {
    color: "gray",
    fontSize: 14,
  },
  carouselImage: {
    width: 150,
    height: 150, // Adjust this value to control the image height
    borderRadius: 15,
    alignSelf: "center",
    marginVertical: 10,
  },
  NewTypeButton: {
    width: "35%",
    height: 45,
    backgroundColor: "gray",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  header2: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    padding: 10,
  },
  buttonText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 16,
  },
  newButtonText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 12,
  },
  errorMessage: {
    width: "80%",
    color: "red",
    marginBottom: 10,
    textAlign: "left",
  },
});
