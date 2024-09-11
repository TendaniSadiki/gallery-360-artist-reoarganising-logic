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
const [name, setName] = useState("");
const [contactNumber, setContactNumber] = useState("");
const [userData, setUserData] = useState("");
const [dateOfBirth, setDateOfBirth] = useState("");
const [bio, setBio] = useState("");
const [imageUrl, setImageUrl] = useState(null);
const [modalIsVisible, setModalIsVisible] = useState(false);
const [instagram, setInstagram] = useState("");
const [facebook, setFacebook] = useState("");
const [progress, setProgress] = useState(0);

getDoc(doc(FIRESTORE_DB, "artists", user.uid), {})
  .then((docData) => {
    // Success callback
    console.log("data ", docData.data());
    if (docData.exists()) {
      let data = docData.data();
      setUserData(data);
      setName(data.fullname);
      setImage({ uri: data.imageUrl });
    } else console.log("NO SUCH DATA");
  })
  .catch((error) => {
    // Error callback
    alert(error);
    console.log("error ", error);
  });
