import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import { AppProvider } from "./components/AppContext";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import CreditsPage from "./components/CreditsPage";
import SimulationPage from "./components/SimulationPage";
import HeatMap from "./components/HeatMap";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <NavBar />
        <HomePage />
      </div>
    ),
  },
  {
    path: "/simulation",
    element: (
      <div>
        <NavBar />
        <SimulationPage />
        <HeatMap />
      </div>
    ),
  },
  {
    path: "/credits",
    element: (
      <div>
        <NavBar />
        <CreditsPage />
      </div>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
