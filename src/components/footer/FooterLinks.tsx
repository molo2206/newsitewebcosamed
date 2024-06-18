interface props{
  links?:any;
}
const FooterLinks = ({links}:props) => {

  return (
    <>
      {links.map((link:any) => (
        <li
          className=" cursor-pointer transition-all duration-300 hover:translate-x-[2px]"
          key={link.name}
        >
          <a href="">{link.name}</a>
        </li>
      ))}
    </>
  );
};

export default FooterLinks;
