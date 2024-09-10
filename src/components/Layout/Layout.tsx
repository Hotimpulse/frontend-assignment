import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import layout from "./layout.module.scss";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className={layout.wrapper}>
      <Header />
      <main className={layout.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
