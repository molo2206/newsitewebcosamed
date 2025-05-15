import { useNavigate } from "react-router-dom";
import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";

interface props {
  cat?: any;
}
const CategoryCard = ({ cat }: props) => {
  const navigate = useNavigate();
  const Onclick = () => {
    navigate(
      `/blog/category/${
        showingTranslateValue(cat?.translations, lang)?.category_id
      }`
    ); // Remplace "/about" par la route cible
  };
  const { lang } = useAuthContext();
  return (
    <>
      <p
        onClick={Onclick}
        className=" hover:text-gray-200 dark:text-white  text-white cursor-pointer 
           w-full  rounded-full lg:text-sm font-light
          md:text-sm"
      >
        {showingTranslateValue(cat?.translations, lang)?.name}
      </p>
    </>
  );
};

export default CategoryCard;
