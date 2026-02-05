// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css"; // *** ต้องมีบรรทัดนี้ เพื่อให้ CSS ทำงาน ***
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
