import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
