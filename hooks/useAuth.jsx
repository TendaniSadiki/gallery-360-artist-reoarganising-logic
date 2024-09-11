import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const auth = getAuth();

export function useAuth() {
  const [user, setUser] = useState()

  useEffect(() => {
    console.log({ useAuth: 'finding user '})
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
      console.log({ foundUser: user });
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // setUser(user);
      } else {
        // User is signed out
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStateChanged;
  }, []);

  return {
    user,
  };
}