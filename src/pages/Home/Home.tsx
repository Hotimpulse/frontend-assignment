import SearchPanel from "@src/components/SearchPanel/SearchPanel";
import AllListings from "../AllListings/AllListings";
import home from "./home.module.scss";

export default function Home() {
  return (
    <div className={home.container}>
      <SearchPanel />
      <AllListings />
    </div>
  );
}
