/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../component/Navbar";
import axios from "axios";
import { Button } from "antd";
import { url } from "../../GlobalData";
import { useContext, useEffect, useState } from "react";
import { DataCtx } from "../Data/DataCtx";
import Cookies from "js-cookie";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function MyTicket() {
  const navigation = useNavigate();
  const { profile } = useContext(DataCtx);
  const [schedule, setSchedule] = useState([]);
  const [first, setFirst] = useState(false);
  const [ticket, setTicket] = useState([]);
  // useEffect(() => {
  //   if (profile.id > 0 && first == false) {

  //   }
  // }, []);
  const fetchTicket = async () => {
    await axios
      .get(url + "/ticket/" + Cookies.get("user_id"))
      .then((response) => {
        setTicket(response.data);
        console.log(response.data);
        setFirst(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios.get(url + "/schedule").then((response) => {
      console.log(response.data);
      setSchedule(response.data);
    });
    console.log(Cookies.get("user_id"));
    setTimeout(1000);
    fetchTicket();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="ticket-container">
        <h1 style={{ marginBottom: 80 }}>My Ticket</h1>
        <div className="ticket-item">
          {ticket.map((item) => {
            const filteredSchedule = schedule.filter((schedule) =>
              schedule.id == item.schedule_id ? schedule : null
            );
            console.log(filteredSchedule);
            return (
              <div
                className={
                  item.payment_status == 1
                    ? "ticket-card danger-ticket"
                    : "ticket-card success-ticket"
                }
              >
                {/* <div className="ticket-card success-ticket"> */}
                <p>
                  {" "}
                  <b> Code Ticket </b> : {item.id}
                </p>
                <p>
                  {" "}
                  <b> Train Name </b> : {filteredSchedule[0].name}
                </p>
                <p>
                  <b>Atas Nama </b> : {item.name_passanger}
                </p>
                <p>
                  <b> Departure Station </b> :{" "}
                  {filteredSchedule[0].departure_station_name}
                </p>
                <p>
                  <b>Arrival Station </b> :{" "}
                  {filteredSchedule[0].arrival_station_name}
                </p>
                <p>
                  <b> Date </b> :{" "}
                  {moment(filteredSchedule[0].datetime * 1000).format(
                    "MM/DD/YYYY hh:MM"
                  )}
                </p>
                <p>
                  <b> Payment Status </b> :
                  <br />
                  <br />
                  {item.payment_status == 1 ? (
                    <span className="not-paid">Not Finish</span>
                  ) : (
                    <span className="paid">Finish</span>
                  )}
                </p>

                <br />
                <p>
                  <b>Tiket : </b>
                  <br />
                  <br />
                  {/* <br /> */}
                  {item.status == 1 ? (
                    <span className="not-paid">Not Used</span>
                  ) : (
                    <span className="not-paid">Used</span>
                  )}
                </p>
                <br />
                {item.payment_status == 1 ? <Button
                onClick={() => {
                  navigation("/payment/" + item.id);
                }}
                >Paid</Button> : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
