/* eslint-disable react-refresh/only-export-components */
import { Route } from "react-router";
import { Suspense, lazy } from "react";
import Spinner from "@src/ui/Spinner/Spinner";

const LazyHome = lazy(() => import("@src/pages/Home/Home"));
const LazyListing = lazy(() => import("@src/pages/Listing/Listing"));
const LazyAllListings = lazy(
  () => import("@src/pages/AllListings/AllListings")
);
const LazyOrders = lazy(() => import("@src/pages/Orders/Orders"));

export const customRoutes: JSX.Element[] = [
  <Route
    key={"0"}
    path="/"
    element={
      <Suspense fallback={<Spinner />}>
        <LazyHome />
      </Suspense>
    }
  />,
  <Route
    key={"1"}
    path="/listing/:id"
    element={
      <Suspense fallback={<Spinner />}>
        <LazyListing />
      </Suspense>
    }
  />,
  <Route
    key={"2"}
    path="/listings"
    element={
      <Suspense fallback={<Spinner />}>
        <LazyAllListings />
      </Suspense>
    }
  />,
  <Route
    key={"3"}
    path="/orders"
    element={
      <Suspense fallback={<Spinner />}>
        <LazyOrders />
      </Suspense>
    }
  />,
];
