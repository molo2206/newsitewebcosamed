

const Rapport = () => {
  return (
    <div className=" dark:bg-slate-600 w-full dark:text-white ">
      <div>
        <div className="container py-2 font-semibold">
           Rapport/Accueil
        </div>
        <section className="mb-10 ">
          {/* <SimpleBannerBulletin img={Img1} /> */}
          <h1 className=" mb-8 border-l-8 py-2 pl-2 text-center text-3xl font-bold">
            Our latest reports
          </h1>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {/* <BulletinCard Img={Img1} />
            <BulletinCard Img={Img2} />
            <BulletinCard Img={Img3} />
            <BulletinCard Img={Img4} /> */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Rapport;
