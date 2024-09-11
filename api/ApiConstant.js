import Icon from "react-native-vector-icons/FontAwesome5";
import AddSocialMedia from "./AddSocialMedia";
import { setDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB, storage } from "../../firebase/firebase.config";
import auth from "../../firebase/firebase.config.js";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

//import { db, storage } from "../firebaseConfig";
// Replace "FontAwesome5" with the icon library of your choice.

const [image, setImage] = useState("");
const [fullName, setFullName] = useState("");
const [contactNumber, setContactNumber] = useState("");
const [website, setWebsite] = useState("");
const [dateOfBirth, setDateOfBirth] = useState("");
const [bio, setBio] = useState("");
const [imageUrl, setImageUrl] = useState(null);
const [modalIsVisible, setModalIsVisible] = useState(false);
const [instagram, setInstagram] = useState("");
const [facebook, setFacebook] = useState("");
const [progress, setProgress] = useState(0);

const user = auth.currentUser;
const writeUserData = () => {
  setDoc(doc(FIRESTORE_DB, "artists", user.uid), {
    fullname: fullName,
    contactnumber: contactNumber,
    websiteurl: website,
    dateofbirth: dateOfBirth,
    biography: bio,
    imageUrl: imageUrl,
    facebook: facebook,
    instagram: instagram,
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

async function pickImage() {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [3, 4],
    quality: 1,
  });

  if (!result.canceled) {
    const source = { uri: result.assets[0].uri };
    setImage(source);
    // setImage(result.assets[0].uri);
    // upload the image
    await uploadImage(result.assets[0].uri, "image");
  }
}

async function pickVideo() {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    allowsEditing: true,
    aspect: [3, 4],
    quality: 1,
  });

  if (!result.canceled) {
    setImage(result.assets[0].uri);
    await uploadImage(result.assets[0].uri, "video");
  }
}

async function uploadImage(uri, fileType) {
  const response = await fetch(uri);
  const blob = await response.blob();

  const storageRef = ref(storage, "ProfileImages/" + new Date().getTime());
  const uploadTask = uploadBytesResumable(storageRef, blob);

  // listen for events
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      setProgress(progress.toFixed());
    },
    (error) => {
      // handle error
      console.log(error);
      alert("Upload Error : ", error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        console.log("File available at", downloadURL);
        // save record
        setImageUrl(downloadURL);
        await saveRecord(fileType, downloadURL, new Date().toISOString());
        //setVideo("");
      });
    }
  );
}
