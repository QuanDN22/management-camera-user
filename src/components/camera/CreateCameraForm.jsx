import React, { useState } from "react";
import callAPI from "../../utils/callApi";
import { Button, Form, Input, Modal, message, Select, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const CreateCameraForm = () => {
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
        <Form.Item
          name="camera_ipv4"
          label="IPv4"
          validateFirst
          rules={[
            { 
              required: true, 
              message: "Please input camera's IPv4!", 
            },
            {
              pattern: /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/,
              message: "Invalid IPv4!",
            },
          ]}
        >
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

export default CreateCameraForm;
