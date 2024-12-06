import { useParams } from "react-router-dom";
import useAsync from "../hooks/useAsync";
import OffresServices from "../services/OffresServices";
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
import moment from "moment";
import { dateformat } from "../utils/moment";

const DetailOffre = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, loading } = useAsync(() => OffresServices.oneOffre(id), id);
  const urlShare = window.location.href;

  const target = () => {
    window.open(data?.file, "_blank");
  };

  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className="container dark:bg-slate-900 w-full dark:text-white py-1 ">
          <BreadCumb
            title="Detail offre"
            second={"/data-loading/jobopenings"}
            secondTitle={"Offres"}
          />
          {moment().format("YYYY-MM-DD") > data?.enddate && (
            <div className="  bg-gradient-to-r from-red-500 to-red-400  h-[50px] w-full">
              <p className=" flex items-center justify-center text-white sm:text-sm md:text-lg dark:text-slate-200">
                {t("Job_off")}
              </p>
            </div>
          )}

          <p className="text-sm py-3">
            <p className=" font-semibold text-lg text-principal dark:text-white">
              {data?.name}
            </p>
          </p>
          <div className="md:grid lg:grid grid-cols-3 gap-2 px-4 overflow-hidden">
            <div>
              <img
                src="https://apicosamed.cosamed.org/uploads/logo/fh.png"
                alt=""
                className="mx-auto h-[550px] w-full object-contain transition duration-700 border border-slate-300"
              />
              <h3 className="font-montserrat text-lg">{t("PressButton")}</h3>
              <div>
                <br />
              </div>

              <button
                type="button"
                disabled={moment().format("YYYY-MM-DD") > data?.enddate}
                onClick={() => target()}
                className="py-4 text-lg rounded-md w-full text-white disabled:opacity-75 disabled:cursor-not-allowed
bg-principal px-3"
              >
                {t("Download")}
              </button>
            </div>

            <div className=" col-span-2 py-4">
              <div className="  pb-14">
                <div className="row">
                  <div className="col-span-2 col-lg-8 col-md-8 px-4">
                    <h1 className=" text-2xl font-semibold mb-10 uppercase">
                      {data?.title}
                    </h1>

                    <h1 className="text-md font-semibold mb-5">
                      Lieu d'affectation : {data?.place}
                    </h1>
                    <h1 className="text-md font-semibold mb-5">
                      Type d'offre : {data?.type}
                    </h1>
                    <div className=" flex justify-between">
                      <h1 className="text-md font-semibold mb-5">
                        Date limite :{dateformat(data?.startdate) || ""} au{" "}
                        {dateformat(data?.enddate)}
                      </h1>
                    </div>

                    <div
                      className="text-lg font-montserrat items-left text-left"
                      dangerouslySetInnerHTML={{ __html: data?.description }}
                    ></div>
                    <div>
                      <button
                        type="button"
                        disabled={moment().format("YYYY-MM-DD") > data?.enddate}
                        onClick={() => target()}
                        className="py-4 text-lg rounded-md w-full text-white disabled:opacity-75 disabled:cursor-not-allowed
bg-principal px-3"
                      >
                        {t("Download")}
                      </button>
                      <a href="/jobapplication">Vos informations</a>
                    </div>
                    <div className="px-4 py-1  rounded-2xl">
                      <h3 className="font-montserrat text-lg">
                        {t("PressButton")}
                      </h3>
                      <div>
                        <br />
                      </div>

                      <div>
                        <br />
                      </div>
                      <h1 className=" mb-3 text-justify text-1xl font-bold sm:text-left sm:text-2xl">
                        {t("Share_on")}
                      </h1>
                      <div className=" flex flex-col gap-3 ">
                        <div className="flex gap-3 mr-6 items-center">
                          <FacebookShareButton
                            url={urlShare}
                            title={data?.description}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailOffre;
