/* eslint-disable no-unused-vars */
// import "antd/dist/antd.css";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import Cookies from "js-cookie";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button, Modal } from "antd";
import { message } from "antd";
import { DataCtx } from "../Data/DataCtx";

const { Header, Content, Footer } = Layout;

const Navbar = () => {
  const { profile } = useContext(DataCtx);
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
    Cookies.remove("user_id");
    Cookies.remove("username");
    // message.error("Logout Success");
    // Cookies.remove('token')
    // navigate("/");
  };

  useEffect(() => {
    if (Cookies.get("username") === undefined) {
      navigate("/");
    }
  }, [Cookies.get("username")]);

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
              <Link to="/route_train">Route</Link>{" "}
            </p>
            <p className="navbar-item">
              <Link to="/schedule">Schedule</Link>{" "}
            </p>
            {profile.role === 1 ? (
              <p className="navbar-item">
                <Link to="/my_ticket">My Ticket</Link>
              </p>
            ) : null}
            <p className="navbar-item" style={{ marginRight: 100 }}>
              <Link to="/station">Station</Link>
            </p>
            <p className="navbar-item" style={{ marginLeft: 80 }}>
              <Link to="/profile">Profile</Link>
            </p>
            <img
              style={{ width: 50, height: 50, borderRadius: 100 }}
              src={
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
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
