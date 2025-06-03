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
  onFocus?: any;
}
const InputSearch = ({
  type,
  onChange,
  onFocus,
  options,
  name,
  value,
  placeholder,
}: props) => {
  return (
    <div className="block">
      {type === "select" ? (
        <select
          name={name}
          style={{ height: 44 }}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          className="w-full bg-transparent dark:bg-slate-900 rounded-full text-black border py-3
           px-4 dark:text-white border-slate-300 dark:border-slate-700 focus:outline-none focus:border-principal
            focus:dark:border-principal focus:ring-0  "
        >
          <option value={""} defaultChecked>
            ...
          </option>
          {options?.map((item: any, index: number) => (
            <option key={index} value={item?.value} defaultChecked>
              {item?.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          style={{ height: 30 }}
          value={value}
          autoComplete="off"
          type={type || "text"}
          id="autoResizeInput"
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          className="w-full p-4 text-gray-800 border border-gray-300 rounded-l"
        />
        
      )}
    </div>
  );
};

export default InputSearch;
