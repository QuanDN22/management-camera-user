import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Image, Form,DatePicker } from "antd";
const { RangePicker } = DatePicker;

import "./index.css";
import callAPI from "../../utils/callApi";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const App = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [uploadResponse, setUploadResponse] = useState('');


  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const handleUpload = async() => {
    // const formData = new FormData();
    // fileList.forEach((file) => {
    //   formData.append("files[]", file);
    // });
    // setUploading(true);
    // // You can use any AJAX library you like
    // fetch("https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then(() => {
    //     setFileList([]);
    //     message.success("upload successfully.");
    //   })
    //   .catch(() => {
    //     message.error("upload failed.");
    //   })
    //   .finally(() => {
    //     setUploading(false);
    //   });

    // Đọc dữ liệu từ FileReader

    // Tạo một Uint8Array từ dữ liệu nhận được (dạng ArrayBuffer)
    const imageData =await getBase64(fileList[0].originFileObj);
    console.log(imageData);
    const base64String = imageData.replace('data:image/png;base64,', '');
    console.log(base64String);
    // const bytes = new Uint8Array(base64String);

    console.log("bytes: " + base64String);

    // Gửi dữ liệu lên server
    (async () => {
      try {
        const response = await callAPI.post('/image-processing',
          {
            image: base64String
          }, {
          headers: {
            // 'Content-Type': 'application/octet-stream', // Chỉ định loại dữ liệu là dạng bytes
            'Content-Type': 'application/json', // Chỉ định loại dữ liệu là dạng bytes
          },
        });
        console.log("response: " + response)
        setUploadResponse(response.data.message); // Giả sử server trả về một chuỗi
      } catch (error) {
        console.error('Error uploading image:', error);
        setUploadResponse('Error uploading image');
      }
    })()


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
      <Form.Item label="RangePicker">
          <RangePicker />
        </Form.Item>
     <Form.Item>
     <Button
        type="primary"
        disabled={fileList.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? "Đang tìm kiếm" : "Tìm kiếm"}
      </Button>
     </Form.Item>
   </Form>
  );
};
export default App;
