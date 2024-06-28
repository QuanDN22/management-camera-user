import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import useDocumentTitle from "../../utils/setTitle";
import menu from "./data";
import TtlabLogo from "../../assets/svg/ttlab - logo ngang.svg";
import "./index.css";

// eslint-disable-next-line react/prop-types
const SiderBar = ({ open, setOpen }) => {
  const [activeId, setActiveId] = useState(0);
  const headerText = menu[activeId].description;

  useDocumentTitle(headerText);

  useEffect(() => {
    const url = window.location.pathname;
    if (url === "/users") setActiveId(1);
  }, []);

  const handleClick = (id) => {
    setActiveId(id);
  };

  const toggleSiderBar = (status) => {
    setOpen(status);
  };

  const listItem = menu.map((element) => (
    <li key={element.id}>
      <Link to={element.link} style={{ textDecoration: "none" }}>
        <div
          className={`${open ? "siderbar-item" : "close-siderbar-item"} ${
            element.id === activeId ? "active" : ""
          }`}
          onClick={() => handleClick(element.id)}
        >
          <div>
            <img
              src={element.icon}
              className={`${
                open ? "siderbar-item-icon" : "close-siderbar-item-icon"
              }`}
              alt=""
            />
            {open && (
              <span className="siderbar-item-text">{element.title}</span>
            )}
          </div>
        </div>
      </Link>
    </li>
  ));

  return open ? (
    <div className="siderbar">
      <div className="siderbar-header">
        <Link to="/products">
          <div className="header-logo" onClick={() => handleClick(0)}>
            <img src={TtlabLogo} alt="TT Lab Logo" />
          </div>
        </Link>
        <div className="close-button">
          <MenuFoldOutlined
            style={{ color: "#606060", fontSize: "20px" }}
            onClick={() => toggleSiderBar(false)}
          />
        </div>
      </div>
      <div className="header-text">
        <p>{headerText}</p>
      </div>
      <ul>{listItem}</ul>
    </div>
  ) : (
    <div className="close-siderbar">
      <div className="close-siderbar-header">
        <div className="open-button">
          <MenuUnfoldOutlined
            style={{ color: "#606060", fontSize: "20px" }}
            onClick={() => toggleSiderBar(true)}
          />
        </div>
      </div>
      <div className="header-text">
        <p></p>
      </div>
      <ul>{listItem}</ul>
    </div>
  );
};

export default SiderBar;
