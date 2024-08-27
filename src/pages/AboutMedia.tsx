import { useTranslation } from "react-i18next";
import BannerMedia from "../components/simpleBanner/BannerMedia";
import SettingsServices from "../services/SettingsServices";
import useAsync from "../hooks/useAsync";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
const AboutMedia = () => {
  const { data, loading } = useAsync(() => SettingsServices.getSettings());
  const { t } = useTranslation();
  return (
    <div className="container  dark:bg-slate-900 w-full dark:text-white">
      <div className=" px-4 lg:px-14 max-w-screen-2xl mx-auto my-8  py-20">
        <div className=" md:w-12/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="  ">
            <h2 className=" text-5xl text-principal text-neutralDGray font-bold mb-4 ">
              {t("media")}
            </h2>
          </div>
          <div className="">
            <p className=" text-3xl">
             {
              t('about_media')
             }
            </p>
          </div>
        </div>
        <div className=" py-6">
          {loading ? (
            Array.from(Array(20).keys()).map(() => <BlogCardLoand />)
          ) : (
            <img
              src={data?.img_media}
              alt=""
              className="mx-auto w-full h-full
            object-cover transition duration-700 "
            />
          )}
        </div>
        <BannerMedia />
      </div>
    </div>
  );
};

export default AboutMedia;
