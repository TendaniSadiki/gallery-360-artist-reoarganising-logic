import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
    paddingTop: 40,
  },
  input: {
    width: "100%",
    height: 50,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
    paddingHorizontal: 12,
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
  header2: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "white",
    textAlign: "left",
  },
  smallerText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 14,
  },
  imageContainer: {
    marginTop: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    height: 180,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    borderStyle: "dashed",
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
  cameraIcon: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 20,
    position: "absolute",
    bottom: "50%", // Move the camera icon a bit lower to center it
  },
  imageContainer2: {
    marginTop: 20,
    padding: 20,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "black",
    height: 150,
    width: 150,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    borderStyle: "dashed",
    marginBottom: 20,
  },
  cameraIcon2: {
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 20,
    position: "absolute",
    bottom: "50%", // Move the camera icon a bit lower to center it
  },
  textIcon: {
    color: "#fff",
    fontSize: 14,
    position: "absolute",
    bottom: "35%",
  },
  carouselImage: {
    width: 150,
    height: 150, // Adjust this value to control the image height
    borderRadius: 15,
    alignSelf: "center",
    marginVertical: 10,
  },
  dimensionsInput: {
    width: "40%",
    height: 50,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
    paddingHorizontal: 12,
    alignSelf: "center",
    color: "#fff",
  },
  errorMessage: {
    width: "80%",
    color: "red",
    marginBottom: 10,
    textAlign: "left",
  },
});
