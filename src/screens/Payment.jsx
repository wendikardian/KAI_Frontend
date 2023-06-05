/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../component/Navbar";
import { useParams } from "react-router-dom";
import QRCode from "qrcode.react";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { Button } from "antd";
import axios from "axios";
import { url } from "../../GlobalData";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  const randomData = uuidv4();
  const [noPay, setNoPay] = useState(0);
  const submitData = () => {
    const data = {
      id: id,
      no_transaction: noPay,
    };
    axios.put(`${url}/ticket`, data).then((res) => {
      message.success("Payment Success");
      setTimeout(() => {
      }, 1000);

      navigate("/my_ticket");
      // window.location.href = "/my_ticket";
    });
  };
  return (
    <div>
      <Navbar />
      <div className="payment-container">
        <h1>Please Scan this QR Code to Pay</h1>
        <QRCode value={randomData} />
        <br />
        <br />
        <div className="input-con">
          <label htmlFor="" className="label-form">
            Transaction Number :{" "}
          </label>
          <input
            className="input-text"
            type="text"
            value={noPay}
            onChange={(event) => setNoPay(event.target.value)}
          />
        </div>
        <br />
        <br />
        <Button onClick={submitData}>Submit</Button>
      </div>
    </div>
  );
}
