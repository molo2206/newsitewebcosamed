interface Props {
  checked?: boolean;
  label?: string;
  onchange?: () => void;
  id?: string;
}


export const ButtonMoney = ({ checked, label, onchange, id }: Props) => {
  return (
    <div className="w-full mx-auto">
      <div className="relative">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onchange}
          className="peer hidden"
        />
        <label
          htmlFor={id}
          className={`
            w-full cursor-pointer flex items-center justify-center
            border border-[#3b82f6] dark:border-[#60a5fa] rounded-md px-4 py-2
            bg-white dark:bg-principal text-[#0b1f3f] dark:text-white
            transition-all duration-200 ease-in-out text-sm sm:text-base
            peer-checked:bg-hover dark:peer-checked:bg-hover
            peer-checked:text-white shadow-sm hover:shadow-md
            focus:outline-none focus:ring-2 focus:ring-blue-200
          `}
        >
          <span className="font-medium truncate">{label}</span>
        </label>
      </div>
    </div>
  );
};
