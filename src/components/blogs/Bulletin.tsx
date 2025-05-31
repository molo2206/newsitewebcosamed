import useAsync from "../../hooks/useAsync";
import BulletinServices from "../../services/BulletinServices";
import BulletinLoad from "./BulletinLoad";
import BulletinCard from "./BulletinCard";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Bulletin() {
  const { t } = useTranslation();
  const { data, loading } = useAsync(() => BulletinServices.getBulletinHome());
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-white mt-4 dark:bg-slate-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{t("Newsletters")}</h2>
        <div
          onClick={() => navigate("/data-loading/newsletters")}
          className="text-sm text-blue-700 font-medium cursor-pointer"
        >
          {t("All")} →
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 ">
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 20 }).map((_, i) => <BulletinLoad key={i} />)
            : data?.map((item: any, index: number) => (
                <BulletinCard bulletin={item} key={index} />
              ))}
        </div>

        <div className="space-y-4">
          <div className="border dark:border-slate-700  p-4 bg-white hover:shadow cursor-pointer dark:bg-slate-800">
            <p
              onClick={() => navigate("/data-loading/reports")}
              className="font-medium text-gray-800 dark:text-gray-200"
            >
              Sitrep
            </p>
          </div>
          <div className="border dark:border-slate-700 p-4 bg-white hover:shadow cursor-pointer dark:bg-slate-800">
            <p
              onClick={() => navigate("/load-data/communicated")}
              className="font-medium text-gray-800 dark:text-gray-200"
            >
              {t("Press")}
            </p>
          </div>
          <div className="border dark:border-slate-700  p-4 bg-white hover:shadow cursor-pointer dark:bg-slate-800">
            <p className="font-medium text-gray-800 dark:text-gray-200">
              Cosamed guidelines
            </p>
          </div>
          {/* <div className="border p-4 bg-blue-50 flex items-start gap-2">
            <img src="/digital-site.jpg" className="w-12 h-12 object-cover" />
            <div>
              <p
                className="text-sm font-medium text-gray-800"
                dangerouslySetInnerHTML={{
                  __html: showingTranslateValue(
                    lastCom?.title?.translations,
                    lang
                  ),
                }}
              >
                {}
              </p>
              <p className="text-xs text-gray-600">
                This page and linked pages display WHO publications in various
                digital formats.
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
