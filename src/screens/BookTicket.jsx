/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../component/Navbar";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { url } from "../../GlobalData";
import moment from "moment";
import { useContext } from "react";
import { DataCtx } from "../Data/DataCtx";

export default function BookTicket() {
  const { id } = useParams();
  console.log(id);
  const { profile } = useContext(DataCtx);
  const [schedule, setSchedule] = useState([]);
  const [seat, setSeat] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(1);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(1);
  const [passanger, setPassanger] = useState([]);
  useEffect(() => {
    axios.get(url + "/passanger/" + id).then((response) => {
      console.log(response.data);
      setPassanger(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(url + "/schedule/" + id).then((response) => {
      console.log(response.data);
      setSchedule(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(url + "/seat").then((response) => {
      console.log(response.data);
      setSeat(response.data);
    });

    // setSeat(filteredSeats);
  }, []);

  useEffect(() => {
    console.log(price);
  }, [price]);

  const booking = () => {
    const data = {
      id: moment().unix(),
      status: 1,
      name: name,
      schedule_id: id,
      seat_id: selectedSeat,
      price: price,
      user_id: profile.id,
    };
    axios.post(url + "/booking", data).then((response) => {
      console.log(response.data);
      message.success("Ticket booked successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  };

  return (
    <div>
      <Navbar />
      <div className="form-add-station">
        <h1 style={{ marginTop: 30, marginBottom: 40 }}>Book Ticket</h1>
        <div className="container-form">
          <div className="input-con">
            <label htmlFor="" className="label-form">
              Station Source :{" "}
            </label>
            <input
              className="input-text"
              type="text"
              value={schedule.departure_station_name}
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
              value={schedule.arrival_station_name}
              disabled
            />
          </div>
          <div className="input-con">
            <label htmlFor="" className="label-form">
              Kereta :{" "}
            </label>
            <input
              className="input-text"
              type="text"
              value={schedule.name}
              disabled
            />
          </div>
          <div className="input-con">
            <label htmlFor="" className="label-form">
              Schedule :{" "}
            </label>
            <input
              className="input-text"
              type="text"
              value={moment(schedule.datetime * 1000).format(
                "MM/DD/YYYY hh:MM"
              )}
              disabled
            />
          </div>
          <div className="input-con">
            <label htmlFor="" className="label-form">
              Atas Nama :{" "}
            </label>
            <input
              className="input-text"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <select
            className="input-text"
            onChange={(event) => {
              setSelectedSeat(event.target.value);
              seat.map((item) => {
                if (item.id == event.target.value) {
                  setPrice(item.price);
                }
              });
            }}
          >
            <option value="">Select an option for your seat</option>
            {seat.map((item) => {
              const filtered = passanger.filter(
                (data) => data.seat_id == item.id
              );
              console.log(filtered);
              if (filtered.length == 0) {
                return (
                  <option value={item.id} key={item.id}>
                    {item.id}
                  </option>
                );
              }
            })}
          </select>
          <div className="input-con">
            <label htmlFor="" className="label-form">
              Price
            </label>
            <input
              disabled
              className="input-text"
              type="text"
              value={`$ ${price}`}
            />
          </div>
          <div className="input-con">
            <Button
              className="button-form"
              type="primary"
              style={{ width: 100, height: 40, marginTop: 20 }}
              onClick={booking}
            >
              Book
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
