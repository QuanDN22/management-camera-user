import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Image, Form, DatePicker, TimePicker } from "antd";
const { RangePicker } = DatePicker;
import ListImage from "../../components/Upload/list";
import "./index.css";
import callAPI from "../../utils/callApi";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
  const images = [
    {
      id: 1,
      timestamp: "2024-07-08 20:18:20",
      camera_ipv4: "192.168.1.173",
      src: "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
    },
    {
      id: 2,
      timestamp: "2024-07-08 20:18:20",
      camera_ipv4: "192.168.1.173",
      src: "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
    },
    {
      id: 3,
      timestamp: "2024-07-08 20:18:20",
      camera_ipv4: "192.168.1.173",
      src: "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
    },
    {
      id: 4,
      timestamp: "2024-07-08 20:18:20",
      camera_ipv4: "192.168.1.173",
      src: "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
    },
    {
      id: 5,
      timestamp: "2024-07-08 20:18:20",
      camera_ipv4: "192.168.1.173",
      src: "http://localhost:3003/data_from_jetson/192.168.1.11/2024-07-08T08-37-58.353983.jpg",
    },
  ];
const App = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [uploadResponse, setUploadResponse] = useState('');
  const [rangeDate, setRangeDate] = useState(["", ""]);
  const [images, setImages] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const handleUpload = async () => {

    // Đọc dữ liệu từ FileReader

    // Tạo một Uint8Array từ dữ liệu nhận được (dạng ArrayBuffer)
    // console.log(fileList[0].originFileObj)
    const imageData = await getBase64(fileList[0].originFileObj);
    // console.log(imageData);
    const base64String = imageData.replace('data:image/png;base64,', '');

    // console.log(base64String);

    // console.log(rangeDate)
    const startDate = rangeDate[0]
    const endDate = rangeDate[1]
    // console.log({
    //   start_date: startDate,
    //   end_date: endDate,
    //   image: base64String
    // })
    // const image = base64String

    // const bytes = new Uint8Array(base64String);
    // Gửi dữ liệu lên server
      try {
        const response = await callAPI.post('/image-processing',
          {
            start_time: startDate,
            end_time: endDate,
            image: base64String
          }, {
          headers: {
            'Content-Type': 'application/json', // Chỉ định loại dữ liệu là dạng bytes
          },
        });
        console.log("response: " + response.data.result[0].time)
        setUploadResponse(response.data.message); // Giả sử server trả về một chuỗi
        setImages(response.data.result);
      } catch (error) {
        // console.error('Error uploading image:', error);
        setUploadResponse('Error uploading image');
      }
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <>

    <Form onFinish={handleUpload}>
      <Form.Item>
        <Upload
          {...props}
          listType="picture"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
          {previewImage && (
            <Image
              wrapperStyle={{
                display: "none",
              }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </Upload>
      </Form.Item>
      <Form.Item>
        <RangePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          onChange={(date, dateString) => {
            setRangeDate(dateString);
          }}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          // disabled={fileList.length === 0}
          loading={uploading}
          onClick={handleUpload}
          style={{
            marginTop: 16,
          }}
        >
          {uploading ? "Searching" : "Search"}
        </Button>
      </Form.Item>
    </Form>
    <ListImage images={images} />
    </>
  );
};
export default App;
