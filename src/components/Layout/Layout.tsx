import layout from "./layout.module.scss";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className={layout.wrapper}>
      <main className={layout.main}>
        <Outlet />
      </main>
    </div>
  );
}
