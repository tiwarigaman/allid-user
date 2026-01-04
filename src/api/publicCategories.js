// src/api/publicCategories.js
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const COLLECTION = "categories";

/**
 * Public: get tour categories for the website (home, filters, etc.).
 * - type === "tour"
 * - isActive !== false (treat missing as active)
 * - sorted by `order` if present, else by name
 */
export async function getPublicTourCategories() {
  const q = query(collection(db, COLLECTION), where("type", "==", "tour"));
  const snap = await getDocs(q);

  const items = snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));

  const filtered = items.filter((cat) => cat.isActive !== false);

  filtered.sort((a, b) => {
    const ao =
      typeof a.order === "number"
        ? a.order
        : Number.MAX_SAFE_INTEGER;
    const bo =
      typeof b.order === "number"
        ? b.order
        : Number.MAX_SAFE_INTEGER;

    if (ao !== bo) return ao - bo;

    return (a.name || "").localeCompare(b.name || "");
  });

  return filtered;
}
