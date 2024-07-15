/* eslint-disable react/prop-types */
import { Image, Card } from "antd";
const { Meta } = Card;
const App = ({ images }) => (
  <div className="product-list">
    {images.map((image, index) => (
      <Image.PreviewGroup
        key={index}
        preview={{
          onChange: (current, prev) =>
            console.log(`current index: ${current}, prev index: ${prev}`),
        }}
      >
        <Card
          bordered={false}
          className="product-item"
          style={{
            boxShadow: "none",
          }}
          cover={<Image src={image.frame} style={{ width: "100%" }} />}
        >
          <Meta className="product-item-title" title={image.timestamp}></Meta>
          <Meta className="product-item-title" title={image.position}></Meta>
        </Card>
      </Image.PreviewGroup>
    ))}
  </div>
);
export default App;
