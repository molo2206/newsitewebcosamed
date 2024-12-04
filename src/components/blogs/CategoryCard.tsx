import { Link } from "react-router-dom";
import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";

interface props {
  cat?: any;
}
const CategoryCard = ({ cat }: props) => {
  const { lang } = useAuthContext();
  return (
    <>
      <Link
        to={`/blog/category/${
          showingTranslateValue(cat?.translations, lang)?.category_id
        }`}
      >
        {/* <div className="  underline-offset-4 dark:text-white md:text-xl sm:text-sm lg:text-lg hover:text-hover">
          {showingTranslateValue(cat?.translations, lang)?.name}
        </div>
        <p className="border border-t-1 border-principal"></p> */}
        
          <span className=" hover:text-hover  text-principal w-full py-1 px-3 rounded-full lg:text-sm
          md:text-sm">
            {showingTranslateValue(cat?.translations, lang)?.name}
          </span>
       
      </Link>
    </>
  );
};

export default CategoryCard;
