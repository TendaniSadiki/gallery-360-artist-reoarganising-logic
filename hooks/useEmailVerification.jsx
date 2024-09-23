import { useEffect, useState } from "react";
import  onAuthStateChanged  from "firebase/auth";
import FIREBASE_AUTH from "../firebase/firebase.config";

const useEmailVerification = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = FIREBASE_AUTH;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsVerified(user.emailVerified);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { isVerified, loading };
};

export default useEmailVerification;
