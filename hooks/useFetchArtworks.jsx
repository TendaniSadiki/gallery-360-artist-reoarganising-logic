import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../firebase/firebase.config";

export const useFetchArtworks = () => {
  const [artworkData, setArtworkData] = useState([]);
  const [firebaseArtworks, setFirebaseArtworks] = useState(null);
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    const user = auth.currentUser;
    console.log("User:", user);
  
    if (user) {
      const colRef = collection(FIRESTORE_DB, "Market");
      const q = query(colRef, where("artistUid", "==", user.uid));
      
      console.log("Querying Firestore...");
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        console.log("Snapshot size:", querySnapshot.size);
  
        if (!querySnapshot.empty) {
          const collection = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            key: doc.id,
          }));
  
          const artworkItems = collection.map((item) => ({
            value: item.name,
            key: item.key,
          }));
  
          setArtworkData(artworkItems);
          setFirebaseArtworks(collection);
          console.log("ArtworkData: ", artworkItems);
        } else {
          console.log("No artworks found for this user.");
        }
      });
  
      return () => unsubscribe();
    }
  }, []);
  

  return { artworkData, firebaseArtworks };
};
