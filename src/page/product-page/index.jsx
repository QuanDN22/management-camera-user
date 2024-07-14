import { useState } from "react";
import Modal from "../../components/Modal";
import CreateProductForm from "../../components/ProductTable/CreateProductForm";
import ProductTable from "../../components/ProductTable";
import Header from "../../components/Header";

export default function ProductPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ProductTable setIsOpen={setIsOpen} />
      {isOpen && <Modal setIsOpen={setIsOpen} content={CreateProductForm} />}
    </>
  );
}
