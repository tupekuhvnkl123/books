import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global-styles/global.scss";
import Routes from "./routes/Routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Routes />
  </StrictMode>
);
