import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import db, { collectionDisplayName } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";


interface AuthState {
  value: string,
  userId: string,
  isLogIn: boolean,
  userDisplayName:string,
}

const initialState:AuthState = {
  value: "",
  userId: "",
  isLogIn: false,
  userDisplayName: "",
};

export const fetchDisplayNameFromFirestore = createAsyncThunk(
  "user/fetchDisplayNameFromFirestore",
  async (userId: string) => {
    console.log("fetch user name")
    const docRef = doc(db, collectionDisplayName, userId);
    const docSnap = await getDoc(docRef);
    const displayName = docSnap.data();
    console.log(displayName)
    return displayName;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.value = action.payload.value
      state.userId = action.payload.userId
      state.isLogIn = action.payload.isLogIn
    },

  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchDisplayNameFromFirestore.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.userDisplayName = action.payload.displayName
        }
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { saveUser } = authSlice.actions;

export default authSlice.reducer;
