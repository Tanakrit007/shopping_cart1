// src/App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import Page from "./pages/Page";
import "./index.css";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto p-6">
        <Page />
      </main>
    </div>
  );
};

export default App;
