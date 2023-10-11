import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import DataContextProvider from "./context/DataContext.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
])
ReactDOM.createRoot(document.getElementById("root")!).render(
  <DataContextProvider>
    <RouterProvider router={router}/>
  </DataContextProvider>
);
