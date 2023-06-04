/* eslint-disable react/prop-types */
// Create a new use Context to get Id
import { useState, createContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { url } from "../../GlobalData";
export const DataCtx = createContext();
// Create conte

const DataProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const getProfile = async () => {
      const username = Cookies.get("username");
      axios
        .get(`${url}/user/${username}`)
        .then((res) => {
          console.log(res.data);
          setProfile(res.data);
            Cookies.set('user_id', res.data.id)
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getProfile();
  }, []);

  const context = { profile, setProfile, isLogin, setIsLogin };

  return <DataCtx.Provider value={context}>{props.children}</DataCtx.Provider>;
};

export default DataProvider;
