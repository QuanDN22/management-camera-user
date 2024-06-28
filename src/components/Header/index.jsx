import { BellOutlined, UserOutlined } from "@ant-design/icons";
import "./index.css";

// eslint-disable-next-line react/prop-types
export default function Header({ title }) {
  return (
    <div className="body-header">
      <h1 className="page-title">{title}</h1>
      <div className="user-action">
        <BellOutlined className="user-action-icon" />
        <UserOutlined className="user-action-icon" />
      </div>
    </div>
  );
}
