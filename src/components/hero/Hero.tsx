import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { CiCalendar } from "react-icons/ci";
import { LuUser } from "react-icons/lu";
import useAsync from "../../hooks/useAsync";
import BlogServices from "../../services/BlogsServices";
import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";
import HomeLoad from "../blogs/HomeLoad";
import { Link } from "react-router-dom";

const Hero = () => {
  const { data, loading } = useAsync(() => BlogServices.getBlog());
  const { lang } = useAuthContext();
  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <HomeLoad />)
      ) : (
        <div className="h-[650px] w-full relative group">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {data?.map((items: any, _: number) => (
              <SwiperSlide key={_}>
                <div
                  className="blog__breadcrumb-item blog__breadcrumb-height blog__breadcrumb-overlay include-bg flex items-end h-[700px]"
                  style={{
                    position: "relative",
                    backgroundImage: `url(${items?.image})`,
                  }}
                >
                  <div className="container">
                    <div className="col-xxl-8 col-xl-8 col-lg-10">
                      <div className="blog__breadcrumb-thumb"></div>
                      <div className="blog__breadcrumb-content">
                        <div className="blog__breadcrumb-tag">
                          <a
                            href="#"
                            dangerouslySetInnerHTML={{
                              __html: showingTranslateValue(
                                items?.category?.translations,
                                lang
                              )?.name,
                            }}
                          ></a>
                        </div>
                        <Link
                          to={
                            `/blog/detail/` +
                            showingTranslateValue(items?.translations, lang)
                              ?.slug
                          }
                          onClick={() => window.scroll}
                        >
                          <h3 className="blog__breadcrumb-title text-white md:text-4xl sm:text-6xl">
                            <span
                              className="text-white"
                              dangerouslySetInnerHTML={{
                                __html: showingTranslateValue(
                                  items?.translations,
                                  lang
                                )?.title,
                              }}
                            ></span>
                          </h3>
                        </Link>
                        <div className="blog__breadcrumb-meta">
                          <span>
                            <CiCalendar /> {items?.publication_date}
                          </span>
                          <span>
                            <LuUser /> {items?.author?.full_name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default Hero;
