import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
} from "firebase/firestore";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../firebase/firebase.config";

export const useFetchProfileData = () => {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bio, setBio] = useState("");
  const [signature, setSignature] = useState("");
  console.log(image)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser;
        if (user) {
          const userDocRef = doc(FIRESTORE_DB, "artists", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const data = userDoc.data();
            console.log("User Data:", data);

            setUserData(data);
            setName(data?.fullname || ""); // Only set if data exists
            setImage(data?.imageUrl ? { uri: data.imageUrl } : null); // Only set if photoUrl exists
            setDateOfBirth(data?.dateofbirth || ""); // Only set if dateOfBirth exists
            setBio(data?.biography || ""); // Only set if bio exists
            setSignature(data?.signature ? { uri: data.signature } : ""); // Only set if signature exists
          } else {
            console.log("No user profile found!");
          }
        } else {
          console.log("User is not authenticated");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, []);

  return { userData, name, image, dateOfBirth, bio, signature };
};
