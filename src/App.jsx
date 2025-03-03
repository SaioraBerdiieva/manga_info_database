import { useState } from "react";
import Popular from "./components/Popular";
import { useGlobalContext } from "./context/global";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MangaItem from "./components/MangaItem";
import Homepage from "./components/Homepage";
import Gallery from "./components/Gallery";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Popular />} /> */}
        <Route path="/" element={<Homepage />} />

        <Route path="/manga/:id" element={<MangaItem />} />
        <Route path="/character/:id/:name" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
