import PropTypes from "prop-types";
interface props {
    onValidate?: any;
    url?: any;
  }
const ImageCroper = ({ onValidate, url }: props) => {
    return (
      <div className="flex flex-col items-center">
        <img
          src={url}
          alt="To crop"
          className="max-w-full rounded-md shadow-md"
        />
        <button
          onClick={onValidate}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Validate
        </button>
      </div>
    );
  };
  
  ImageCroper.propTypes = {
    onValidate: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
  };