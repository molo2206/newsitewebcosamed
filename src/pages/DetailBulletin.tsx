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
import BreadCumb from "../components/navbar/BreadCumb";
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";

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
        <div className="container dark:bg-slate-900 w-full dark:text-white py-1 ">
          <div className="container">
            <div className=" pb-14 py-1">
              <div className="grid  row">
                <div className="col-span-2 col-lg-2 col-md-2 px-4">
                  <div className="overflow-hidden">
                    <BreadCumb
                      title="Detail blog"
                      second={"/data-loading/newsletters"}
                      secondTitle={"Bulletin"}
                    />
                    <div className=" mt-6 ">
                      <h1 className=" md:text-5xl font-semibold mb-10 line-clamp-5">
                        {showingTranslateValue(data?.translations, lang)?.title}
                      </h1>
                      <div className=" flex space-x-2 items-center">
                        <img
                          src={data?.author?.image}
                          className=" h-[40px] px-30 rounded-full duration-200 hover:scale-105"
                        />
                        <p className="text-lg font-semibold ">
                          {data?.author?.full_name}
                        </p>
                      </div>
                    </div>
                    <div className=" mt-4">
                      <img
                        src={data?.image}
                        alt=""
                        className="mx-auto w-full h-60
            object-cover transition duration-700 rounded-md"
                      />
                    </div>
                  </div>
                  <p
                    className=" font-montserrat text-lg"
                    dangerouslySetInnerHTML={{
                      __html: showingTranslateValue(data?.translations, lang)
                        ?.documentation,
                    }}
                  ></p>

                  <div
                    className="text-lg font-montserrat mt-6"
                    dangerouslySetInnerHTML={{
                      __html: showingTranslateValue(data?.translations, lang)
                        ?.description,
                    }}
                  ></div>
                  <div>
                    <h3 className="font-montserrat text-lg">
                      {t("PressButton")}
                    </h3>

                    <a
                      className="py-2 text-lg rounded-md w-full text-white cursor-pointer
 bg-principal px-3"
                      href={data?.file}
                      target="_blank"
                      role="noreferrer"
                      download={
                        data?.file
                          ?.split("https://apicosamed.cosamed.org/")[1]
                          ?.split("/")[3]
                      }
                    >
                      {t("Download")}
                    </a>
                  </div>
                  <div className=" py-1  rounded-2xl">
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
                </div>
              </div>
            </div>
          </div>
          {/* <p className=" border-t-2 border-gray-300/50 py-4 text-center"></p> */}
        </div>
      )}
    </>
  );
};

export default DetailBulletin;
