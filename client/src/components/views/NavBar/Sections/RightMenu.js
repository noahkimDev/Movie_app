// RightMenu.js
import React from "react";
import { Menu } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function RightMenu(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        navigate("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  const menuItems =
    user.userData && !user.userData.isAuth
      ? [
          {
            key: "mail",
            label: <a href="/login">Signin</a>,
          },
          {
            key: "app",
            label: <a href="/register">Signup</a>,
          },
        ]
      : [
          {
            key: "logout",
            label: <a onClick={logoutHandler}>Logout</a>,
          },
        ];

  return <Menu mode={props.mode} items={menuItems} />;
}

export default RightMenu;
