import { useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CreateCameraForm from "../../components/camera/CreateCameraForm";
import CameraTable from "../../components/camera/CameraTable";

export default function CameraPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        style={{
          marginBottom: "8px",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <CreateCameraForm />
      </div>
      <CameraTable setIsOpen={setIsOpen} />
    </>
  );
}
