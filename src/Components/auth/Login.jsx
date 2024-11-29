import React, { useState } from "react";
import { loginUser } from "../utils/ApiFunctions"; // Assuming this is an API function that returns the token
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider"; // Import the Auth context

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const auth = useAuth(); // Get authentication methods from context
  const location = useLocation();
  const redirectUrl = location.state?.path || "/"; // Redirect user to the previous page if available

  // Handle form input changes
  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true while waiting for the response
    const success = await loginUser(login); // Call API function to log in
    setLoading(false); // Reset loading after the response

    if (success && success.token) {
      const token = success.token;
      auth.handleLogin(token); // Store user info in context and local storage
      navigate(redirectUrl, { replace: true }); // Redirect to the target page
    } else {
      setErrorMessage("Invalid email or password. Please try again.");
    }

    // Clear error message after 4 seconds
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  return (
    <section className="container col-6 mt-5 mb-5">
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email
          </label>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              value={login.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            Password
          </label>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              value={login.password}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-hotel" style={{ marginRight: "10px" }} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <span style={{ marginLeft: "10px" }}>
            Don't have an account yet? <Link to={"/register"}>Register</Link>
          </span>
        </div>
      </form>
    </section>
  );
};

export default Login;
