import { Link } from "react-router-dom";
import nav from "./navigation.module.scss";
import { INavigation } from "@src/interfaces/INavigation";

export default function Navigation({ mobile }: INavigation) {
  return (
    <nav className={nav.navigation}>
      <ul className={mobile === "mobile" ? nav.nav_list_mobile : nav.nav_list}>
        <li>
          <Link to="/#catalog" className={nav.nav_item}>
            All Listings
          </Link>
        </li>
      </ul>
    </nav>
  );
}
