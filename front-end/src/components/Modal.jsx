import { HiXMark } from "react-icons/hi2";

const Modal = ({ children, onCloseModal }) => {
  return (
    // overlay
    <div className="fixed top-0 left-0 w-full h-screen bg-white bg-opacity-10 bg-blur-sm backdrop-blur z-50 transition-all duration-500">
      {/* modal */}
      <div className="fixed top-1/2 left-1/2 bg-white transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg p-10 transition-all duration-500">
        <button className="bg-none border-none p-1 rounded-md transform translate-x-2 hover:bg-gray-200 absolute top-4 right-8 transition-all duration-200">
          <HiXMark onClick={onCloseModal} className="text-xl" />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};
export default Modal;
