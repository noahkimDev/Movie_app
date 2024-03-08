// LeftMenu.js
import React from "react";
import { Menu } from "antd";

function LeftMenu(props) {
  const menuItems = [
    {
      key: "mail",
      label: <a href="/">Home</a>,
    },
    {
      key: "favorite",
      label: <a href="/favorite">Favorite</a>,
    },
  ];

  return <Menu mode={props.mode} items={menuItems} />;
}

export default LeftMenu;
