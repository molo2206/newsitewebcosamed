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
const InputFile = ({
  label,
  type,
  onChange,
  onFocus,
  required,
  options,
  name,
  value,
  errors,
  placeholder,
}: props) => {
  return (
    <div className="block">
      <label className=" items-center justify-center text-[12px] font-light tracking-tight text-gray-900 dark:text-white">
        {label}
        {required && <span className="text-red-500 ml-2">*</span>}
      </label>
      {type === "select" ? (
        <select
          name={name}
          style={{ height: 44 }}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          className="w-full text-[12px] bg-transparent dark:bg-slate-900 rounded-md text-slate-900 border py-3 px-4 dark:text-white border-slate-300 dark:border-slate-700 focus:outline-none focus:border-principal focus:dark:border-principal focus:ring-0"
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
          type="file"
          className="w-full text-[12px] bg-transparent rounded-md text-slate-800 border py-3 px-4 dark:text-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 
            focus:outline-none focus:ring-2 focus:ring-principal focus:border-principal hover:border-slate-500 dark:hover:border-slate-500 transition-all duration-200 ease-in-out shadow-sm"
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
        />
      )}
      {errors ? (
        <div className="d-block">
          <span style={{ fontSize: 11 }} className=" text-red-500  ">
            {errors}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default InputFile;
