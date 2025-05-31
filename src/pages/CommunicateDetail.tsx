import { useParams } from "react-router-dom";
import useAsync from "../hooks/useAsync";
import CommunicatedServices from "../services/CommunicatedServices";
import { showingTranslateValue } from "../utils/heleprs";
import { useAuthContext } from "../context";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";

import BreadCumb from "../components/navbar/BreadCumb";
import Error404 from "./Error404";
import { SafeImage } from "../components/bannerDetails/BannerSafeImage";

const CommunicateDetail = () => {
  const { id } = useParams();
  const { lang } = useAuthContext();
  const { data, error, loading } = useAsync(
    () => CommunicatedServices.oneCommunicate(id),
    id
  );


  if (error) return <Error404 />;

  if (loading)
    return (
      <>
        {Array.from(Array(20).keys()).map((key) => (
          <BlogDetailLoad key={key} />
        ))}
      </>
    );

  const translation = showingTranslateValue(data?.translations, lang);

  return (
    <div className="p-6">
      <BreadCumb
        title="Detail"
        second="/load-data/communicated"
        secondTitle="Communicated"
      />
      <div className=" w-full max-w-6xl mx-auto dark:bg-slate-900 dark:text-white">
        <div className="space-y-8 mt-2">
          <h1 className="text-sm lg:text-3xl font-bold text-principal border-b-4 border-principal pb-2">
            {translation?.title}
          </h1>

          <div className="overflow-hidden shadow-sm border bg-white dark:bg-slate-800">
            <SafeImage
              src={data?.file}
              alt={translation?.title}
              className="w-full object-cover"
            />
          </div>

          <div
            className="text-base leading-relaxed font-montserrat mt-6"
            dangerouslySetInnerHTML={{ __html: translation?.description }}
          />

          <div className="flex items-center gap-4 mt-8">
            <SafeImage
              src={data?.author?.image}
              alt={data?.author?.full_name}
              className="h-[60px] w-[60px] rounded-full object-cover"
            />
            <p className="text-lg font-medium">{data?.author?.full_name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicateDetail;
