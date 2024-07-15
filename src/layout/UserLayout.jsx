import React from "react";
import { Button, Dropdown, Layout, Menu, Typography, theme } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { updateAuthenticate } from "../slice/authsSlice";
const { Header, Content } = Layout;
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
function UserLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = useSelector((state) => state.auths.accessToken);
  const role = useSelector((state) => state.auths.role);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleMenuClick = (e) => {
    if (e.key === "1") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("role");
      dispatch(updateAuthenticate({ accessToken: undefined, role: undefined }));
      navigate("/auth/login");
    }
  };
  const menuProps = {
    items: [{ key: "1", label: "Logout" }],
    onClick: handleMenuClick,
  };
  if (!accessToken) {
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{ prevPath: location.pathname }}
      />
    );
  } else {
    if (role === "admin") {
      return <Navigate to="/" replace />;
    } else {
      return (
        <Layout>
          <Header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
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
              <img src="/ttlab-logo-white.svg" />
              <Typography.Title
                level={3}
                style={{ margin: "0px 0px 0px 16px", alignContent: "center" }}
              ></Typography.Title>
              <div>
                <Button
                  type="default"
                  icon={<BellOutlined />}
                  style={{
                    fontSize: "16px",
                    width: 48,
                    height: 48,
                  }}
                />
                <Dropdown menu={menuProps} trigger={["click"]}>
                  <Button
                    type="default"
                    icon={<UserOutlined />}
                    style={{
                      fontSize: "16px",
                      width: 48,
                      height: 48,
                    }}
                  />
                </Dropdown>
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
      );
    }
  }  
}

export default UserLayout;
