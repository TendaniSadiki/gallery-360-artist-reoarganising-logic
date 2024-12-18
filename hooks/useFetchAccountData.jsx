import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase/firebase.config";
import auth from "../firebase/firebase.config";

export const useFetchAccountData = () => {
  const [accountData, setAccountData] = useState({
    accountHolder: "",
    accountNumber: "",
    bankName: "",
    branchCode: "",
    documentUrl: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(FIRESTORE_DB, "paymentDetails", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setAccountData(docSnap.data());
          } else {
            console.log("No account data found");
          }
        }
      } catch (error) {
        console.error("Error fetching account data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, []);

  return { ...accountData, loading };
};
