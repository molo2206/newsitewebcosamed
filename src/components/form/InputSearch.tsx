
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
  const InputSearch = ({
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
    return (
      <div className="block">
        <label className="text-sm font-montserrat  items-center justify-center sm:text-md font-semibold tracking-tight text-gray-900 dark:text-white">
          {label}
          {required && <span className="text-red-500 ml-2">*</span>}
        </label>
        {type === "select" ? (
          <select
            name={name}
            style={{ height: 50 }}
            value={value}
            onChange={onChange}
            className="w-full  font-montserrat  bg-transparent dark:bg-slate-900 rounded-3xl text-slate-900 border py-3 px-4 dark:text-white border-slate-300 dark:border-slate-700 focus:outline-none focus:border-principal focus:dark:border-principal focus:ring-0"
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
            style={{ height: 50 , width: 250}}
            value={value}
            autoComplete="off"
            placeholder={placeholder}
            type={type || "text"}
            className=" bg-transparent font-montserrat  rounded-3xl text-slate-800 border py-3 px-4 dark:text-white border-slate-400 dark:border-slate-700 focus:outline-none focus:border-principal focus:dark:border-principal focus:ring-0"
            //placeholder={placeholder}
            onChange={onChange}
          />
        )}
        {errors ? <div className="d-block"><span className=" text-red-500 text-sm ">{errors}</span></div> : null}
      </div>
    );
  };
  
  export default InputSearch;
  