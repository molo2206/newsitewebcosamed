const SubMenu = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <li className="group cursor-pointer relative">
    <a className="flex items-center gap-[2px] h-[40px] text-sm hover:text-slate-300">
      {title}
    </a>
    <div
      className="dropdown absolute left-0 z-[99999] hidden w-full rounded-b-3xl
                 bg-white text-black dark:bg-gray-800 dark:text-white p-4 shadow-md
                 group-hover:block"
    >
      {children}
    </div>
  </li>
);

export default SubMenu;