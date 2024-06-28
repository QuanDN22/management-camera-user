import { useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import SiderBar from "../components/SiderBar";
import "./index.css";

function Layout() {
  const [open, setOpen] = useState(true);
  const isAuthenticate = useSelector((state) => state.auths.isAuthenticate);
  const location = useLocation();
  return isAuthenticate ? (
    <div className="wrapper">
      <SiderBar open={open} setOpen={setOpen} />
      <div id="detail" className={open ? "narrow" : "wide"}>
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate
      to="/auth/login"
      replace
      state={{ prevPath: location.pathname }}
    />
  );
}

export default Layout;
