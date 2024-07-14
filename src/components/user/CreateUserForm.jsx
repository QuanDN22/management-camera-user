import React, { useState } from "react";
import callAPI from "../../utils/callApi";
import { Button, Form, Input, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const CreateUserForm = () => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const alertSuccess = () => {
    messageApi.open({
      type: "success",
      content: "Created a new user successfully!",
    });
  };
  const alertError = () => {
    messageApi.open({
      type: "error",
      content: "Failed to create a new user!",
    });
  };
  const onCreate = async (values) => {
    console.log("Received values of form: ", values);
    setConfirmLoading(true);
    try {
      await callAPI.post("/users", values);
      alertSuccess();
    } catch (error) {
      console.error("Create user failed: ", error);
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
        New User
      </Button>
      <Modal
        open={open}
        title="Create a new user"
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
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input user's name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          validateFirst
          rules={[
            {
              required: true,
              message: "Please input user's email!",
            },
            {
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Invalid email!",
            },
          ]}
        >
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          validateFirst
          rules={[{ pattern: /^[0-9]*$/, message: "Invalid phone number!" }]}
        >
          <Input type="textarea" />
        </Form.Item>
      </Modal>
    </>
  );
};

export default CreateUserForm;
