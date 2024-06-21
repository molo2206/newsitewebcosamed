import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
interface props {
  title?: any;
  second?:any;
  secondTitle?:any
}
const BreadCumb = ({ title, second, secondTitle }: props) => {
  const { t } = useTranslation();
  return (
    <nav className="breadcrumbs border-[#cbd2d9] border-[0.5px] rounded-lg line-clamp text-sm " style={{ marginTop: 10, marginBottom: 10 }}>
      <Link to="/" className="breadcrumbs__item text-slate-800 dark:text-slate-300">
        {t("Home")}
      </Link>
      {
        second && <Link to={second} className="breadcrumbs__item text-slate-800 dark:text-slate-300">
        {t(secondTitle)}
      </Link>
      }
      <a className="breadcrumbs__item is-active text-slate-400 dark:text-slate-300">{title}</a>
    </nav>
  );
};

export default BreadCumb;
