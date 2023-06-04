/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../component/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import "./station.css";
import { url } from "../../GlobalData";
import { useNavigate } from "react-router-dom";
import {
  EnvironmentFilled,
  CarOutlined,
  HomeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export default function Station() {
  const [station, setStation] = useState([]);
  const [first, setFirts] = useState(false);
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
  return (
    <div>
      <Navbar />
      <div className="station-container">
        <h1>Station</h1>
        <div className="station-data">
          {station.map((item, index) => {
            return (
              <div className="card-station">
                <h3>
                  {" "}
                  <CarOutlined /> {item.name}
                </h3>
                <p>
                  {" "}
                  <EnvironmentFilled /> {item.city}
                </p>
                <p>
                  {" "}
                  <HomeOutlined /> {item.address}
                </p>
                <p className="edit-p" onClick={
                  () => {
                    navigate("/edit_station/" + item.id)
                  }
                } > <EditOutlined /> Edit Station </p>
                <p className="delete-p" > <DeleteOutlined /> Delete Station </p>
              </div>
            );
          })}

          <div
            className="plus-button"
            onClick={() => {
              navigate("/add_station");
            }}
          >
            <p className="plus-text">+</p>
          </div>
        </div>
      </div>
    </div>
  );
}
