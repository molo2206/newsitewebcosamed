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
const InputSpecial = ({
  //   label,
  type,
  onChange,
  onFocus,
  //   required,
  options,
  name,
  value,
  placeholder,
}: props) => {
  return (
    <div className="block">
      {/* <label className="lg:text-sm  items-center justify-center md:text-sm font-light tracking-tight text-gray-900 dark:text-white">
        {label}
        {required && <span className="text-red-500 ml-2"> * </span>}
      </label> */}
      {type === "select" ? (
        <select
          name={name}
          style={{ height: 44 }}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          className="w-full bg-transparent dark:bg-slate-900 rounded-md text-slate-900 border py-3 px-4 dark:text-white border-slate-300 dark:border-slate-700 focus:outline-none focus:border-principal focus:dark:border-principal focus:ring-0"
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
          style={{ height: 40 }}
          value={value}
          autoComplete="off"
          type={type || "text"}
          id="autoResizeInput"
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          className="flex-1 px-4 py-2 w-full md:w-[400px] lg:w-[400px] border dark:text-white dark:bg-slate-900 border-slate-400 dark:border-slate-700 rounded-md focus:outline-none min-w-[10px] resize-none focus:ring focus:ring-blue-300"
        />
      )}
      {/* {errors ? (
        <div className="d-block">
          <span style={{ fontSize: 11 }} className=" text-red-500  ">
            {errors}
          </span>
        </div>
      ) : null} */}
    </div>
  );
};

export default InputSpecial;
