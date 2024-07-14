import { useState } from "react";
import UserTable from "../../components/user/UserTable";
import CreateUserForm from "../../components/user/CreateUserForm";
export default function UserPage() {
  const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState(false);
  return (
    <>
      <div
        style={{
          marginBottom: "8px",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <CreateUserForm />
      </div>
      <UserTable setIsOpen={setIsOpenCreateUserModal} />
    </>
  );
}
