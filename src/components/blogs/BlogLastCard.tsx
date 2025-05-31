import { Link } from "react-router-dom";
import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";

interface Props {
  blog?: any;
}

const BlogLastCard = ({ blog }: Props) => {
  const { lang } = useAuthContext();
  const translation = showingTranslateValue(blog?.translations, lang);

  return (
    <Link
      to={`/blog/detail/${translation?.slug}`}
      className="block max-w-sm overflow-hidden shadow-sm hover:shadow-md bg-white dark:bg-slate-800 transition-shadow"
    >
      <div className="aspect-[4/3]">
        <img
          src={blog?.image}
          alt={translation?.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-3 space-y-1">
        <h3
          className="text-sm font-semibold text-principal dark:text-white line-clamp-2"
          dangerouslySetInnerHTML={{ __html: translation?.title }}
        />
        <p
          className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: translation?.description }}
        />
      </div>
    </Link>
  );
};

export default BlogLastCard;
