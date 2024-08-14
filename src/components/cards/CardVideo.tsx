/* eslint-disable @typescript-eslint/no-explicit-any */

interface props {
  items?: any;
}

const CardVideo = ({ items }: props) => {
  return (
    <div key={items?.id} className=" mx-auto relative mb-12 cursor-pointer">
      <iframe
        height="350"
        width="460"
        src={items?.VideoLink}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className=" rounded-md max-h-full max-w-full"
      ></iframe>

      <div
        className=" text-center px-4 
bg-white shadow-lg rounded-md md:w-4/4
mx-auto absolute left-0 right-0 
-bottom-18 dark:bg-slate-800 dark:text-slate-200 "
      >
        <h3 className=" mb-3  hover:text-neutral-700 first:font-medium font-semibold">
          {items?.snippet?.title}
        </h3>
      </div>
    </div>
  );
};

export default CardVideo;
