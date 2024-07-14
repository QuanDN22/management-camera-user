import { useState } from "react";
import UserTable from "../../components/UserTable/UserTable";
export default function UserPage() {

  const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState(false);
  return (
    <>
      <UserTable setIsOpen={setIsOpenCreateUserModal} />
    </>
  );
}