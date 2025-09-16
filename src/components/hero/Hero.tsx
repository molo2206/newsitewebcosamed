import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { CiCalendar } from "react-icons/ci";
import useAsync from "../../hooks/useAsync";
import BlogServices from "../../services/BlogsServices";
import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";
import HomeLoad from "../blogs/HomeLoad";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = () => {
  const { data, loading } = useAsync(() => BlogServices.getBlog());
  const { lang } = useAuthContext();

  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map((_, idx) => <HomeLoad key={idx} />)
      ) : (
        <section className="bg-slate-100 dark:bg-slate-900 ">
          <div className="max-w-7xl mx-auto p-6 relative">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              autoplay={{ delay: 10000, disableOnInteraction: false }}
              spaceBetween={0}
              slidesPerView={1}
              className="h-full rounded-md"
            >
              {data?.map((item: any, idx: number) => (
                <SwiperSlide key={idx}>
                  <div
                    className="relative h-[400px] md:h-[550px] lg:h-[600px] xl:h-[650px] rounded-md overflow-hidden"
                    style={{
                      backgroundImage: `url(${item?.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {/* Overlay subtil pour lisibilité */}
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>

                    {/* Gradient en bas */}
                    <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-black via-transparent"></div>

                    {/* Contenu texte */}
                    <div className="relative z-10 container h-full flex flex-col justify-end pb-12 md:pb-20 text-white">
                      {/* Catégorie */}
                      <div className="mb-2">
                        <span className="inline-block bg-white bg-opacity-80 text-black text-xs md:text-sm font-semibold px-3 py-1 rounded-md">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: showingTranslateValue(
                                item?.category?.translations,
                                lang
                              )?.name,
                            }}
                          ></span>
                        </span>
                      </div>

                      {/* Titre */}
                      <Link
                        to={`/blog/detail/${showingTranslateValue(item?.translations, lang)?.slug}`}
                        onClick={() => window.scroll(0, 0)}
                      >
                        <h3 className="text-sm md:text-2xl lg:text-4xl font-extrabold leading-tight mb-4 drop-shadow-lg">
                          <span
                            className="text-slate-200"
                            dangerouslySetInnerHTML={{
                              __html: showingTranslateValue(item?.translations, lang)?.title,
                            }}
                          ></span>
                        </h3>
                      </Link>

                      {/* Meta infos */}
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm md:text-base text-gray-100">
                        <span className="flex items-center space-x-1">
                          <CiCalendar />
                          <span>{item?.publication_date}</span>
                        </span>

                        <span className="flex items-center space-x-2">
                          <img
                            src={item.author.image}
                            alt={item.author.full_name}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover ring-2 ring-white"
                          />
                          <span className="text-[11px] md:text-sm text-white drop-shadow-md">
                            {item?.author?.full_name}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}
    </>
  );
};

export default Hero;
