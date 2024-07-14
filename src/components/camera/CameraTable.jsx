import { useEffect, useState, useCallback } from "react";
import { PlusOutlined } from "@ant-design/icons";
import callAPI from "../../utils/callApi";
import { Button, Table } from "antd";

// eslint-disable-next-line react/prop-types
export default function CameraTable() {
  const [products, setProducts] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [inputText, setInputText] = useState("");

  const columns = [
    {
      title: "ID",
      dataIndex: "camera_id",
      key: "camera_id",
    },
    {
      title: "Name",
      dataIndex: "camera_name",
      key: "camera_name",
    },
    {
      title: "IPv4",
      dataIndex: "camera_ipv4",
      key: "camera_ipv4",
    },
    {
      title: "Status",
      dataIndex: "camera_status",
      key: "camera_status",
    },
    {
      title: "Position",
      dataIndex: "camera_position",
      key: "camera_position",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const fakeData = [
    {
      camera_id: 1,
      camera_name: "camera 1",
      camera_ipv4: "192.168.1.1",
      camera_status: "online",
      camera_position: "abc"
    },
    {
      camera_id: 1,
      camera_name: "camera 1",
      camera_ipv4: "192.168.1.1",
      camera_status: "online",
      camera_position: "abc"
    },
    {
      camera_id: 1,
      camera_name: "camera 1",
      camera_ipv4: "192.168.1.1",
      camera_status: "online",
      camera_position: "abc"
    },
    {
      camera_id: 1,
      camera_name: "camera 1",
      camera_ipv4: "192.168.1.1",
      camera_status: "online",
      camera_position: "abc"
    },
    {
      camera_id: 1,
      camera_name: "camera 1",
      camera_ipv4: "192.168.1.1",
      camera_status: "online",
      camera_position: "abc"
    },
    {
      camera_id: 1,
      camera_name: "camera 1",
      camera_ipv4: "192.168.1.1",
      camera_status: "online",
      camera_position: "abc"
    },
    {
      camera_id: 1,
      camera_name: "camera 1",
      camera_ipv4: "192.168.1.1",
      camera_status: "online",
      camera_position: "abc"
    },
    {
      camera_id: 1,
      camera_name: "camera 1",
      camera_ipv4: "192.168.1.1",
      camera_status: "online",
      camera_position: "abc"
    },
    {
      camera_id: 1,
      camera_name: "camera 1",
      camera_ipv4: "192.168.1.1",
      camera_status: "online",
      camera_position: "abc"
    },
    {
      camera_id: 1,
      camera_name: "camera 1",
      camera_ipv4: "192.168.1.1",
      camera_status: "online",
      camera_position: "abc"
    },
    {
      camera_id: 1,
      camera_name: "camera 1",
      camera_ipv4: "192.168.1.1",
      camera_status: "online",
      camera_position: "abc"
    },
    {
      camera_id: 1,
      camera_name: "camera 1",
      camera_ipv4: "192.168.1.1",
      camera_status: "online",
      camera_position: "abc"
    },
    {
      camera_id: 1,
      camera_name: "camera 1",
      camera_ipv4: "192.168.1.1",
      camera_status: "online",
      camera_position: "abc"
    },
    {
      camera_id: 1,
      camera_name: "camera 1",
      camera_ipv4: "192.168.1.1",
      camera_status: "online",
      camera_position: "abc"
    },
    {
      camera_id: 1,
      camera_name: "camera 1",
      camera_ipv4: "192.168.1.1",
      camera_status: "online",
      camera_position: "abc"
    },

  ]

  const fetchProducts = useCallback(async () => {
    try {
      const { data } = await callAPI.get(
        `/cameras?limit=${limit}&page=${currentPage}`
      );
      // console.log(data);
      const { cameras: cameraList, metadata } = data;
      // setDataLength(metadata.length);
      // setTotalProduct(metadata.total);
      console.log(cameraList);
      setCameras(cameraList);
    } catch (error) {
      alert(error);
    }
  }, [currentPage, limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleEdit = (id) => {
    console.log(id);
  };

  const handleDelete = async (id) => {
    await callAPI.delete(`/cameras/${id}`);
    fetchProducts();
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value.toLowerCase());
  };

  return <Table dataSource={fakeData} columns={columns}></Table>;
}
