import React from "react";
import Navbar from "./components/Navbar";
import Page from "./pages/Page"; // นำเข้า Page component ที่ใช้สลับหน้า

const App = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      {/* ส่วนหัวของแอป */}
      <Navbar />

      {/* ส่วนเนื้อหาหลักที่จะสลับระหว่าง Home และ MyCart */}
      <main className="max-w-7xl mx-auto p-6">
        <Page />
      </main>
    </div>
  );
};

export default App;
