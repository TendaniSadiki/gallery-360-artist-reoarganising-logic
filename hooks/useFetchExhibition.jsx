import { useEffect, useState } from "react";
import {
  query,
  where,
  collection,
  onSnapshot,
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
    if (!user) {
      console.error("User is not authenticated.");
      return;
    }

    const colRef = collection(FIRESTORE_DB, "exhibition");
    const q = query(colRef, where("artistUid", "==", user.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const exhibitionList = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        exhibitionList.push({ ...data, key: doc.id });
      });

      setFirebaseExhibition(exhibitionList);

      const exhibitionNames = exhibitionList.map((item) => ({
        value: item.name,
        key: item.key,
      }));
      setExhibitionData(exhibitionNames);

      const now = new Date();

      // Categorize exhibitions into upcoming and past
      const upcomingExhibitions = exhibitionList.filter((item) => {
        const date = getDate(item.date);
        return date && moment(date).isAfter(now);
      });

      const pastExhibitions = exhibitionList.filter((item) => {
        const date = getDate(item.date);
        return date && moment(date).isBefore(now);
      });

      setUpcoming(upcomingExhibitions);
      setPast(pastExhibitions);
    });

    return () => unsubscribe();
  }, []);

  // Utility function to get the date, handling different formats
  const getDate = (date) => {
    if (date?.seconds) {
      // Firestore Timestamp format
      return new Date(date.seconds * 1000);
    } else if (typeof date === "string") {
      // String format
      return new Date(date);
    }
    return null;
  };

  return { exhibitionData, firebaseExhibition, upcoming, past };
};
