/* eslint-disable no-unused-vars */
import React from "react";
import { useContext, useState, useEffect } from "react";
import { DataCtx } from "../Data/DataCtx";
import Navbar from "../component/Navbar";

export default function Profile() {
  const { profile, setProfile } = useContext(DataCtx);
  useEffect(() => {
    console.log(profile);
  }, [profile]);
  return (
    <div>
      <Navbar />
      <div className="profile-page">
        <h1>Profile Page</h1>
        <div className="profile-detail">
            <h3>Username : {profile.username} </h3>
            <h3>Email : {profile.email} </h3>
            <h3>Roles :
                {
                    profile.role == 1 ? "User" : "Admin"
                }
                 </h3>
        </div>
      </div>
    </div>
  );
}
