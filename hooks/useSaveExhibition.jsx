import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase/firebase.config"; // Update with your actual config

export const useSaveExhibition = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveExhibition = async ({
    name,
    email,
    contactNumber,
    address,
    fromDate,
    toDate,
    fromTime,
    toTime,
    desc,
    imagesUrls,
    selectedArtworks,
    artistUid,
  }) => {
    setLoading(true);
    try {
      const colRef = collection(FIRESTORE_DB, "exhibition");

      await addDoc(colRef, {
        name,
        email,
        contactNumber,
        address,
        date: {
          fromDate: Timestamp.fromDate(fromDate),
          toDate: Timestamp.fromDate(toDate),
        },
        time: { fromTime, toTime },
        desc,
        imgUrls: imagesUrls,
        collections: selectedArtworks,
        artistUid,
        createdAt: Timestamp.now(),
      });

      setLoading(false);
      return true;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      return false;
    }
  };

  return { saveExhibition, loading, error };
};
