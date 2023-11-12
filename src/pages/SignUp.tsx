import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

export default function SignUp() {
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { signup } = useSignup();
  const navigate = useNavigate();

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    await signup(email, password, displayName);
    navigate("/");
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
        {error && <div>{error}</div>}


        
        <form onSubmit={handleSignUp} className="field column is-half">
          <h2 className="title has-text-centered">Sign Up</h2>

          <div className="field" id="email">
            <label className="label is-large">Nickname</label>
            <input
              className="input is-large"
              type="text"
              value={displayName}
              required
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          <div className="field" id="email">
            <label className="label is-large">Email</label>
            <input
              className="input is-large"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field" id="password-confirm">
            <label className="label is-large">Password</label>
            <input
              className="input is-large"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="field">
            <button type="submit" className="button is-link is-large">
              Sign Up
            </button>
          </div>
          <div className="field has-text-centered">
            Already have an account <Link to="/login">Log in</Link>
          </div>
        </form>
      </div>
    </>
  );
}
