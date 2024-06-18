import Navbar from "./Navbar";
import NavbarFirst from "./NavbarFirst";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="dark:bg-slate-900 w-full dark:text-white">
      <NavbarFirst />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
