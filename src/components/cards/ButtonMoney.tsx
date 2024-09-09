interface props {
  value?: any;
  label?: any;
  onchange?:any;
  id?:any;
}

export const ButtonMoney = ({ value,label,onchange,id }: props) => {
  return (
    <div>
      <div className="relative ">
        <input
          className="text-white  peer hidden focus:ring-blue-300 border-gray-800 peer rounded-lg w-6 h-6 absolute top-7 left-4 "
           id={id}
        //   name="custom-checkbox"
          type="checkbox"
          checked={value}
          onChange={onchange}
        />
        <label
          className="w-full h-full  cursor-pointer flex flex-row justify-between items-center border rounded-lg p-4  
  active:bg-hover 
  peer-focus:outline-none peer-focus:ring ring-blue-100 
  border-principal peer-checked:bg-principal peer-checked:text-white
  bg-blue-100z"
          htmlFor={id}
        >
          <div className="flex flex-row justify-center items-center w-[380px] ml-10 mr-4">
            <div>
              <h3 className="font-bold text-xl ">{label}</h3>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};
