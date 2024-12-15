import Navbar from "./Navbar";
import NavbarFirst from "./NavbarFirst";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";
import CookieConsent from "../../pages/Cookies/CookieConsent";

const Layout = () => {
  return (
    <div className="bg-white dark:bg-slate-900 w-full dark:text-white">
      <NavbarFirst />
      <CookieConsent />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
