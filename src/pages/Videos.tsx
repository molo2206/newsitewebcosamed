
import SimpleBannerVideo from "../components/simpleBanner/SimpleBannerVideo";
const Videos = () => {
  return (
    <div className=" dark:bg-slate-900 w-full">
      <div className=" dark:bg-gray-900 dark:text-white">
        <div className="container py-2 font-semibold">Rapport/Accueil</div>
        <section className="mb-10 ">
          <SimpleBannerVideo video="https://www.youtube.com/embed/gRWMen27Uio?si=VtHMh9xCxQ6ccFh8" />
          <h1 className=" mb-8 border-l-8 py-2 pl-2 text-center text-3xl font-bold">
            Our Latest Videos
          </h1>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {/* <VideoCard video="https://www.youtube.com/embed/gRWMen27Uio?si=VtHMh9xCxQ6ccFh8" />
            <VideoCard video="https://www.youtube.com/embed/gRWMen27Uio?si=VtHMh9xCxQ6ccFh8" />
            <VideoCard video="https://www.youtube.com/embed/gRWMen27Uio?si=VtHMh9xCxQ6ccFh8" />
            <VideoCard video="https://www.youtube.com/embed/gRWMen27Uio?si=VtHMh9xCxQ6ccFh8" />
            <VideoCard video="https://www.youtube.com/embed/gRWMen27Uio?si=VtHMh9xCxQ6ccFh8" /> */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Videos;
