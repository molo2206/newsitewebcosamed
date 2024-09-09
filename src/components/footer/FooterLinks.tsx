interface props{
  links?:any;
}
const FooterLinks = ({links}:props) => {

  return (
    <>
      {links.map((link:any) => (
        <li
          className=" cursor-pointer transition-all font-montserrat text-sm font-semibold duration-300 hover:bg-hover hover:translate-x-[2px]"
          key={link.name}
        >
          <a href="">{link.name}</a>
        </li>
      ))}
    </>
  );
};

export default FooterLinks;
