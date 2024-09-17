interface props{
  links?:any;
}
const FooterLinks = ({links}:props) => {

  return (
    <>
      {links.map((link:any) => (
        <li
          className=" cursor-pointer transition-all font-montserrat md:text-lg sm:text-sm font-semibold duration-300 hover:bg-hover hover:translate-x-[2px]"
         
        >
          <a href={link.path}>{link.name}</a>
        </li>
      ))}
    </>
  );
};

export default FooterLinks;
