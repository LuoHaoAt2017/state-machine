import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

function Header() {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home">
        <Link to="/home">Home</Link>
      </Menu.Item>
      <Menu.Item key="todos">
        <Link to="/todos">TodoMVC</Link>
      </Menu.Item>
      <Menu.Item key="counter">
        <Link to="/counter">Counter</Link>
      </Menu.Item>
    </Menu>
  );
}

export default Header;
