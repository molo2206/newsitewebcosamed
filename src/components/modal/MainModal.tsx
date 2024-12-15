import PropTypes from "prop-types";

interface props {
  size?: any;
  title?: any;
  show?: any;
  close?: any;
  children?: any;
  onValidate?: any;
  url?: any;
}
const MainModal = ({ size = "xl", title, show, close, children }: props) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`w-full max-w-${size} bg-white rounded-lg shadow-lg overflow-hidden`}
      >
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={close}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
MainModal.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

