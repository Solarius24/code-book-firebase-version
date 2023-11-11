// @ts-nocheck
import { useNavigate } from "react-router";
import "./Header.css";
import { isDataSavedStatus } from "../redux/CellsSlice";
import { collectionCellData, collectionName,db} from "../firebase/config";
import useFirestore from "../hooks/useFirestore";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelectorAndDispatch";
import { useLogout } from "../hooks/useLogout";
import { doc } from "firebase/firestore";

const Header = () => {
  const selector = useAppSelector((state) => state.cells.isDataSaved);
  const dispatch = useAppDispatch()
  const userId = useAppSelector((state) => state.auth.userId);
  const navigate = useNavigate();
  const { updateDataToFirestore } = useFirestore();
  const { logout } = useLogout();
  const dispalyName = useAppSelector((state) => state.auth.userDisplayName)

  const handleUpdateToFirebase = () => {
    dispatch(isDataSavedStatus(true));
    const docRef = doc(db, collectionCellData, userId)
    updateDataToFirestore(docRef, collectionName);
  
  };

  const handleLogout = (e: any) => {
    logout();

  };
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
            <h1 className="title has-text-danger">HELLO {dispalyName}</h1>
          </div>
            <div className="navbar-item">
              <div className="buttons">
                {userId && (
                  <button
                    onClick={handleUpdateToFirebase}
                    className="button is-warning"
                    disabled = {selector}
       
                  
                  >
                    <strong>SAVE</strong>
                  </button>
                )}

                {userId && (
                  <a
                    onClick={handleLogout}
                    className="button is-light"
                    href=" "
                  >
                    Logout
                  </a>
                )}

                {!userId && (
                  <a
                    onClick={() => navigate("/signup")}
                    className="button is-primary"
                    href=" "
                  >
                    <strong>Sign up</strong>
                  </a>
                )}

                {!userId && (
                  <a
                    onClick={() => navigate("/login")}
                    className="button is-light"
                    href=" "
                  >
                    Log in
                  </a>
                )}
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

export default Header
// export default Header;
// function updateDataToFirestore(docRef: any, collectionName: any) {
//   throw new Error("Function not implemented.");
// }

// function dispatch(arg0: { payload: any; type: "Cells/isDataSavedStatus" }) {
//   throw new Error("Function not implemented.");
// }
