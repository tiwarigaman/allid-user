// src/api/publicTours.js
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const COLLECTION = "tours";

// Map Firestore doc → object that also works with existing TourCard
function mapTourDoc(docSnap) {
  const data = docSnap.data() || {};

  const mainImage =
    data.featureImageUrl ||
    (Array.isArray(data.imageUrls) && data.imageUrls[0]) ||
    "";

  return {
    id: docSnap.id,
    ...data,

    // extra keys for UI components that expect `image` etc.
    image: mainImage,
    imageUrl: mainImage,
    thumbnail: mainImage,
  };
}

/**
 * Get all published tours (if you need them later on listing pages).
 */
export async function getPublicTours() {
  const q = query(
    collection(db, COLLECTION),
    where("status", "==", "published")
  );

  const snap = await getDocs(q);
  const list = snap.docs.map(mapTourDoc);

  // newest first, safe even if createdAt missing
  list.sort((a, b) => {
    const ta =
      typeof a.createdAt?.toMillis === "function"
        ? a.createdAt.toMillis()
        : 0;
    const tb =
      typeof b.createdAt?.toMillis === "function"
        ? b.createdAt.toMillis()
        : 0;
    return tb - ta;
  });

  return list;
}

/**
 * Featured tours for homepage:
 * - we only query published tours
 * - then in JS we treat a tour as "featured" if:
 *   - isFeatured === true OR "true" OR 1
 *   - OR featured === true OR "true" OR 1
 * - if none are featured, we gracefully fall back to top `limit` published tours
 */
export async function getFeaturedTours(limit = 6) {
  // 1) get published tours
  const q = query(
    collection(db, COLLECTION),
    where("status", "==", "published")
  );
  const snap = await getDocs(q);
  const all = snap.docs.map(mapTourDoc);

  // 2) filter featured in JS (flexible on field name & type)
  const featured = all.filter((t) => {
    const flag = t.isFeatured ?? t.featured;

    return (
      flag === true ||
      flag === "true" ||
      flag === 1 ||
      flag === "1"
    );
  });

  // 3) pick list we will show (if no featured, show published list)
  const base = featured.length > 0 ? featured : all;

  // 4) sort newest first
  base.sort((a, b) => {
    const ta =
      typeof a.createdAt?.toMillis === "function"
        ? a.createdAt.toMillis()
        : 0;
    const tb =
      typeof b.createdAt?.toMillis === "function"
        ? b.createdAt.toMillis()
        : 0;
    return tb - ta;
  });

  // 5) cap at `limit`
  if (typeof limit === "number" && limit > 0) {
    return base.slice(0, limit);
  }
  return base;
}
