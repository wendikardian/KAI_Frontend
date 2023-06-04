/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { url } from "../../GlobalData";
import Navbar from "../component/Navbar";
import { Button } from "antd";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function addSchedule() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [train, setTrain] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState([]);
  const [date, setDate] = useState("");
  const submit = () => {
    const data = {
      datetime: date,
      route_id: id,
      train_id: selectedTrain,
    };
    console.log(data);
    axios.post(url + "/add_schedule", data).then(() => {
      message.success("Schedule added successfully");
      setTimeout(() => {
        navigate("/schedule");
      }, 1000);
    });
  };
  useEffect(() => {
    axios
      .get(url + "/route/" + id)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(url + "/train")
      .then((response) => {
        console.log(response.data);
        setTrain(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(selectedTrain);
  }, [selectedTrain]);

  useEffect(() => {
    console.log(date);
  }, [date])
  return (
    <div>
      <Navbar />
      <div className="form-add-station">
        <h1 style={{ marginTop: 30, marginBottom: 40 }}>Add Schedule</h1>
        <div className="container-form">
          <div className="input-con">
            <label htmlFor="" className="label-form">
              Station Source :{" "}
            </label>
            <input
              className="input-text"
              type="text"
              value={data.departure_station_name}
              disabled
            />
          </div>
          <div className="input-con">
            <label htmlFor="" className="label-form">
              Station Destination :{" "}
            </label>
            <input
              className="input-text"
              type="text"
              value={data.arrival_station_name}
              disabled
            />
          </div>
          <div className="input-con">
            <label htmlFor="" className="label-form">
              Date :{" "}
            </label>
            <input
              className="input-text"
              type="datetime-local"
              onChange={(event) => {
                setDate(parseInt(moment(event.target.value).unix()));
              }}
            />
          </div>
          <div className="input-con">
            <label htmlFor="" className="label-form">
              Arrival Station :
            </label>
            <select
              className="input-text"
              onChange={(event) => setSelectedTrain(event.target.value)}
            >
              <option value="">Select a train</option>
              {train.map((item) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input-con">
            <Button
              className="button-form"
              type="primary"
              onClick={submit}
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
