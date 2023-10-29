import { useNavigate } from "react-router";

import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  const navigate = useNavigate();

  const handleLogout = (e: any) => {
    e.preventDefault();

    navigate("/login");
  };
  return (
    <div className="header-container">
      <nav className="navbar">
        <h1 className="title">CODE BOOK</h1>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {/* {!currentUser && (
                <>
                  <button className="button is-light">
                    <Link to="/login">Login</Link>
                  </button>
                  <button className="button is-light">
                    <Link to="/signup">Signup</Link>
                  </button>
                </>
              )} */}
            </div>
          </div>

          {/* {currentUser && (
            <li>
              <button className="button is-link" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )} */}
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
        If you will sign in and create your account, all of your changes will be saved to the <strong>FIRESTORE DATABASE.</strong> 
      </h4>
    </div>
  );
};

export default Header;
