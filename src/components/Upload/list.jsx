/* eslint-disable react/prop-types */
import { Image, Card } from "antd";
const { Meta } = Card;
const App = ({ images }) => (
  <div className="product-list">
    {images.map((image) => (
      <Image.PreviewGroup
        key={image.id}
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
          cover={<Image src={image.src} style={{ width: "100%" }} />}
        >
          <Meta className="product-item-title" title={image.name}></Meta>
        </Card>
      </Image.PreviewGroup>
    ))}
  </div>
);
export default App;
