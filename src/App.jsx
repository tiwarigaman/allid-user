import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tours from "./pages/Tours";
import TourDetails from "./pages/TourDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tour/:slug" element={<TourDetails />} />
    </Routes>
  );
}
