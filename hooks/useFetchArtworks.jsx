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

    if (user) {
      const colRef = collection(FIRESTORE_DB, "Market");
      const q = query(colRef, where("artists", "==", user.uid));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const collection = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          key: doc.id,
        }));

        // Map artwork names into artworkData state
        const artworkItems = collection.map((item) => ({
          value: item.name,
          key: item.key,
        }));

        setArtworkData(artworkItems);
        setFirebaseArtworks(collection);
        console.log("ArtworkData: ", artworkItems);
      });

      // Cleanup listener on unmount
      return () => unsubscribe();
    }
  }, []);

  return { artworkData, firebaseArtworks };
};
