import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";
import { Link } from "react-router-dom";

interface props {
  blog?: any;
}

const CardSearch = ({ blog }: props) => {
  const { lang } = useAuthContext();

  return (
    <>
      <Link
        to={
          blog?.publication_date
            ? `/blog/detail/${
                showingTranslateValue(blog?.translations, lang)?.slug
              }`
            : "/bulletin/detail/" + blog?.id
        }
      >
        <div className="grid grid-cols-2 md:grid-cols-6 sm:grid-cols-2 lg:grid-cols-8 md:gap-4 row py-2">
          <div className="col-span-2 col-lg-4 col-md-4">
            <img
              src={blog?.image}
              alt=""
              className="mx-auto w-full h-auto
            object-cover transition duration-700 rounded-sm"
            />
          </div>
          <div className="col-span-6 md:col-lg-3 col-md-2 gap-3">
            <div className="mt-2 p-2 border-[2px] text-principal font-bold flex border-principal w-[100px] rounded-full justify-center items-center">
              {blog?.publication_date
                ? "Actualité"
                : blog?.file
                ? "Bulletin"
                : ""}
            </div>
            <Link
              to={`${
                blog?.publication_date
                  ? "/blog/detail/" + blog?.slug
                  : blog?.file
                  ? "/bulletin/detail/" + blog?.id
                  : undefined
              }`}
            >
              <h1 className=" text-2xl font-semibold mb-10 line-clamp-2">
                {showingTranslateValue(blog?.translations, lang)?.title}
              </h1>
            </Link>
            <p
              className="font-montserrat line-clamp-5"
              dangerouslySetInnerHTML={{
                __html: showingTranslateValue(blog?.translations, lang)
                  ?.description,
              }}
            ></p>
          </div>
        </div>
        <br />
        <p className="border border-t-1 border-principal"></p>
      </Link>
    </>
  );
};

export default CardSearch;
