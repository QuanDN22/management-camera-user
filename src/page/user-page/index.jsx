import { useState } from "react";
import Modal from "../../components/Modal";
import CreateUSerForm from "../../components/UserTable/CreateUserForm";
import Header from "../../components/Header";
import UserTable from "../../components/UserTable";

export default function ProductPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Header title={"Danh sách người dùng"} />
      <UserTable setIsOpen={setIsOpen} />
      {isOpen && <Modal setIsOpen={setIsOpen} content={CreateUSerForm} />}
    </>
  );
}
