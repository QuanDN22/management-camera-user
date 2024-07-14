/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback, memo } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "./index.css";
import Pagination from "../Pagination";
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
  const columns =[
    {
      title: 'ID',
      dataIndex: 'user_id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Phone',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ]
  return (
    // <>
    //   <SubHeader handleInputChange={handleInputChange} setIsOpen={setIsOpen} />
    //   <div className="user-table">
    //     <table>
    //       <TableHeader />
    //       <tbody>
    //         {filteredData.map((user) => (
    //           <TableRow
    //             key={user.user_id}
    //             user={user}
    //             handleEdit={handleEdit}
    //             handleDelete={handleDelete}
    //           />
    //         ))}
    //       </tbody>
    //     </table>
    //     {/* <TableFooter
    //       filteredDataLength={totalData}
    //       limit={limit}
    //       handleLimitChange={handleLimitChange}
    //       handlePagination={handlePagination}
    //       currentPage={currentPage}
    //       length={dataLength}
    //     /> */}
    //   </div>
    // </>
    <>
      <div style={{marginBottom: "8px", display: 'flex', flexDirection: 'row-reverse'}}>
      <Button type="primary" icon={<PlusOutlined />}>Thêm người dùng mới</Button>
      </div>
      <Table style={{overflow: 'scroll', height: '400px'}} dataSource={usersData} columns={columns}></Table>
    </>
  );
}

const SubHeader = memo(({ handleInputChange, setIsOpen }) => {
  return (
    <div className="sub-header">
      <div className="search-bar">
        {/* <div className="search-icon">
          <SearchOutlined />
        </div> */}
        {/* <input
          className="search-bar-input"
          type="text"
          placeholder="Tìm kiếm"
          onChange={handleInputChange}
        /> */}
      </div>
      <div className="create-btn">
        <button type="primary" onClick={() => setIsOpen(true)}>
          + Tạo mới
        </button>
      </div>
    </div>
  );
});

const TableHeader = memo(() => {
  return (
    <thead className="table-head">
      <tr className="table-row-header">
        <th className="user-avatar">ID</th>
        <th className="user-name">TÊN NGUỜI DÙNG</th>
        <th className="user-email">EMAIL</th>
        <th className="user-date">ĐỊA CHỈ</th>
        <th className="user-phone">SỐ ĐIỆN THOẠI</th>
        <th className="user-action">HÀNH ĐỘNG</th>
      </tr>
    </thead>
  );
});

const TableFooter = memo(
  ({
    filteredDataLength,
    limit,
    handleLimitChange,
    handlePagination,
    currentPage,
    length,
  }) => {
    return (
      <div className="footer">
        <div className="select-number">
          Showing &nbsp;
          <select
            id="number"
            name="number"
            required
            onChange={handleLimitChange}
            value={limit}
          >
            {(length > 5 ? [6, 7, 8, 9, 10] : [length]).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          &nbsp; of {filteredDataLength}
        </div>
        <Pagination
          length={filteredDataLength}
          limit={limit}
          handlePagination={handlePagination}
          currentPage={currentPage}
        />
      </div>
    );
  }
);

function TableRow({ user, handleEdit, handleDelete }) {
  return (
    <tr className="table-row">
      <td className="user-avatar">{user.id}</td>
      <td className="user-name">{user.full_name}</td>
      <td className="user-email">{user.email}</td>
      <td className="user-date">{user.address}</td>
      <td className="user-phone">{user.phone_number}</td>
      <td className="user-action">
        <EditOutlined
          className="action-icon"
          onClick={() => handleEdit(user.user_id)}
        />
        <DeleteOutlined
          className="action-icon"
          onClick={() => handleDelete(user.user_id)}
        />
      </td>
    </tr>
  );
}
