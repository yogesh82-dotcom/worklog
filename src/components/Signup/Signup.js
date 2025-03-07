import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfrmPassword, setcfrmPassword] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (password !== cfrmPassword) {
      seterrorMessage("Password doesn't match");
      return;
    } else {
      seterrorMessage("");
      const response = await fetch(
        "https://worklog-server-s3y8.onrender.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, cfrmPassword }),
        }
      );
      const data = await response.json();
      console.log(data);
      navigate("/");
    }
  }

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="col-10 col-sm-8 col-md-7 col-lg-5 p-4 signup-container">
          <h3 className="text-left mb-4">Create an account!</h3>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="form-control"
                placeholder="Email Address"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="form-control"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                onChange={(e) => setcfrmPassword(e.target.value)}
                value={cfrmPassword}
                className="form-control"
                id="Password"
                placeholder="Confirm password"
              />
            </div>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <div className="text-center mt-3">
              <p>
                Have an account?{" "}
                <a href="/" className="text-primary">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
