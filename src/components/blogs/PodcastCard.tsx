interface props{
  blog?:any
}

const PodcastCard = ({blog}:props) => {
  return (
    <>
      <div className="p-4 shadow-lg">
        <div className=" overflow-hidden">
          <iframe
            className="aspect-video w-full"
            src={blog.podcast}
            title="Youtube video player"
            allow="accelerometer: autoplay; clipboard-write;encrypted-media;
          gyroscope;picture-in-picture;web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className=" flex justify-between py-2 text-slate-600">
          <p>April 23, 2024</p>
          <p className=" line-clamp-1">By Molo</p>
        </div>
        <div className="space-y-2 py3">
          <h1 className=" line-clamp-1 font-bold">
            How to grow business. How to grow your businessHow to grow business.
            How to grow your business.
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ea
            minima quisquam, consequatur quod iste, rem odio eveniet aliquid
            ipsam facere ab debitis, dignissimos quis! Enim quisquam quidem
            molestias veniam alias, itaque voluptates est repellat quo vel ipsam
            eligendi officia!
          </p>
        </div>
      </div>
    </>
  );
};

export default PodcastCard;
