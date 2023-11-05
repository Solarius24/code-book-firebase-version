// @ts-nocheck
import { updateDoc } from "firebase/firestore";

function useFirestore() {
  const updateDataToFirestore = (docRef, sessionStorageName) => {
    updateDoc(docRef, JSON.parse(sessionStorage.getItem(sessionStorageName)));
  };
  return { updateDataToFirestore };
}

export default useFirestore;
