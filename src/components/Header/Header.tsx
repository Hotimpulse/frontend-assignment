import { useState } from "react";
import header from "./header.module.scss";
import Navigation from "../Navigation/Navigation";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <header className={header.wrapper}>
      <div className={header["wrapper-menu"]}>
        <NavLink to="/" className={header.header}>
          Home
        </NavLink>
        {menuOpen ? (
          <div
            onClick={toggleMenu}
            className={header.burger_veil + (menuOpen ? ` ${header.open}` : "")}
          >
            <Navigation mobile={"mobile"} />
          </div>
        ) : (
          <Navigation mobile={"pc"} />
        )}
      </div>
      <div
        className={header.burger_menu + (menuOpen ? ` ${header.open}` : "")}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}
