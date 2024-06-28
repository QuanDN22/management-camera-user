import { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateAuthenticate } from "../../slice/authsSlice";
import "./index.css";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const prevPath = location.state ? location.state.prevPath : "products";
  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    const user = { ...values };
    (async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:8080/auth/login",
          user,
          { withCredentials: true }
        );
        if (data) {
          const { access_token } = data;
          localStorage.setItem("auth_token", access_token);
          dispatch(updateAuthenticate(true));
          navigate(`${prevPath}`);
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    })();
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
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
            <label htmlFor="email" className="input-group-label">
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Nhập email"
            />
            <ErrorMessage name="email" component="div" className="error" />
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
  );
};

export default LoginForm;
