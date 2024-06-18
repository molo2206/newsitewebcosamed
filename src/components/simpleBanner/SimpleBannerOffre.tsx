

const SimpleBannerOffre = () => {
  return (
    <>
      <div className=" bg-principal rounded-md shadow-md">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 items-center md:grid-cols-3 gap-4 md:gap-8">
            <div className="px-2">
              <form className="mt-8 space-y-6 mb-8">
                <div className="space-y-px rounded-md items-center">
                  <div className="blog-search-content">
                    <div className="border-slate-100 border border-sm dark:border-slate-100 search-box">
                      <input placeholder="Your email adress" type="search" className=" text-black"/>
                      <button>
                        <i className="fa fa-envelope"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div
              className="flex flex-col items-center
       gap-4 text-center text-white dark:text-white md:col-span-2 md:items-start md:text-left"
            >
              <h1 className="text-md font-semibold text-white">
                Obtenez les nouveaux postes vacants Recevez chaque semaine
                toutes les nouvelles offres d'emploi directement dans votre
                boîte de réception.
              </h1>
              <p></p>
              {/* <button className=" btn-primary !bg-white !text-black">
                Get Started
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimpleBannerOffre;
