import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import callAPI from "../../utils/callApi";

// eslint-disable-next-line react/prop-types
export default function CreateProductForm(setIsOpen) {
  const validationSchema = Yup.object({
    camera_name: Yup.string().required("Name is required"),
    camera_ipv4: Yup.string().required("IP is required"),
    camera_status: Yup.string().required("Status is required"),
    camera_position: Yup.string().required("Position is required"),
  });

  const handleSubmit = async (values) => {
    try {
      await callAPI.post("/cameras", values);
      alert("Them thanh cong");
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div className="create-form">
      <h2>Tạo mới camera</h2>
      <Formik
        initialValues={{
          camera_name: "",
          camera_ipv4: "",
          camera_status: "",
          camera_position: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="camera_name">Name</label>
              <Field type="text" name="camera_name" />
              <ErrorMessage
                name="camera_name"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="camera_ipv4">IPv4</label>
              <Field type="text" name="camera_ipv4" />
              <ErrorMessage
                name="camera_ipv4"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <label htmlFor="camera_status">Status</label>
              <Field type="text" name="camera_status" />
              <ErrorMessage
                name="camera_status"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <label htmlFor="camera_position">Position</label>
              <Field type="text" name="camera_position" />
              <ErrorMessage
                name="camera_position"
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
              <button
                className="accept-btn"
                type="submit"
                disabled={isSubmitting}
              >
                Tạo mới
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
