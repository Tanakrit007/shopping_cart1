// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // import BrowserRouter จาก react-router-dom
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import Home from "./pages/Home";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {" "}
        {/* ห่อหุ้มแอปทั้งหมดด้วย BrowserRouter */}
        <App /> {/* App component อยู่ภายใน BrowserRouter */}
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
