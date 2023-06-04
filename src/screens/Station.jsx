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
import { Modal } from "antd";
import { message } from "antd";
import { useContext } from "react";
import { DataCtx } from "../Data/DataCtx";

export default function Station() {
  const [station, setStation] = useState([]);
  const { profile } = useContext(DataCtx);
  const [first, setFirts] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    axios.delete(url + "/station/" + selectedId).then(() => {
      console.log("deleted");
      message.success("Station deleted successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      // refresh page
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
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
      <Modal
        title="Delete Station"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />
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
                {profile.role == 2 ? (
                  <>
                    <p
                      className="edit-p"
                      onClick={() => {
                        navigate("/edit_station/" + item.id);
                      }}
                    >
                      {" "}
                      <EditOutlined /> Edit Station{" "}
                    </p>
                    <p
                      className="delete-p"
                      onClick={() => {
                        showModal();
                        setSelectedId(item.id);
                      }}
                    >
                      {" "}
                      <DeleteOutlined /> Delete Station{" "}
                    </p>
                  </>
                ) : null}
              </div>
            );
          })}

          {profile.role == 2 ? (
            <div
              className="plus-button"
              onClick={() => {
                navigate("/add_station");
              }}
            >
              <p className="plus-text">+</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
