// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
import callAPI from "../../utils/callApi";

// eslint-disable-next-line react/prop-types
// export default function CreateProductForm(setIsOpen) {
//   const validationSchema = Yup.object({
//     camera_name: Yup.string().required("Name is required"),
//     camera_ipv4: Yup.string().required("IP is required"),
//     camera_status: Yup.string().required("Status is required"),
//     camera_position: Yup.string().required("Position is required"),
//   });

//   const handleSubmit = async (values) => {
//     try {
//       await callAPI.post("/cameras", values);
//       alert("Them thanh cong");
//     } catch (error) {
//       console.log(error);
//       alert(error.response.data.message);
//     } finally {
//       setIsOpen(false);
//     }
//   };

//   return (
//     <div className="create-form">
//       <h2>Tạo mới camera</h2>
//       <Formik
//         initialValues={{
//           camera_name: "",
//           camera_ipv4: "",
//           camera_status: "",
//           camera_position: "",
//         }}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <div className="form-group">
//               <label htmlFor="camera_name">Name</label>
//               <Field type="text" name="camera_name" />
//               <ErrorMessage
//                 name="camera_name"
//                 component="div"
//                 className="error-message"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="camera_ipv4">IPv4</label>
//               <Field type="text" name="camera_ipv4" />
//               <ErrorMessage
//                 name="camera_ipv4"
//                 component="div"
//                 className="error-message"
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="camera_status">Status</label>
//               <Field type="text" name="camera_status" />
//               <ErrorMessage
//                 name="camera_status"
//                 component="div"
//                 className="error-message"
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="camera_position">Position</label>
//               <Field type="text" name="camera_position" />
//               <ErrorMessage
//                 name="camera_position"
//                 component="div"
//                 className="error-message"
//               />
//             </div>

//             <div className="modal-action">
//               <button
//                 className="cancel-btn"
//                 type="button"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Hủy
//               </button>
//               <button
//                 className="accept-btn"
//                 type="submit"
//                 disabled={isSubmitting}
//               >
//                 Tạo mới
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { Button, Modal, Form, Input } from "antd";

// const CreateProductForm = ({open, setOpen}) => {
//   const [confirmLoading, setConfirmLoading] = useState(false);
//   const [modalText, setModalText] = useState("Content of the modal");
//   const handleOk = () => {
//     setModalText("The modal will be closed after two seconds");
//     setConfirmLoading(true);
//     setTimeout(() => {
//       setOpen(false);
//       setConfirmLoading(false);
//     }, 2000);
//   };
//   const handleCancel = () => {
//     console.log("Clicked cancel button");
//     setOpen(false);
//   };
//   const onFinish = (values) => {
//     console.log('Success:', values);
//   };
//   const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//   };
//   return (
//     <>
//       <Modal
//         title="Add new camera"
//         open={open}
//         onOk={handleOk}
//         confirmLoading={confirmLoading}
//         onCancel={handleCancel}
//       >
//         <Form
//           name="basic"
//           labelCol={{
//             span: 8,
//           }}
//           wrapperCol={{
//             span: 16,
//           }}
//           style={{
//             maxWidth: 600,
//           }}
//           initialValues={{
//             remember: true,
//           }}
//           onFinish={onFinish}
//           onFinishFailed={onFinishFailed}
//           autoComplete="off"
//         >
//           <Form.Item
//             label="Name"
//             name="name"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input camera's name!",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="IPv4"
//             name="ipv4"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input camera's IPv4!",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Position"
//             name="position"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input camera's position!",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Status"
//             name="status"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input camera's status!",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };

import React, { useState } from "react";
import { Button, Form, Input, Modal, message, Select, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const CreateProductForm = () => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const alertSuccess = () => {
    messageApi.open({
      type: "success",
      content: "Created a new camera successfully!",
    });
  };
  const alertError = () => {
    messageApi.open({
      type: "error",
      content: "Failed to create a new camera!",
    });
  };
  const onCreate = async (values) => {
    console.log("Received values of form: ", values);
    setConfirmLoading(true);
    try {
      await callAPI.post("/cameras", values);
      alertSuccess();
    } catch (error) {
      console.error("Create camera failed: ", error);
      alertError();
    } finally {
      setConfirmLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        icon={<PlusOutlined />}
      >
        New Camera
      </Button>
      <Modal
        open={open}
        title="Create a new camera"
        okText="Create"
        cancelText="Cancel"
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
        }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        confirmLoading={confirmLoading}
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="camera_name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input camera's name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="camera_ipv4" label="IPv4">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="camera_position" label="Position">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="camera_status" label="Status" initialValue="online">
          <Select>
            <Select.Option value="online">Online</Select.Option>
            <Select.Option value="offline">Offline</Select.Option>
          </Select>
        </Form.Item>
      </Modal>
    </>
  );
};

export default CreateProductForm;
