import { useEffect, useState } from "react";
import {
  setDoc,
  doc,
  getDoc,
  getDocs,
  addDoc,
  query,
  where,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { FIRESTORE_DB, storage } from "../firebase/firebase.config";
import auth from "../firebase/firebase.config.js";

export const useFetchProfileData = () => {
  const profilePic = require("../assets/images/userImage.jpg"); // Replace with the actual path to the profile picture

  const sign = require("../assets/images/Jon_Kirsch's_Signature.png");
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("John Doe");
  const [image, setImage] = useState(profilePic);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [bio, setBio] = useState("John Doe");
  const [signature, setSignature] = useState(sign);

  useEffect(() => {


    const fetchData = async () => {
      const user = auth.currentUser;
      const colRef = collection(FIRESTORE_DB, "artists");
      const q = query(colRef, where("artistUid", "==", user.uid));

      onSnapshot(q, (querySnapshot) => {
        querySnapshot?.docs.forEach((doc) => {
     
          const data = doc.data();
        
          console.log("data", data);
          setUserData(data);
          setName(data?.artistName);
          setImage({ uri: data?.photoUrl });
          setDateOfBirth(data?.dateofbirth);
          setBio(data?.biography);
          setSignature({ uri: data?.signature });
        });
      });
      console.log("data profile: ", data);
   
    };

    
    fetchData();
  }, []);
  return { userData, name, image, dateOfBirth, bio, signature };
};
