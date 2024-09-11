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

export const useFetchArtworks = () => {
  const [artworkData, setArtworkData] = useState([]);
  const [firebaseArtworks, setFirebaseArtworks] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    const colRef = collection(FIRESTORE_DB, "Market");

    const q = query(colRef, where("artistUid", "==", user.uid));

    onSnapshot(q, (querySnapshot) => {
      const collection = [];
      querySnapshot?.docs.forEach((doc) => {
        collection.push({ ...doc.data(), key: doc.id });
      });
      collection.map((item) =>
        artworkData.push({ value: item.name, key: item.key })
      );
      console.log("ArtworkData : ", artworkData);
      setFirebaseArtworks(collection);
    });
  }, []);

  return { artworkData, firebaseArtworks };
};
