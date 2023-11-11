import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

export const useSignup = () => {
  const [error, setError] = useState(null);

  const signup = async (email, password, displayName) => {
    setError(null);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error("Could not complete signup");
      }

      //Add display name to user
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });

      //create user document
      await setDoc(doc(db, "users", res.user.uid), {
        displayName,
      });
    } catch (err) {
      setError(err.message);
    }
  };
  return { signup, error };
};
