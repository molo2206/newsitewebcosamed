import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
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
        <div className="h-full w-full relative group">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{ delay: 10000, disableOnInteraction: false }}
            spaceBetween={0}
            slidesPerView={1}
            className="h-full"
          >
            {data?.map((items: any, idx: number) => (
              <SwiperSlide key={idx}>
                <div
                  className="relative w-full h-[550px] bg-cover  bg-center"
                  style={{ backgroundImage: `url(${items?.image})` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                  <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-transparent"></div>
                  <div className="relative z-10 container h-full flex flex-col justify-end pb-20  text-white">
                    <div className="mb-2 text-sm uppercase tracking-wider text-principal font-semibold">
                      <a
                        className=" bg-white p-2"
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
                        showingTranslateValue(items?.translations, lang)?.slug
                      }
                      onClick={() => window.scroll(0, 0)}
                    >
                      <h3
                        className="
                          text-2xl md:text-4xl font-extrabold leading-tight mb-4
                          drop-shadow-lg
                          bg-gradient-to-r from-purple-400 via-pink-500 to-red-500
                          bg-clip-text text-white line-clamp-2"
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html: showingTranslateValue(
                              items?.translations,
                              lang
                            )?.title,
                          }}
                        ></span>
                      </h3>
                    </Link>

                    <div className="flex space-x-6 text-sm text-gray-100 mb-6">
                      <span className="flex items-center space-x-1">
                        <CiCalendar />
                        <span>{items?.publication_date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <img
                          src={items.author.image}
                          alt={items.full_name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span>{items?.author?.full_name}</span>
                      </span>
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
