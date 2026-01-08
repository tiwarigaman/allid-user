import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tours from "./pages/Tours";
import TourDetails from "./pages/TourDetails";
import TourCategory from "./pages/Category";
import TourCategoryDetails from "./pages/ToursCategoryDetails";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tour/:slug" element={<TourDetails />} />
      <Route path="/category" element={<TourCategory />} />
      <Route path="/category/:slug" element={<TourCategoryDetails />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
