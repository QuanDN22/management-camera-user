import { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateAuthenticate } from "../../slice/authsSlice";
import "./index.css";
import callAPI from "../../utils/callApi";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const prevPath = location.state ? location.state.prevPath : "/cameras";
  const accessToken = useSelector(state => state.auths.accessToken);
  const role = useSelector(state => state.auths.role);
  const initialValues = {
    username: "",
    password: "",
    rememberMe: false,
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    const user = { ...values };
    (async () => {
      try {
        const { data } = await callAPI.post(
          "/auth/login",
          user,
          { withCredentials: true }
        );
        console.log(data);
        if (data) {
          const { access_token, role } = data;
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("role", role);
          console.log(role);
          dispatch(updateAuthenticate({accessToken: access_token, role: role}));
          if(role === "admin"){
            navigate('/');
          }else{
            navigate('/u');
          }
        }
      } catch (error) {
        console.error(error);
        alert(error.response.data);
      }
    })();
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  if(!accessToken){
    return (
      <div
        style={{
          width: "100vw",
          paddingTop: "64px",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="login-container">
          <img src="/ttlab-logo.svg"></img>
          <h2>Đăng nhập</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div className="input-group">
                <label htmlFor="username" className="input-group-label">
                  Username
                </label>
                <Field
                  type="username"
                  id="email"
                  name="username"
                  placeholder="Nhập username"
                />
                <ErrorMessage name="username" component="div" className="error" />
              </div>
              <div className="input-group">
                <label htmlFor="password" className="input-group-label">
                  Password
                </label>
                <div className="password-input-wrapper">
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                  <div
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="toggle-password"
                  >
                    {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  </div>
                </div>
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              <div className="input-group remember-me">
                <div>
                  <Field type="checkbox" id="rememberMe" name="rememberMe" />
                  <label htmlFor="rememberMe">Ghi nhớ đăng nhập</label>
                </div>
                <div className="forgot-password">
                  <a href="/forgot-password">Quên mật khẩu?</a>
                </div>
              </div>
              <div className="login-btn">
                <button type="submit">Đăng nhập</button>
              </div>
              <div className="not-have-account">
                Bạn chưa có tài khoản? &nbsp;
                <a href="/auth/signup">Đăng ký</a>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    );
  }else{
    if(role === "admin"){
      navigate("/")
    }else{
      navigate("/u")
    }
  }
};

export default LoginForm;
