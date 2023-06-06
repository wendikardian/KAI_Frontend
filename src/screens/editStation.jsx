/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from "react";
import Navbar from "../component/Navbar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../GlobalData";
import "./station.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export default function editStation() {
  const { id } = useParams();
  const [station, setStation] = useState();
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(id);
    axios.get(url + "/station/" + id).then((response) => {
      console.log(response.data);
      setStation(response.data.name);
      setCity(response.data.city);
      setAddress(response.data.address);
    });
  }, [id]);

  const editData = () => {
    const data = {
      name: station,
      city: city,
      address: address,
    };
    axios.put(url + "/station/" + id, data).then(() => {
      console.log(data);
        message.success("Station edited successfully");
      navigate("/station");
    });
  };

  return (
    <div>
      <Navbar />
      <div className="form-add-station">
        <h1 style={{ marginTop: 30, marginBottom: 40 }}>Edit Station</h1>
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
              onClick={editData}
              style={{ width: 100, height: 40, marginTop: 20 }}
            >
              Edit Data !
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
