/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../component/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../../GlobalData";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import moment from "moment";
import { useContext } from "react";
import { DataCtx } from "../Data/DataCtx";

export default function Schedule() {
  const navigation = useNavigate();
  const { profile, setProfile } = useContext(DataCtx);
  const [schedule, setSchedule] = useState([]);
  useEffect(() => {
    axios.get(url + "/schedule").then((response) => {
      console.log(response.data);
      setSchedule(response.data);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="header-style">Schedule</h1>
      <div className="route-table">
        <table>
          <tr>
            {/* <th>Route ID</th> */}
            <th>Train Name</th>
            <th>Date</th>
            <th>Departure Station</th>
            <th>Departure City</th>
            <th>Arrival Station</th>
            <th>Arrival City</th>

            <th>Action</th>
          </tr>
          {schedule.map((item) => {
            // console.log(item.datetime)
            var newDate = moment(item.datetime * 1000).format(
              "MM/DD/YYYY hh:MM"
            );
            return (
              <tr>
                <td>{item.name}</td>
                {/* create convert */}
                <td>{newDate}</td>
                <td>{item.departure_station_name}</td>
                <td>{item.departure_station_city}</td>
                <td>{item.arrival_station_name}</td>
                <td>{item.arrival_station_city}</td>
                <td>
                  {profile.role == 1 ? (
                    <Button
                      onClick={() => {
                        navigation("/book_ticket/" + item.id);
                      }}
                    >
                      Book Ticket
                    </Button>
                  ) : (
                    <Button
                    onClick={() => {
                      navigation("/passanger/" + item.id);
                    }}
                    >See passenger</Button>
                  )}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}
