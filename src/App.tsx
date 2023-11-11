import "bulmaswatch/solar/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import CellList from "./components/CellList";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import React from "react";
import { useEffect } from "react";
import { saveUser } from "./redux/AuthSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import {
  useAppDispatch,
  useAppSelector,
} from "./hooks/useTypedSelectorAndDispatch";
import { RootState } from "./redux/store";

const App = () => {
  useEffect(() => {
    window.onbeforeunload = (event) => {
      const e = event;
      // Cancel the event
      e.preventDefault();
      if (e) {
        e.returnValue = ""; // Legacy method for cross browser support
      }
      return ""; // Legacy method for cross browser support
    };
  }, []);

  //Every time auth changes we will save new user data to our global state.
  //If there is no user, we just set a user to undefined.
  const user = useAppSelector((state: RootState) => state.auth.value);
  console.log("user from state", user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(saveUser(user.refreshToken));
      } else {
        dispatch(saveUser(undefined));
      }
    });
  }, [auth, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Header />
              <CellList />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
