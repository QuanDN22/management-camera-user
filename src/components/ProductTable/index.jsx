import { useEffect, useState, useCallback } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "./index.css";
import Pagination from "../Pagination";
import callAPI from "../../utils/callApi";

// eslint-disable-next-line react/prop-types
export default function ProductTable({ setIsOpen }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [inputText, setInputText] = useState("");
  const [totalProduct, setTotalProduct] = useState(0);
  const [dataLength, setDataLength] = useState(0);

  const fetchProducts = useCallback(async () => {
    try {
      const { data } = await callAPI.get(
        `/products?limit=${limit}&page=${currentPage}`
      );
      const { products: productsData, metadata } = data;
      setDataLength(metadata.length);
      setTotalProduct(metadata.total);
      setProducts(productsData);
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
    await callAPI.delete(`/products/${id}`);
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

  const filteredProducts = inputText
    ? products.filter((product) =>
        product.product_name.toLowerCase().includes(inputText)
      )
    : products;

  return (
    <>
      <div className="sub-header">
        <div className="search-bar">
          <div className="search-icon">
            <SearchOutlined />
          </div>
          <input
            className="search-bar-input"
            type="text"
            placeholder="Search"
            onChange={handleInputChange}
          />
        </div>
        <div className="create-btn">
          <button type="button" onClick={() => setIsOpen(true)}>
            + Create New
          </button>
        </div>
      </div>
      <div className="product-table">
        <table>
          <thead className="table-head">
            <tr className="table-row-header">
              <th className="product-name">Product Name</th>
              <th className="product-price">Price</th>
              <th className="product-quantity">Quantity</th>
              <th className="product-description">Description</th>
              <th className="product-image">Image</th>
              <th className="product-action">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.product_id} className="table-row">
                <td className="product-name">{product.product_name}</td>
                <td className="product-price">{product.product_price}</td>
                <td className="product-quantity">{product.product_quantity}</td>
                <td className="product-description">
                  {product.product_description}
                </td>
                <td className="product-image">
                  <img src={product.product_imageUrl} alt={"img"} />
                </td>
                <td className="product-action">
                  <EditOutlined
                    className="action-icon"
                    onClick={() => handleEdit(product.product_id)}
                  />
                  <DeleteOutlined
                    className="action-icon"
                    onClick={() => handleDelete(product.product_id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
              {(dataLength > 5 ? [6, 7, 8, 9, 10] : [dataLength]).map(
                (value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                )
              )}
            </select>
            &nbsp; of {totalProduct}
          </div>
          <Pagination
            length={totalProduct}
            limit={limit}
            handlePagination={handlePagination}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
}
