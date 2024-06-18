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
        <div>{showingTranslateValue(cat?.translations, lang)?.name}</div>
      </Link>
    </>
  );
};

export default CategoryCard;
