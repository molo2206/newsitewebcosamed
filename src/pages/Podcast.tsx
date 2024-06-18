
import SimpleBannerPodcat from "../components/simpleBanner/SimpleBannerPodcat";
const Podcast = () => {
  return (
    <div className=" dark:bg-slate-900 w-full">
      <div className=" dark:bg-gray-900 dark:text-white">
        <div className="container py-2 font-semibold">Rapport/Accueil</div>
        <section className="mb-10 ">
          <SimpleBannerPodcat podcast="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1761127386&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true" />
          <h1 className=" mb-2 border-l-8 py-2 pl-2 text-center text-3xl font-bold">
            Our Latest PodCast
          </h1>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
           
          </div>
        </section>
      </div>
    </div>
  );
};

export default Podcast;
