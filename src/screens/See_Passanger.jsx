/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../component/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../GlobalData";
import { useParams } from "react-router-dom";

export default function See_Passanger() {
  const [passanger, setPassanger] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios.get(url + "/passanger/" + id).then((response) => {
      console.log(response.data);
      setPassanger(response.data);
    });
  }, []);
  return (
    <div>
      <Navbar />
      <h1 className="header-style">Passanger Schedule no {id}</h1>
      <div className="route-table">
        <table>
          <tr>
            <th>Code ID</th>
            <th>Passanger Name</th>
            <th>No Seat</th>
          </tr>
          {passanger.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.name_passanger}</td>
                <td>{item.seat_id}</td>

              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}
