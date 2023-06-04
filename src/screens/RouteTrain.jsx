/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../GlobalData";
import { Button } from "antd";
import { useContext } from "react";
import { DataCtx } from "../Data/DataCtx";

export default function RouteTrain() {
  const navigate = useNavigate();
  const [route, setRoute] = useState([]);
  const { profile, setProfile } = useContext(DataCtx);
  useEffect(() => {
    axios.get(url + "/route").then((response) => {
      console.log(response.data);
      setRoute(response.data);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="header-style">Route</h1>
      <div className="route-table">
        <table>
          <tr>
            <th>Route ID</th>
            <th>Departure Station</th>
            <th>Departure City</th>
            <th>Arrival Station</th>
            <th>Arrival City</th>
            <th>Est. Distance</th>
            <th>Action</th>
          </tr>
          {route.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.departure_station_name}</td>
                <td>{item.departure_station_city}</td>
                <td>{item.arrival_station_name}</td>
                <td>{item.arrival_station_city}</td>
                <td>{item.est_distance}</td>
                <td>
                  {profile.role == 1 ? (
                    <Button>Find Schedule</Button>
                  ) : (
                    <Button
                      onClick={() => {
                        navigate("/add_schedule/" + item.id);
                      }}
                    >
                      Add Schedule
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      {profile.role == 2 ? (
        <div
          className="plus-button"
          onClick={() => {
            navigate("/add_route");
          }}
        >
          <p className="plus-text">+</p>
        </div>
      ) : null}
    </div>
  );
}
