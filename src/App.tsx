import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.scss";
import RouterWithRoutes from "./routing/RouterWithRoutes";
import { Toaster } from "react-hot-toast";
import { SkeletonTheme } from "react-loading-skeleton";
import { Provider } from "react-redux";
import store from "./store/store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <SkeletonTheme baseColor="#fef08a" highlightColor="#dadadb">
            <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
            <RouterWithRoutes />
          </SkeletonTheme>
          <Toaster
            position="bottom-right"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "primary",
              },
            }}
          />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
