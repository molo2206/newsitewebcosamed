import { Link } from "react-router-dom";
import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";

interface props {
  blog?: any;
}
const BlogLastCard = ({ blog }: props) => {
  const { lang } = useAuthContext();
  return (
    <>
      <Link
        to={
          `/blog/detail/` +
          showingTranslateValue(blog?.translations, lang)?.slug
        }
      >
        <div className="right-item-content text-slate-600 dark:bg-slate-800 dark:text-white" >
          <img className="right-bar-image w-full" src={blog?.image} />
          <a
           
            className="right-item-title line-clamp-2 font-semibold hover:text-hover"
            dangerouslySetInnerHTML={{
              __html: showingTranslateValue(blog?.translations, lang)?.title,
            }}
          ></a>
          <p
            className="text-slate-500 dark:text-white line-clamp-2"
            dangerouslySetInnerHTML={{
              __html: showingTranslateValue(blog?.translations, lang)
                ?.description,
            }}
          ></p>
        </div>
      </Link>
    </>
  );
};

export default BlogLastCard;
