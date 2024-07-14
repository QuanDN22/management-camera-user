import React, { useState } from 'react';
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import "./index.css";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Typography, theme } from 'antd';
import Icon from '@ant-design/icons/lib/components/Icon';
const { Header, Sider, Content } = Layout;
const MyLayout = () => {
  const navigate = useNavigate();
  const [header, setHeader] = useState("Quản lý camera");
  const isAuthenticate = useSelector((state) => state.auths.isAuthenticate);
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return isAuthenticate ? (
    <Layout style={{height: '100vh'}}>
      <Sider 
          style={{borderRadius: '8px'}}

      trigger={null} collapsible collapsed={collapsed} breakpoint="lg" >
      
        <div className="demo-logo-vertical" />
        <Menu
          style={{borderRadius: '8px'}}

          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key={1} icon={<VideoCameraOutlined />} onClick={()=>{
            navigate("/cameras");
            setHeader("Quản lý camera");
          }}>
            Quản lý camera
          </Menu.Item>
          <Menu.Item key={2} icon={<UserOutlined />} onClick={()=>{
            navigate("/users");
            setHeader("Quản lý người dùng");
          }}>
            Quản lý người dùng
          </Menu.Item>
          <Menu.Item key={3} icon={<UploadOutlined />} onClick={()=>{
            navigate("/search");
            setHeader("Tìm kiếm");
          }}>
            Tìm kiếm
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
            <Typography.Title level={3} style={{ margin: 0, alignContent: "center"}}>{header}</Typography.Title>
            <div>
              <Button
                type="text"
                icon={<BellOutlined />}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
              <Button
                type="text"
                icon={<UserOutlined />}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            height: "hw",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  ) : (
    <Navigate
      to="/auth/login"
      replace
      state={{ prevPath: location.pathname }}
    />
  );
};
export default MyLayout;
