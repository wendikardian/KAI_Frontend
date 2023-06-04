/* eslint-disable no-unused-vars */
import React from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { url } from "../../GlobalData";
import { message } from "antd";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // check cookie if username exist redirect
    if (Cookies.get("username")) {
      navigate("/schedule");
    }
  }, []);

  const submit = () => {
    const data = {
      username: username,
      password: password,
    };
    axios
      .post(url + "/login", data)
      .then((response) => {
        console.log(response);
        // localStorage.setItem("token", response.data.token);
        message.success("Login Success");
        navigate("/schedule");
        Cookies.set("username", username, { expires: 1 });
        // setTimeout(() => {
        // }, 1000)

        // refresh windows
        window.location.reload();
        // alert("success");
      })
      .catch((error) => {
        console.log(error);
        alert("error");
      });
  };
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
            <button type="button" className="login" onClick={submit}>
              Login
            </button>
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
