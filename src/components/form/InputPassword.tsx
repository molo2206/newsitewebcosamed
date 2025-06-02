import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Ou remplace par une icône de ton choix

interface props {
  label?: string | any;
  placeholder?: any | string;
  type?: any | string;
  onChange?: any;
  required?: any;
  options?: [] | any;
  value?: any;
  name?: any | string;
  errors: any;
}

const InputPassword = ({
  label,
  type,
  onChange,
  required,
  options,
  name,
  value,
  errors,
  placeholder,
}: props) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="block">
      <label className="text-sm font-montserrat items-center justify-center sm:text-md font-semibold tracking-tight text-gray-900 dark:text-white">
        {label}
        {required && <span className="text-red-500 ml-2">*</span>}
      </label>

      {type === "select" ? (
        <select
          name={name}
          style={{ height: 50 }}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent dark:bg-slate-900 rounded-md text-slate-900 border py-3 px-4 dark:text-white border-slate-300 dark:border-slate-700 focus:outline-none focus:border-principal focus:dark:border-principal focus:ring-0"
        >
          <option value={""}>...</option>
          {options?.map((item: any, index: number) => (
            <option key={index} value={item?.value}>
              {item?.label}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          <input
            name={name}
            style={{ height: 40 }}
            value={value}
            autoComplete="off"
            type={type === "password" ? (showPassword ? "text" : "password") : type || "text"}
            className="w-full bg-transparent dark:bg-slate-900 rounded-md text-slate-900 border py-3 px-4 pr-10 dark:text-white border-slate-300 dark:border-slate-700 focus:outline-none focus:border-principal focus:dark:border-principal focus:ring-0"
            placeholder={placeholder}
            onChange={onChange}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
      )}

      {errors ? (
        <div className="d-block">
          <span className="text-red-500 text-sm">{errors}</span>
        </div>
      ) : null}
    </div>
  );
};

export default InputPassword;
