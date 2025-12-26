import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Assignments from "./pages/Assignments";
import Attempt from "./pages/Attempt";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Assignments />} />
        <Route path="/attempt/:id" element={<Attempt />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
