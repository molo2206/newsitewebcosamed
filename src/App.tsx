import { Route, Routes } from "react-router-dom";
import "./assets/css/index.scss";
import "./assets/scss/index.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import Blog from "./pages/Blog";
import Videos from "./pages/Videos";
import Podcast from "./pages/Podcast";
import Bulletin from "./pages/Bulletin";
import Rapport from "./pages/Rapport";
import Offres from "./pages/Offres";
import AutreDoc from "./pages/AutresDocument";
import Rejoindre from "./pages/Rejoindre";
import Layout from "./components/navbar/Layout";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/navbar/ScrollToTop";
import DonateTrue from "./pages/DonateTrue";
import DetailBlog from "./pages/DetailBlog";
import DetailBulletin from "./pages/DetailBulletin";
import "react-toastify/dist/ReactToastify.css";
import About from "./pages/About";
import Partners from "./pages/Partners";
import Team from "./pages/Team";
import Error404 from "./pages/Error404";
import Thematiqueblog from "./pages/Thematiqueblog";
import DetailOffre from "./pages/DetailOffre";
import Communicates from "./pages/Communicates";
import CommunicateDetail from "./pages/CommunicateDetail";
import Project from "./pages/Project";
import AboutMedia from "./pages/AboutMedia";
import DetailRapport from "./pages/DetailRapport";
import { getstripe } from "./utils/heleprs";
import { Elements } from "@stripe/react-stripe-js";

function App() {
  const stripe = getstripe();

  return (
    <div className="bg-slate-100  dark:bg-slate-900 dark:text-white ">
      <Elements stripe={stripe}>
        <ScrollToTop />
        <ToastContainer position="bottom-right" style={{ zIndex: 99999 }} />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/data-loading/blogs" element={<Blog />} />
            <Route path="/data-loading/videos" element={<Videos />} />
            <Route path="/data-loading/podcast" element={<Podcast />} />
            <Route path="/data-loading/newsletters" element={<Bulletin />} />
            <Route path="/data-loading/reports" element={<Rapport />} />
            <Route path="/data-loading/jobopenings" element={<Offres />} />
            <Route path="/data-loading/othersdoc" element={<AutreDoc />} />
            <Route path="/community/join" element={<Rejoindre />} />
            <Route path="/community/donate" element={<DonateTrue />} />
            <Route path="/blog/detail/:slug" element={<DetailBlog />} />
            <Route path="/bulletin/detail/:id" element={<DetailBulletin />} />
            <Route path="/offre/detail/:id" element={<DetailOffre />} />
            <Route path="/about" element={<About />}></Route>
            <Route path="/partners" element={<Partners />}></Route>
            <Route path="/team" element={<Team />}></Route>
            <Route
              path="/blog/category/:id"
              element={<Thematiqueblog />}
            ></Route>
            <Route
              path="/load-data/communicated"
              element={<Communicates />}
            ></Route>
            <Route
              path="/communicated/:id"
              element={<CommunicateDetail />}
            ></Route>
            <Route path="*" element={<Error404 />}></Route>
            <Route path="/projects" element={<Project />} />
            <Route path="/aboutmedia" element={<AboutMedia />}></Route>
            <Route
              path="/report/detail/:id"
              element={<DetailRapport />}
            ></Route>
            <Route path="/donation" element={<DonateTrue />}></Route>
            {/* <Route path="/projet/detail/" element={Detailpro} ></Route> */}
            {/* 
            <Route path="/evenement" element={<Evenement/>}></Route>
            <Route path="/galery" element={<Photos/>}></Route>
            <Route path="/contact" element={<Contact />} />
            <Route path="/places" element={<PlacesRoute />} />
           
            // <Route path="/blogs/:id" element={<BlogsDetails />} />  */}
          </Route>
        </Routes>
      </Elements>
    </div>
  );
}

export default App;
