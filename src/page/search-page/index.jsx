import Header from "../../components/Header";
import Upload from "../../components/Upload";
import ListImage from "../../components/Upload/list";

const images = [
  {
    id: 1,
    name: "test",
    src: "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
  },
  {
    id: 2,
    name: "test",
    src: "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
  },
  {
    id: 3,
    name: "test",
    src: "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
  },
  {
    id: 4,
    name: "test",
    src: "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
  },
];

export default function SearchPage() {
  return (
    <>
      <Header title={"Tìm kiếm"} />
      <Upload />
      <ListImage images={images} />
    </>
  );
}
