import { useParams } from "react-router-dom";
import useAsync from "../hooks/useAsync";
import BulletinServices from "../services/BulletinServices";
import { showingTranslateValue } from "../utils/heleprs";
import { useAuthContext } from "../context";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
} from "react-share";
import { useTranslation } from "react-i18next";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";

const DetailBulletin = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { lang } = useAuthContext();
  const { data, loading } = useAsync(
    () => BulletinServices.oneBulletin(id),
    id
  );

  const urlShare = window.location.href;
  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className="container dark:bg-slate-900 w-full dark:text-white py-1 sm:text-sm">
          {/* <p className="text-md py-3 font-semibold px-4">
            Page d'accueil/blog/detail/
            {showingTranslateValue(data?.translations, lang)?.title}
          </p> */}
          <p className="text-sm py-3">
            <p className=" font-semibold text-lg text-principal dark:text-white">
              {showingTranslateValue(data?.category?.translations, lang)?.name}
            </p>
          </p>
          <div className="md:grid lg:grid grid-cols-3 gap-2 px-4 overflow-hidden">
            <div>
              <img
                src={data.image}
                alt=""
                className="mx-auto h-[550px] w-full 
             object-contain transition duration-700"
              />
              <div>
                <br />
              </div>
              <h3 className="font-montserrat text-lg">{t("PressButton")}</h3>

              <a
                className="py-2 text-lg rounded-md w-full text-white cursor-pointer
               bg-principal px-3"
               href={data?.file} target="_blank" role="noreferrer"
                
                download={data?.file?.split("https://apicosamed.cosamed.org/")[1]?.split("/")[3]}
              >
                {t("Download")}
              </a>
              <div>
                <br />
              </div>
            </div>

            <div className=" col-span-2 py-2">
              <p
                className="  font-montserrat text-lg"
                dangerouslySetInnerHTML={{
                  __html: showingTranslateValue(data?.translations, lang)
                    ?.documentation,
                }}
              ></p>
              <div className="  pb-14">
                <div className="row">
                  <div className="col-span-2 col-lg-8 col-md-8 px-4">
                    <h1 className=" text-2xl font-semibold mb-10">
                      {showingTranslateValue(data?.translations, lang)?.title}
                    </h1>
                    <div
                      className="text-lg font-montserrat items-left text-left"
                      dangerouslySetInnerHTML={{
                        __html: showingTranslateValue(data?.translations, lang)
                          ?.description,
                      }}
                    ></div>
                    <div className="px-4 py-1  rounded-2xl">
                      <h1 className=" mb-3 text-justify text-1xl font-bold sm:text-left sm:text-2xl">
                        {t("Share_on")}
                      </h1>
                      <div className=" flex flex-col gap-3 ">
                        <div className="flex gap-3 mr-6 items-center">
                          <FacebookShareButton
                            url={urlShare}
                            title={
                              showingTranslateValue(data?.translations, lang)
                                ?.description
                            }
                            className="duration-200 hover:scale-105"
                            hashtag="#React"
                          >
                            <FacebookIcon size={32} round={true} />
                          </FacebookShareButton>
                          <WhatsappShareButton url={urlShare + data?.id}>
                            <WhatsappIcon size={32} round={true} />
                          </WhatsappShareButton>
                          <TwitterShareButton url={urlShare + data?.id}>
                            <TwitterIcon size={32} round={true} />
                          </TwitterShareButton>
                          <LinkedinShareButton url={urlShare + data?.id}>
                            <LinkedinIcon size={32} round={true} />
                          </LinkedinShareButton>
                          <TelegramShareButton url={urlShare + data?.id}>
                            <TelegramIcon size={32} round={true} />
                          </TelegramShareButton>
                        </div>
                      </div>
                    </div>
                    <div>
                      <img
                        src={data?.author?.image}
                        className=" h-[70px] px-30 rounded-full duration-200 hover:scale-105"
                      />
                      <p className="text-xl font-bold ">
                        {data?.author?.full_name}
                      </p>
                    </div>
                  </div>
                  {/* <div className="col-span-1 md:col-lg-4 col-md-4 gap-3 px-4 py-8">
                  <div className="px-4 py-8  bg-principal text-white ">
                    <h1 className=" mb-3 text-justify text-1xl font-bold sm:text-left sm:text-2xl">
                      {t("Share_on")}
                    </h1>
                    <div className=" flex flex-col gap-3 ">
                      <div className="flex gap-3 mr-6 items-center">
                        <a href="" className=" duration-200 hover:scale-105">
                          <FaInstagram className=" text-3xl" />
                        </a>
                        <a href="" className=" duration-200 hover:scale-105">
                          <FaFacebook className=" text-3xl" />
                        </a>
                        <a href="" className=" duration-200 hover:scale-105">
                          <FaLinkedinIn className=" text-3xl" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 shadow-2xl border border-lg">
                    <div className="overflow-hidden h-[250px]">
                      <h1 className=" text-xl font-montserrat font-semibold">
                        {t("Stay_inform")}
                      </h1>
                      <form className="mt-8 space-y-6 mb-8">
                        <div className="space-y-px rounded-md items-center">
                          <Input
                            type={"text"}
                            label={"Email"}
                            placeholder={t("Enter_email")}
                          />
                        </div>
                        <Button loading={false} label={t("Becom_member")} />
                        <div className="justify-center items-center">
                          <div className="mb-2">
                            <p className="text-sm font-montserrat text-slate-700 dark:text-slate-600 text-justify">
                              <Link
                                to="/privacy-policy"
                                className="text-principal font-bold"
                                target="_blank"
                              ></Link>
                            </p>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="px-4 py-8  bg-principal text-white border border-lg">
                    <h1 className=" mb-3 text-justify text-1xl font-bold sm:text-left sm:text-2xl">
                      {t("Reiceve_news")}
                    </h1>
                  </div>
                  <div className="p-4 shadow-2xl border border-lg py-10">
                    <div className="overflow-hidden h-[150px] py-12">
                      <Button loading={false} label={t("Contact")} />
                    </div>
                  </div>
                  <div className="px-4 py-8  bg-principal text-white border border-lg">
                    <h1 className=" mb-3 text-justify text-1xl font-bold sm:text-left sm:text-2xl">
                      {t("Follow_use")}
                    </h1>
                    <div className="flex gap-4 mr-8 items-center">
                      <a href="" className=" duration-200 hover:scale-105">
                        <FaInstagram className=" text-3xl" />
                      </a>
                      <a href="" className=" duration-200 hover:scale-105">
                        <FaFacebook className=" text-3xl" />
                      </a>
                      <a href="" className=" duration-200 hover:scale-105">
                        <FaLinkedinIn className=" text-3xl" />
                      </a>
                    </div>
                  </div>
                </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* <p className=" border-t-2 border-gray-300/50 py-4 text-center"></p>
          <Bulletin /> */}
        </div>
      )}
    </>
  );
};

export default DetailBulletin;
