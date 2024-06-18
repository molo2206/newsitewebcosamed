import { Link } from "react-router-dom";
import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";

interface props {
  cat?: any;
}

const BlogThematiqueCard = ({ cat }: props) => {
  const { lang } = useAuthContext();
  return (
    <>
      <Link
        to={
          `/blog/detail/` + showingTranslateValue(cat?.translations, lang)?.slug
        }
        onClick={() => window.scroll(0, 0)}
      >
        <div className="p-4 shadow-lg">
          <div className="overflow-hidden">
            <img
              src={cat?.image}
              alt="not found"
              className="mx-auto h-[250px] w-full 
            object-cover transition duration-700 hover:skew-x-2 hover:scale-110"
            />
          </div>
          <div className=" flex justify-between py-2 text-slate-600">
            <p>{cat?.publication_date}</p>
            <p className=" line-clamp-1">{cat?.author.full_name}</p>
          </div>
          <div className="space-y-2 py3">
            <h1
              className="font-montserrat line-clamp-1 font-bold"
              dangerouslySetInnerHTML={{
                __html: showingTranslateValue(cat?.translations, lang)?.title,
              }}
            ></h1>
            <p
              className="font-montserrat line-clamp-5"
              dangerouslySetInnerHTML={{
                __html: showingTranslateValue(cat?.translations, lang)
                  ?.description,
              }}
            ></p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BlogThematiqueCard;
