import auth from "../firebase/firebase.config";
import { useState, useEffect } from "react";
import {
  query,
  where,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { FIRESTORE_DB, storage } from "../firebase/firebase.config";


export const useProfileData = () => {
  const profilePic = require("../assets/images/userImage.jpg"); // Replace with the actual path to the profile picture

  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("John Doe");
  const [image, setImage] = useState(profilePic);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      const colRef = collection(FIRESTORE_DB, "artists");
      const q = query(colRef, where("artistUid", "==", user.uid));

      try {
        console.log('Before snap');
        onSnapshot(q, (querySnapshot) => {
          console.log('after snap');
          querySnapshot?.docs.forEach((doc) => {
            const data = doc.data();
            console.log({ data });
            if (!data) return null
            console.log("data", data);
            setUserData(data);
            setName(data.artistName);
            setImage({ uri: data.photoUrl });
            console.log("data profile: ", data);
          });
        });

      } catch (error) {
        console.log("new error : ", error);
        console.log('err');
      }
    };
    fetchData();
  }, []);

  // Your component rendering and JSX code here...

  return { name, userData, image };
};
