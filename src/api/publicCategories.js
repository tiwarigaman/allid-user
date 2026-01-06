// src/api/publicCategories.js
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const COLLECTION = "categories";

// ---------- SIMPLE IN-MEMORY CACHE ----------

const TOUR_CATEGORY_CACHE_TTL = 60 * 1000; // 60s
let tourCategoryCache = {
  data: null,
  fetchedAt: 0,
};

/**
 * Internal: fetch + filter + sort *all* active tour categories.
 * Used by both the simple helper and the paginated helper.
 */
async function fetchAllActiveTourCategories() {
  const now = Date.now();

  // 🔹 return cache if still fresh
  if (
    tourCategoryCache.data &&
    now - tourCategoryCache.fetchedAt < TOUR_CATEGORY_CACHE_TTL
  ) {
    return tourCategoryCache.data;
  }

  const q = query(collection(db, COLLECTION), where("type", "==", "tour"));
  const snap = await getDocs(q);

  const items = snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));

  // keep only active (or missing flag = active)
  const filtered = items.filter((cat) => cat.isActive !== false);

  // sort by optional "order" then by name
  filtered.sort((a, b) => {
    const ao =
      typeof a.order === "number" ? a.order : Number.MAX_SAFE_INTEGER;
    const bo =
      typeof b.order === "number" ? b.order : Number.MAX_SAFE_INTEGER;

    if (ao !== bo) return ao - bo;

    return (a.name || "").localeCompare(b.name || "");
  });

  // 🔹 update cache
  tourCategoryCache = {
    data: filtered,
    fetchedAt: now,
  };

  return filtered;
}

/**
 * Simple helper used by header / small spots:
 * returns ALL active tour categories, already sorted.
 */
export async function getPublicTourCategories() {
  return fetchAllActiveTourCategories();
}

/**
 * Optional paginated helper for pages:
 * pagination is done in JS on the sorted list (no extra index).
 *
 * Params:
 *  - page (1-based)
 *  - pageSize
 *
 * Returns:
 *  {
 *    items,     // categories for this page
 *    total,     // total number of categories
 *    page,
 *    pageSize,
 *    hasMore    // boolean
 *  }
 */
export async function getPublicTourCategoriesPage({
  page = 1,
  pageSize = 6,
} = {}) {
  const all = await fetchAllActiveTourCategories();
  const total = all.length;

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const items = all.slice(start, end);

  return {
    items,
    total,
    page,
    pageSize,
    hasMore: end < total,
  };
}
