import "./index.css";

// eslint-disable-next-line react/prop-types
export default function Modal({ setIsOpen, content }) {
  return (
    <>
      <div className="dark-bg" onClick={() => setIsOpen(false)}></div>
      <div className="centered">{content(setIsOpen)}</div>
    </>
  );
}
