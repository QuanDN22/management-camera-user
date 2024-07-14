/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import callAPI from "../../utils/callApi";
import { Button, Table } from "antd";

export default function UserTable({ setIsOpen }) {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [inputText, setInputText] = useState("");
  const [usersData, setUsersData] = useState([]);
  // const [dataLength, setDataLength] = useState(0);
  // const [totalData, setTotalData] = useState(0);

  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await callAPI.get(
        `/auth/users?limit=${limit}&page=${currentPage}`
      );
      const { users: usersData, metadata } = data;
      console.log(usersData);
      setUsersData(usersData);
      // setTotalData(metadata.total);
      // setDataLength(metadata.length);
      setUsers(usersData);
    } catch (error) {
      alert(error);
    }
  }, [currentPage, limit]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredData = inputText
    ? users.filter((user) =>
        user.user_name.toLowerCase().includes(inputText.toLowerCase())
      )
    : users;

  const handleEdit = (id) => {
    console.log(id);
  };

  const handleDelete = async (id) => {
    try {
      await callAPI.delete(`/auth/users/${id}`);
      fetchUsers();
    } catch (error) {
      alert(error);
    }
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "user_id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  return <Table dataSource={usersData} columns={columns}></Table>;
}
