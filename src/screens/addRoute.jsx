/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line no-unused-vars
import React from "react";
import Navbar from "../component/Navbar";
import { Button } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../GlobalData";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export default function addRoute() {
  const [station, setStation] = useState([]);
  const [first, setFirts] = useState(false);
  const [departure, setDeparture] = useState(1);
  const [arrival, setArrival] = useState(1);
  const [time, setTime] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(url + "/station")
      .then((response) => {
        if (first == false) {
          console.log(response.data);
          setStation(response.data);
          setFirts(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [station]);

  useEffect(() => {
    console.log(departure);
  }, [departure]);

  useEffect(() => {
    console.log(arrival);
  }, [arrival]);

  const saveData = () => {
    const data = {
      departure: departure,
      arrival: arrival,
      distance: time,
    };
    if (departure === arrival) {
      message.error("Departure and Arrival station cannot be the same");
    } else {
      axios
        .post(url + "/add_route", data)
        .then((response) => {
          console.log(response.data);
          message.success("Route added successfully");
          setTimeout(() => {
            navigate("/route_train");
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div>
      <Navbar />
      <div className="form-add-station">
        <h1 style={{ marginTop: 30, marginBottom: 40 }}>Add Route</h1>
        <div className="container-form">
          <div className="input-con">
            <label htmlFor="" className="label-form">
              Departure Station :{" "}
            </label>
            {/* Create select dropdown based on state list station */}
            <select
              className="input-text"
              onChange={(event) => setDeparture(event.target.value)}
            >
              <option value="">Select an option</option>
              {station.map((item) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input-con">
            <label htmlFor="" className="label-form">
              Arrival Station :
            </label>
            <select
              className="input-text"
              onChange={(event) => setArrival(event.target.value)}
            >
              <option value="">Select an option</option>
              {station.map((item) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input-con">
            <label htmlFor="" className="label-form">
              Est Distances :{" "}
            </label>
            <input
              className="input-text"
              type="text"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
          </div>
          <div className="input-con">
            <Button
              className="button-form"
              type="primary"
              onClick={saveData}
              style={{ width: 100, height: 40, marginTop: 20 }}
            >
              Save Route !
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
