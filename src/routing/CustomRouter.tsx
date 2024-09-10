import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { customRoutes } from "@src/routing/routes";
import Error404 from "@src/pages/Error404/Error404";
import Layout from "@src/components/Layout/Layout";

export default function useCustomRouter() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<Error404 />}>
        {customRoutes}
        <Route path="*" element={<Error404 />} />
      </Route>
    )
  );

  return routes;
}
