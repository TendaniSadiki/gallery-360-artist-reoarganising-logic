import { useEffect, useState } from "react";
import {
  query,
  where,
  collection,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase/firebase.config";
import auth from "../firebase/firebase.config.js";
import moment from "moment";

export const useFetchExhibition = () => {
  const [exhibitionData, setExhibitionData] = useState([]);
  const [firebaseExhibition, setFirebaseExhibition] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    const colRef = collection(FIRESTORE_DB, "exhibition");

    // Query to get exhibitions based on the current user's UID
    const q = query(colRef, where("artistUid", "==", user.uid));

    // Fetching data from Firestore in real-time using onSnapshot
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const exhibitionList = [];

      querySnapshot?.docs.forEach((doc) => {
        // Get the exhibition data
        const data = doc.data();
        exhibitionList.push({ ...data, key: doc.id });
      });

      // Set exhibition data in state
      setFirebaseExhibition(exhibitionList);
      console.log("Firebase Exhibitions:", exhibitionList);

      // Map the data for exhibitionData (for a dropdown or list view)
      const exhibitionNames = exhibitionList.map((item) => ({
        value: item.name,
        key: item.key,
      }));
      setExhibitionData(exhibitionNames);

      // Categorize exhibitions into upcoming and past based on date
      const now = Timestamp.now().toDate();
      const upcomingExhibitions = exhibitionList.filter((item) =>
        moment(item.date.toDate).isAfter(now)
      );
      const pastExhibitions = exhibitionList.filter((item) =>
        moment(item.date.toDate).isBefore(now)
      );

      setUpcoming(upcomingExhibitions);
      setPast(pastExhibitions);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return { exhibitionData, firebaseExhibition, upcoming, past };
};
