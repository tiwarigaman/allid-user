import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tours from "./pages/Tours";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
    </Routes>
  );
}
