import Spinner from "react-bootstrap/Spinner";
interface props {
  onClick?: any;
  label?: any;
  type?: any;
  loading?: boolean | any;
}

const Button = ({ onClick, label, type, loading }: props) => {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      type={type || "submit"}
      className={`px-3 ${
        loading ? "cursor-not-allowed opacity-50" : ""
      } py-2 text-lg rounded-md w-full text-white bg-principal`}
    >
      {label}

      <Spinner color="red" variant="primary" animation="border" />
    </button>
  );
};

export default Button;
