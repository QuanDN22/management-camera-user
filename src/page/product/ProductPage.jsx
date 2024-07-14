import { useState } from "react";
import CreateProductForm from "../../components/ProductTable/CreateProductForm";
import ProductTable from "../../components/ProductTable/ProductTable";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function ProductPage() {
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
        <CreateProductForm />
      </div>
      <ProductTable setIsOpen={setIsOpen} />
    </>
  );
}
