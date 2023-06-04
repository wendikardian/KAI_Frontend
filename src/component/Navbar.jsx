/* eslint-disable no-unused-vars */
// import "antd/dist/antd.css";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { DingdingOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import React, { useState, useContext, useEffect } from "react";
// import { DataCtx } from "./../Data/Data.js";
import { useNavigate } from "react-router";
import { Button, Modal } from "antd";
import { message } from "antd";
// import { useEffect } from "react";
// import logo from "./logo2.png";

const { Header, Content, Footer } = Layout;

const Navbar = () => {
  //   const { isLogin, setIsLogin, userDataList } = useContext(DataCtx);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [filteredUser, setFilteredUser] = useState([]);
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const logout = () => {
    setOpen(false);
    setConfirmLoading(false);
    // setIsLogin(false);
    // Cookies.remove('user')
    Cookies.remove("username");
    // message.error("Logout Success");
    // Cookies.remove('token')
    // navigate("/");
  };

  useEffect(() => {
    if(Cookies.get('username') === undefined){
      navigate('/')
    }
  }, [Cookies.get('username')])

  return (
    <>
      <Layout>
        <Modal
          title="Log out"
          open={open}
          onOk={logout}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>Are you sure you wanna log out ? </p>
        </Modal>
        <Header className="header-all" style={{ backgroundColor: "#6C6C6C" }}>
          <div className="logo">
            <img
              src="https://png.pngtree.com/png-clipart/20230126/original/pngtree-train-on-a-white-background-png-image_8930665.png"
              style={{ width: 50, marginRight: 20, borderRadius: 90 }}
            />
          </div>
          <div className="logo title">KAI </div>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ float: "right", backgroundColor: "#6C6C6C" }}
          >
            <p className="navbar-item">
              <Link to="/schedule">Schedule</Link>{" "}
            </p>
            <p className="navbar-item">
              <Link to="/find_ticket">Find Ticket</Link>
            </p>
            <p className="navbar-item">
              <Link to="/my_ticket">My Ticket</Link>
            </p>
            <p className="navbar-item">
              <Link to="/station">Station</Link>
            </p>
            <img
              style={{ width: 50, height: 50, borderRadius: 100 }}
              src={Cookies.get("image")}
            />
            <h5
              style={{
                marginTop: 10,
                marginLeft: 30,
                marginRight: 40,
                color: "white",
              }}
            >
              {Cookies.get("name")}
            </h5>
            <Menu.Item style={{ width: "70px" }} onClick={showModal}>
              <p
                style={{
                  backgroundColor: "white",
                  padding: 2,
                  height: 10,
                }}
              >
                {" "}
                Logout{" "}
              </p>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
    </>
  );
};

export default Navbar;
