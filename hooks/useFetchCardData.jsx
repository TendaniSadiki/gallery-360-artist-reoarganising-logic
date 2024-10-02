import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../firebase/firebase.config";

export const useFetchCardData = () => {
  const [cardData, setCardData] = useState(null);
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser;
        if (user) {
          const cardDocRef = doc(FIRESTORE_DB, "paymentDetails", user.uid);
          const cardDoc = await getDoc(cardDocRef);

          if (cardDoc.exists()) {
            const data = cardDoc.data();
            console.log("Card Data:", data);

            setCardData(data);
            setCardHolder(data?.cardHolder || ""); // Only set if cardHolder exists
            setCardNumber(data?.cardNumber || ""); // Only set if cardNumber exists
            setExpiry(data?.expiry || ""); // Only set if expiry exists
            setCvv(data?.cvv || ""); // Only set if CVV exists
          } else {
            console.log("No card information found!");
          }
        } else {
          console.log("User is not authenticated");
        }
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchCardData();
  }, []);

  return { cardData, cardHolder, cardNumber, expiry, cvv };
};
