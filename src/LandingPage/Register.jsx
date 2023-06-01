import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const submit = () => {
    console.log(username);
    console.log(password);
    console.log(passwordRepeat);
    console.log(email);
    navigate("/login");
  };

  return (
    <div className="login-container">
      <div className="welcome-login">
        <h1>Register Your account</h1>
      </div>
      <div>
        {/* Create div with form */}
        <div className="form-container">
          <h2>Register Account !</h2>
          <form action="">
            <div>
              <label htmlFor="">Email</label>
              <input
                type="text"
                className="input-data-login"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="">Username</label>
              <input
                type="text"
                className="input-data-login"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="">Password</label>
              <input
                type="password"
                className="input-data-login"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="">Repeat Password</label>
              <input
                type="password"
                className="input-data-login"
                onChange={(event) => {
                  setPasswordRepeat(event.target.value);
                }}
              />
            </div>
            <button type="button" className="login" onClick={submit}>
              Register
            </button>
            <p>
              {" "}
              Already have an account ? <Link to="/login">
                {" "}
                Login here!!{" "}
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
