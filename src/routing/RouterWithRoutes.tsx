import { RouterProvider } from "react-router-dom";
import useCustomRouter from "./CustomRouter";

export default function RouterWithRoutes() {
  const routes = useCustomRouter();
  return <RouterProvider router={routes} />;
}
