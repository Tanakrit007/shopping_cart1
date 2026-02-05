import { createBrowserRouter } from "react-router-dom"; // ใช้จาก react-router-dom

import Home from "../pages/Home";
import Page from "../pages/Page";

const router = createBrowserRouter([
  {
    path: "/", // ตั้งค่า path ให้ถูกต้อง
    element: <Home />,
  },
  {
    path: "/page", // ตั้งค่า path สำหรับหน้า Page
    element: <Page />,
  },
]);

export default router;
