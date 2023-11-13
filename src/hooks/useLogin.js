import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/config";

export const useLogin = () => {
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setError(null);

    try {
      // login
      const res = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return { login, error };
};
