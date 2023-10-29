import { useState } from "react";
import { Link } from "react-router-dom";


export default function SignUp() {
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    // await signup(email, password, displayName);
  };
  return (
    <>
      <nav className="navbar">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/">
                <button className="button is-light">Homepage</button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div
        className="field is-grouped is-grouped-centered columns"
        style={{ marginTop: "3rem" }}
      >
        {/* change div to alert */}
        {/* {error && <div>{error}</div>}/ */}
        <form onSubmit={handleSignUp}>
          <h2 className="title">Sign Up</h2>

          <div className="field" id="email">
            <label className="label is-large">Nickname</label>
            <input
              className="control is-large"
              type="text"
              value={displayName}
              required
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          <div className="field" id="email">
            <label className="label is-large">Email</label>
            <input
              className="control is-large"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field" id="password-confirm">
            <label className="label is-large">Password</label>
            <input
              className="control is-large"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="field">
            <button type="submit" className="button is-link">
              Sign Up
            </button>
          </div>
          <div className="field">
            Already have an account <Link to="/login">Log in</Link>
          </div>
        </form>
      </div>
    </>
  );
}
