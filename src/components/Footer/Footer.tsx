import { NavLink } from "react-router-dom";
import footer from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={footer.wrapper}>
      <div className={footer["wrapper-menu"]}>
        <NavLink to="/#" className={footer.footer}>
          Profile
        </NavLink>
        <nav className={footer.navigation}>
          <ul className={footer.nav_list}>
            <li>
              <NavLink to="/listings" className={footer.nav_item}>
                Объявления
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
