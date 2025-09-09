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
      <div className="bg-white dark:bg-slate-900 dark:text-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-6">
          {Array.from({ length: 5 }).map((_, key) => (
            <BlogDetailLoad key={key} />
          ))}
        </div>
      </div>
    );

  const translation = showingTranslateValue(data?.translations, lang);

  return (
    <div className="bg-white dark:bg-slate-900 dark:text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <BreadCumb
          title="Detail"
          second="/load-data/communicated"
          secondTitle="Communicated"
        />

        {/* Titre */}
        <h1 className="text-sm lg:text-[16px] font-bold text-principal border-b-4 border-principal pb-2">
          {translation?.title || "Titre indisponible"}
        </h1>

        {/* Image principale */}
        <div className="overflow-hidden shadow-sm border bg-white dark:bg-slate-800 rounded-md">
          <SafeImage
            src={data?.file}
            alt={translation?.title || "Image de la publication"}
            className="w-full h-auto max-h-[500px] object-cover rounded-md"
          />
        </div>

        {/* Contenu */}
        <div
          className="text-base leading-relaxed font-montserrat mt-6"
          dangerouslySetInnerHTML={{ __html: translation?.description || "<p>Contenu indisponible</p>" }}
        />

        {/* Auteur */}
        <div className="flex items-center gap-4 mt-8">
          <img
            src={data?.author?.image}
            alt={data?.author?.full_name || "Auteur"}
            className="h-[40px] w-[40px] rounded-full object-cover"
          />
          <p className="text-sm font-medium">{data?.author?.full_name || "Auteur inconnu"}</p>
        </div>
      </div>
    </div>
  );
};

export default CommunicateDetail;
