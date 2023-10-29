import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { login, error } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // login(email, password).then(() => navigate("/"));
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
      <div className="field is-grouped is-grouped-centered columns"
      style={{marginTop:"3rem"}}>
        {/* change div to alert */}
        {/* {error && <div>{error}</div>}/ */}
        <form onSubmit={handleSubmit}>
          <h2 className="title">Log in</h2>
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
              Log in
            </button>
          </div>
          <div className="field">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </>
  );
}
