/* eslint-disable no-unused-vars */
import React from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log(username);
    console.log(password);
  }, [username, password]);

  const submit = () => {
    console.log(username)
    console.log(password)
    navigate('/')
 }
  return (
    <div className="login-container">
      <div className="welcome-login">
        <h1>Welcome to KAI Indonesia</h1>
      </div>
      <div>
        {/* Create div with form */}
        <div className="form-container">
          <h2>Please insert your data !</h2>
          <form action="">
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
            <button type="button" className="login" onClick={submit} >Login</button>
            <p>
              {" "}
              Doesnt have an account ?{" "}
              <Link to="/register"> Register here </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
