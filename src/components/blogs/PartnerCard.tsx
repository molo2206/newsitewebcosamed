import { Link } from "react-router-dom";
interface props {
  partners?: any;
}

const PartnerCard = ({partners}:props) => {
  return (
    <>
      <Link target="_black" to={partners?.url} onClick={() => window.scroll}>
        <div className="container p-1 shadow-2xl rounded-md">
          <div className="overflow-hidden py-4">
            <img
              src={partners?.image}
              alt="not found"
              className="mx-auto h-[200px] w-80
            object-contain transition duration-700 " 
            />
          </div>
          <div className=" flex justify-between py-2 text-slate-600">
            {/* <p>{blog?.publication_date}</p>
            <p className=" line-clamp-1">{blog?.author.full_name}</p> */}
          </div>
          <div className="space-y-2 py3">
            <h1
            //   className="font-montserrat line-clamp-1 font-bold"
            //   dangerouslySetInnerHTML={{
            //     __html: showingTranslateValue(blog?.translations, lang)?.title,
            //   }}
            ></h1>
            <p
            //   className="font-montserrat line-clamp-5"
            //   dangerouslySetInnerHTML={{
            //     __html: showingTranslateValue(blog?.translations, lang)
            //       ?.description,
            //   }}
            ></p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default PartnerCard;
