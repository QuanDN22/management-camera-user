import React, { useState } from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Typography, theme } from "antd";
import SearchPage from "../page/search/SearchPage";
const { Header, Sider, Content } = Layout;
const MyLayout = () => {
  const navigate = useNavigate();
  const [header, setHeader] = useState("Camera Management");
  const accessToken = useSelector((state) => state.auths.accessToken);
  const role = useSelector((state) => state.auths.role);
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  if (!accessToken) {
    return <Navigate
      to="/auth/login"
      replace
      state={{ prevPath: location.pathname }}
    />
  } else {
    if (role === "admin") {
      return (
        <Layout hasSider>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
            }}
            trigger={null}
            collapsible
            collapsed={collapsed}
            breakpoint="lg"
          >
            <div className="demo-logo-vertical">
              <img src="/ttlab-logo-white.svg" alt="logo" />
            </div>
            <Menu
              style={{ borderRadius: "8px" }}
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
            >
              <Menu.Item
                key={1}
                icon={<VideoCameraOutlined />}
                onClick={() => {
                  navigate("/cameras");
                  setHeader("Camera Management");
                }}
              >
                Cameras
              </Menu.Item>
              <Menu.Item
                key={2}
                icon={<UserOutlined />}
                onClick={() => {
                  navigate("/users");
                  setHeader("User management");
                }}
              >
                Users
              </Menu.Item>
              <Menu.Item
                key={3}
                icon={<UploadOutlined />}
                onClick={() => {
                  navigate("/search");
                  setHeader("Search");
                }}
              >
                Search
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout
            style={{
              marginLeft: 200,
            }}
          >
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography.Title
                  level={3}
                  style={{ margin: "0px 0px 0px 16px", alignContent: "center" }}
                >
                  {header}
                </Typography.Title>
                <div>
                  <Button
                    type="text"
                    icon={<BellOutlined />}
                    style={{
                      fontSize: "16px",
                      width: 64,
                      height: 64,
                    }}
                  />
                  <Button
                    type="text"
                    icon={<UserOutlined />}
                    style={{
                      fontSize: "16px",
                      width: 64,
                      height: 64,
                    }}
                  />
                </div>
              </div>
            </Header>
            <Content
              style={{
                margin: "24px 16px 0",
                overflow: "initial",
              }}
            >
              <div
                style={{
                  padding: 24,
                  textAlign: "center",
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                <Outlet />
              </div>
            </Content>
          </Layout>
        </Layout>
      )
    } else {
      return (
        <Navigate to="/u" replace state={{ prevPath: location.pathname }} />
      );
    }
  }
};
export default MyLayout;
