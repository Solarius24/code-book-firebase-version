import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";

export const useLogout = () => {
  const [error, setError] = useState(null);

  const logout = async () => {
    setError(null);
    try {
      //sign user out
      const auth = getAuth();
      await signOut(auth);
    } catch (err) {
      setError(err.message);
    }
  };

  return { logout, error };
};
