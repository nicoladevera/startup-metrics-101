import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Show content after React is ready to prevent FOUC
document.body.classList.add('ready');

createRoot(document.getElementById("root")!).render(<App />);
