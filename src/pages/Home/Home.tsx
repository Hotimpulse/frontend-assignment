import Search from "@src/components/SearchPanel/Search";
import AllListings from "../AllListings/AllListings";
import home from "./home.module.scss";

export default function Home() {
  return (
    <div className={home.container}>
      <Search />
      <AllListings />
    </div>
  );
}
