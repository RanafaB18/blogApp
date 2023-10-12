import ReactDOM from "react-dom/client";
import "./index.css";
import DataContextProvider from "./context/DataContext.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SinglePost from "./views/SinglePost.tsx";
import Header from "./components/Header.tsx";
import Home from "./views/Home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:year/:month/:day/:slug",
    element: <SinglePost />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <DataContextProvider>
    <Header />
    <RouterProvider router={router} />
  </DataContextProvider>
);
