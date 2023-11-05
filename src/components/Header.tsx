// @ts-nocheck
import { useNavigate } from "react-router";
import "./Header.css"
import { isDataSavedStatus } from "../redux/CellsSlice";
import { collectionName, docRef } from "../firebase/config";
import { useDispatch } from "react-redux";
import useFirestore from "../hooks/useFirestore";
import { useSelector } from "react-redux";
const Header = () => {
  const selector = useSelector((state)=> state.cells.isDataSavedStatus)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { updateDataToFirestore } = useFirestore();

  const handleUpdateToFirebase = () => {
    dispatch(isDataSavedStatus(true));
    updateDataToFirestore(docRef, collectionName);
  };

  // const handleLogout = (e: any) => {
  //   e.preventDefault();

  //   navigate("/login");
  // };
  return (
    <>
      <nav
        className="navbar is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <div className="navbar-item">
            <h1 className="title has-text-warning">CODEBOOK</h1>
          </div>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button onClick={handleUpdateToFirebase} className="button is-warning" disabled = {selector ? true : false}>
                  <strong>SAVE</strong>
                </button>

                <a className="button is-primary">
                  <strong>Sign up</strong>
                </a>
                <a className="button is-light">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <hr></hr>
      <h4 className="header-subtitle">
        This is an interactive coding environment. You can write Javascript, see
        it executed, and write comprehensive documentation using markdown.
      </h4>
      <ul className="header-list">
        <li>
          <h5>Click any text cell to edit.</h5>
        </li>
        <li>
          <h5>
            The code in each code editor is all joined together into one file.
            If you define{" "}
            <strong className="header-show-function">a variable cell#1</strong>,
            you can refer to it in any following cell.
          </h5>
        </li>
        <li>
          <h5>
            You can show any React Component, string, number, or anything else
            by calling{" "}
            <strong className="header-show-function">show function</strong> .
            This is a function built into this environment. Call show multiple
            times to show multiple values.
          </h5>
        </li>
        <li>
          <h5>Re-order or delete cells using buttons on the top right.</h5>
        </li>
        <li>
          <h5>Add new cells by hovering on the divider between each cell.</h5>
        </li>
      </ul>
      <h4 className="header-subtitle">
        If you will sign in and create your account, all of your changes will be
        saved to the <strong>FIRESTORE DATABASE.</strong>
      </h4>
    </>
  );
};

export default Header;
// function updateDataToFirestore(docRef: any, collectionName: any) {
//   throw new Error("Function not implemented.");
// }

// function dispatch(arg0: { payload: any; type: "Cells/isDataSavedStatus" }) {
//   throw new Error("Function not implemented.");
// }
