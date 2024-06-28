/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback, memo } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "./index.css";
import Pagination from "../Pagination";
import callAPI from "../../utils/callApi";

export default function UserTable({ setIsOpen }) {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [inputText, setInputText] = useState("");
  const [dataLength, setDataLength] = useState(0);
  const [totalData, setTotalData] = useState(0);

  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await callAPI.get(
        `/users?limit=${limit}&page=${currentPage}`
      );
      const { users: usersData, metadata } = data;
      setTotalData(metadata.total);
      setDataLength(metadata.length);
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
      await callAPI.delete(`/users/${id}`);
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

  return (
    <>
      <SubHeader handleInputChange={handleInputChange} setIsOpen={setIsOpen} />
      <div className="user-table">
        <table>
          <TableHeader />
          <tbody>
            {filteredData.map((user) => (
              <TableRow
                key={user.user_id}
                user={user}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
        <TableFooter
          filteredDataLength={totalData}
          limit={limit}
          handleLimitChange={handleLimitChange}
          handlePagination={handlePagination}
          currentPage={currentPage}
          length={dataLength}
        />
      </div>
    </>
  );
}

const SubHeader = memo(({ handleInputChange, setIsOpen }) => {
  return (
    <div className="sub-header">
      <div className="search-bar">
        <div className="search-icon">
          <SearchOutlined />
        </div>
        <input
          className="search-bar-input"
          type="text"
          placeholder="Tìm kiếm"
          onChange={handleInputChange}
        />
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
        <th className="user-avatar">AVATAR</th>
        <th className="user-name">TÊN NGUỜI DÙNG</th>
        <th className="user-email">EMAIL</th>
        <th className="user-date">NGÀY SINH</th>
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
      <td className="user-avatar">
        <img src={user.user_avatar} alt={"img"} />
      </td>
      <td className="user-name">{user.user_name}</td>
      <td className="user-email">{user.user_email}</td>
      <td className="user-date">{user.date_of_birth.split("T")[0]}</td>
      <td className="user-phone">{user.user_phone}</td>
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
