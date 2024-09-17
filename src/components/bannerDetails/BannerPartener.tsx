import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import BlogCardLoand from "../../components/blogs/BlogCardLoad";
import useAsync from "../../hooks/useAsync";
import PartenersServices from "../../services/PartenersServices";
import { useTranslation } from "react-i18next";
import PartnerCard from "../../components/blogs/PartnerCard";


function BannerPartener() {
  const { t } = useTranslation();
  const { data, loading } = useAsync(() => PartenersServices.getPartners());
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="container dark:bg-slate-900 w-full dark:text-white  h-full md:py-8 sm:py-4">
      <h1 className="py-2 pl-2 text-left md:text-3xl sm:text-2xl font-bold">
        {t("Partnerships")}
      </h1>
      <div className="rounded-lg">
        <p className="text-lg text-slate-600 dark:text-slate-200 font-montserrat mx-auto w-full p-4 ">
          {t("Data_how_collaborate")}
        </p>
      </div>
      <div
        className="relative  lg:h-[80vh] py-10"
        data-aos="fade-down"
        data-aos-delay="300"
        data-aos-duration="300"
      >
        <div className="py-2 relative z-10 max-w-[1200px] px-6 mx-auto ">
          <Carousel
            partialVisbile={false}
            swipeable={true}
            draggable={false}
            responsive={responsive}
            ssr={true}
            infinite
            autoPlay={true}
            arrows={true}
            keyBoardControl={true}
            itemClass="carouselItem"
          >
            {loading
              ? Array.from(Array(20).keys()).map(() => <BlogCardLoand />)
              : data.map((item: any, index: number) => (
                  <PartnerCard partners={item} key={index} />
                ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default BannerPartener;
