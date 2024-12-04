import { Link } from "react-router-dom";
import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";

interface props {
  communicate?: any;
}

const CommunicateCard = ({communicate}:props) => {
  const { lang } = useAuthContext();
  return (
    <Link
      to={
        `/communicated/` + communicate?.id
      }
      onClick={() => window.scroll(0, 0)}
    >
      <div className="p-4 shadow-lg border rounded-lg">
        <div className="overflow-hidden">
          <img
            src={communicate?.file}
            alt="not found"
            className="mx-auto h-[150px] w-full 
            object-cover "
          />
        </div>
        <div className=" flex justify-between py-2 text-slate-600">
          <p className=" dark:text-white">{communicate?.created}</p>
          <div className=" flex justify-between">
            <img
              src={communicate?.author?.image}
              className=" h-[30px] px-30 rounded-full duration-200 hover:scale-105"
            />
            <p className=" line-clamp-1 mt-1  dark:text-white">{communicate?.author.full_name}</p>
          </div>
        </div>
        <div className="space-y-2 py3">
          <h1
            className="font-montserrat line-clamp-1 font-bold"
            dangerouslySetInnerHTML={{
              __html: showingTranslateValue(communicate?.translations, lang)?.title,
            }}
          ></h1>
          <p
            className="font-montserrat line-clamp-5"
            dangerouslySetInnerHTML={{
              __html: showingTranslateValue(communicate?.translations, lang)
                ?.description,
            }}
          ></p>
        </div>
      </div>
    </Link>
  );
};

export default CommunicateCard;
