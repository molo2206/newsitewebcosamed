import { Link } from "react-router-dom";
import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";

interface props {
  bulletin?: any;
}

const BulletinCard = ({ bulletin }: props) => {
  const { lang } = useAuthContext();
  return (
    <>
      <Link
        to={`/bulletin/detail/` + bulletin?.id}
        onClick={() => window.scroll}
      >
        <div className="p-4 shadow-lg py-2">
          <div className=" overflow-hidden">
            <img
              src={bulletin?.image}
              alt="not found"
              className="mx-auto h-[250px] w-full 
          object-cover transition duration-700 hover:skew-x-2 hover:scale-110"
            />
          </div>
          <div className=" flex justify-between py-2 text-slate-600">
            <p>{bulletin?.created}</p>
            <p className=" line-clamp-1">{}</p>
          </div>
          <div className="space-y-2 py3">
            <h1
              className="font-montserrat line-clamp-1 font-bold"
              dangerouslySetInnerHTML={{
                __html: showingTranslateValue(bulletin?.translations, bulletin)
                  ?.title,
              }}
            ></h1>
            <p
              className="font-montserrat line-clamp-2"
              dangerouslySetInnerHTML={{
                __html: showingTranslateValue(bulletin?.translations, lang)
                  ?.description,
              }}
            ></p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BulletinCard;
