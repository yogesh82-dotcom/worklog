import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [loginsuccess, setloginSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password) {
      seterrorMessage("Invalid credentials");
      setloginSuccess(false);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("https://worklog-1urf.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (response.ok) {
        if (result.userId) {
          localStorage.setItem("userId", result.userId);
        }
        seterrorMessage("");
        setloginSuccess(true);
        setTimeout(() => {
          navigate("/homepage");
        }, 3000);
      } else {
        if (email === " " && password === " ") {
          seterrorMessage("in");
        }
        seterrorMessage(result.message);
        setloginSuccess(false);
        setLoading(false);
      }
    } catch (error) {
      seterrorMessage("An error occurred. Please try again.");
      setloginSuccess(false);
      setLoading(false);
    }
  }

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="col-10 col-sm-8 col-md-7 col-lg-5 p-4  login-container">
          <h3 className="text-left mb-4">Welcome back!</h3>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="form-control"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="form-control"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="text-end mb-3">
              <a href="/forgot-password" className="text-primary no-underline">
                Forgot Password?
              </a>
            </div>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            <div className="d-grid">
              <button
                type="submit"
                className={`btn ${
                  loginsuccess ? "btn-success" : "btn-primary"
                } align-items-center`}
                disabled={loading}
              >
                {loginsuccess ? (
                  <>
                    Login Success{" "}
                    {loading && (
                      <div
                        className="spinner-border spinner-border-sm ms-2"
                        role="status"
                        aria-hidden="true"
                      ></div>
                    )}
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
            <div className="text-center mt-3">
              <p>
                Don't have an account?{" "}
                <a href="/signup" className="text-primary">
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
