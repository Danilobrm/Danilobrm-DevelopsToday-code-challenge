import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CountryDetails from "./pages/CountryDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/country/:countryCode",
    element: <CountryDetails />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
