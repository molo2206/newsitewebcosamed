interface props{
  podcast?:any;
}
const SimpleBannerPodcat = ({podcast}:props) => {
  return (
    <>
      <div className=" bg-principal">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 items-center md:grid-cols-3 gap-4 md:gap-8">
            <div className="px-2">
              <iframe
                className="aspect-video w-full"
                src={podcast}
                title="Youtube video player"
                allow="accelerometer: autoplay; clipboard-write;encrypted-media;
          gyroscope;picture-in-picture;web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div
              className="flex flex-col items-center
         gap-4 text-center text-white dark:text-white md:col-span-2 md:items-start md:text-left"
            >
              <h1 className="text-3xl font-bold">
                Market your next project with Cosamed
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
                cumque odit. Rerum quidem assumenda nulla tempore vitae
                blanditiis consequuntur quas sint dolorem, aliquam, ipsum fugit
                repellendus ratione maiores id atque.
              </p>
              <button className=" btn-primary !bg-white !text-black">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimpleBannerPodcat;
