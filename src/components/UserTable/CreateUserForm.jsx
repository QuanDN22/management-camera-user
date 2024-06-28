import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import callAPI from "../../utils/callApi";
import PropTypes from "prop-types";

export default function CreateUserForm(setIsOpen) {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    date_of_birth: Yup.date().required("Date of birth is required"),
    phone: Yup.string().required("Phone number is required"),
    avatar: Yup.string()
      .url("Invalid URL format")
      .required("Avatar URL is required"),
    password: Yup.string().required("Password is require").default("12345678"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await callAPI.post("/users", values);
      alert("Them thanh cong");
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setIsOpen(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="create-form">
      <h2>Tạo mới người dùng</h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
          date_of_birth: "",
          phone: "",
          avatar: "",
          password: "12345678",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Tên người dùng</label>
              <Field type="text" name="name" />
              <ErrorMessage
                name="name"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="text" name="password" />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="date_of_birth">Ngày sinh</label>
              <Field type="date" name="date_of_birth" />
              <ErrorMessage
                name="date_of_birth"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Số điện thoại</label>
              <Field type="tel" name="phone" />
              <ErrorMessage
                name="phone"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar">Avatar</label>
              <Field type="url" name="avatar" />
              <ErrorMessage
                name="avatar"
                component="div"
                className="error-message"
              />
            </div>

            <div className="modal-action">
              <button
                className="cancel-btn"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                Hủy
              </button>
              <button className="accept-btn" type="submit">
                Tạo mới
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

CreateUserForm.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};
