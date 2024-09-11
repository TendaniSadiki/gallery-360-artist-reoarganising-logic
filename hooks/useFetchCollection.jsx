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
  Timestamp,
  FieldPath,
} from "firebase/firestore";
import { FIRESTORE_DB, storage } from "../firebase/firebase.config";
import auth from "../firebase/firebase.config.js";
// import moment from "moment";

export const useFetchCollection = (collection) => {
  const [collectionList, setCollectionList] = useState([]);
  const [firebaseCollection, setFirebaseCollection] = useState(null);
  //   const [upComing, setUpComing] = useState([]);
  //   const [past, setPast] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    const colRef = collection(FIRESTORE_DB, "Market");

    const q = query(colRef, where("artistUid", "==", collection));

    onSnapshot(q, (querySnapshot) => {
      const collection = [];
      querySnapshot?.docs.forEach((doc) => {
        collection.push({ ...doc.data(), key: doc.id });
      });
      collection.map((item) =>
        collectionList.push({ value: item.name, key: item.key })
      );
      console.log("collectionList : ", collectionList);
      setFirebaseCollection(collection);
    });
  }, []);

  return { collectionList, firebaseCollection, past, upComing };
};
