/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { Button } from "antd";
import "./station.css";
import axios from "axios";
import { url } from "../../GlobalData";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export default function addStation() {
  const [station, setStation] = useState("");
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
    console.log(station);
    console.log(city);
    console.log(address);
  }, [station, city, address]);

  const saveData = () => {
    const data = {
      name: station,
      city: city,
      address: address,
    };
    axios.post(url + "/add_station", data).then(() => {
      message.success("Station added successfully");
      navigate("/station");
    });
  };

  return (
    <div>
      <Navbar />
      <div className="form-add-station">
        <h1 style={{ marginTop: 30, marginBottom: 40 }}>Add Station</h1>
        <div className="container-form">
          <div className="input-con">
            <label htmlFor="" className="label-form">
              Station Name :{" "}
            </label>
            <input
              className="input-text"
              type="text"
              value={station}
              onChange={(e) => {
                setStation(e.target.value);
              }}
            />
          </div>
          <div className="input-con">
            <label htmlFor="" className="label-form">
              City :{" "}
            </label>
            <input
              className="input-text"
              type="text"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </div>
          <div className="input-con">
            <label htmlFor="" className="label-form">
              Address :{" "}
            </label>
            <input
              className="input-text"
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>
          <div className="input-con">
            <Button
              className="button-form"
              type="primary"
              onClick={saveData}
              style={{ width: 100, height: 40, marginTop: 20 }}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
