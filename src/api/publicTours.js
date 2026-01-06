// src/api/publicTours.js
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit as fbLimit,
  startAfter,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

const COLLECTION = "tours";

// ---------- SIMPLE IN-MEMORY CACHE ----------

// featured tours cache (homepage)
const FEATURED_CACHE_TTL = 60 * 1000; // 60s
let featuredCache = {
  data: null,
  fetchedAt: 0,
};

// tour details cache (details page)
const TOUR_DETAIL_CACHE_TTL = 60 * 1000; // 60s
const tourDetailCache = new Map(); // key: slugOrId -> { data, fetchedAt }

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

// Internal helper to run a paginated query
async function runPagedQuery(constraints, pageSize, lastDoc) {
  const baseRef = collection(db, COLLECTION);

  const qConstraints = [
    ...constraints,
    orderBy("createdAt", "desc"), // uses your (status + createdAt) index
  ];

  if (lastDoc) {
    qConstraints.push(startAfter(lastDoc));
  }

  qConstraints.push(fbLimit(pageSize));

  const q = query(baseRef, ...qConstraints);
  const snap = await getDocs(q);

  const items = snap.docs.map(mapTourDoc);
  const newLastDoc =
    snap.docs.length > 0 ? snap.docs[snap.docs.length - 1] : null;

  return {
    items,
    lastDoc: newLastDoc,
    hasMore: snap.docs.length === pageSize,
  };
}

/**
 * Paginated public tours for listing pages (ALL categories).
 *
 * Params:
 * - pageSize: how many tours per page (default 9)
 * - lastDoc: Firestore document snapshot to start after (cursor)
 */
export async function getPublicToursPage({
  pageSize = 9,
  lastDoc = null,
} = {}) {
  const constraints = [where("status", "==", "published")];
  return runPagedQuery(constraints, pageSize, lastDoc);
}

/**
 * Paginated public tours filtered by categoryId.
 *
 * IMPORTANT:
 * - To avoid creating a new composite index, we **do not** filter by
 *   categoryId inside Firestore.
 * - Instead we:
 *     1) Page through published tours (status == "published")
 *     2) Filter them by categoryId in JS
 *     3) If we didn’t fill the pageSize, we keep pulling more pages
 *        until we have enough or run out of tours.
 *
 * Params:
 * - categoryId: Firestore id of the category
 * - pageSize: how many tours per page (default 9)
 * - lastDoc: Firestore document snapshot to start after (cursor)
 */
export async function getPublicToursByCategoryPage({
  categoryId,
  pageSize = 9,
  lastDoc = null,
} = {}) {
  // No category provided → behave like "all tours"
  if (!categoryId) {
    return getPublicToursPage({ pageSize, lastDoc });
  }

  let accumulated = [];
  let cursor = lastDoc;
  let hasMore = true;

  // Keep pulling pages until:
  // - we have pageSize items for this category OR
  // - Firestore has no more published tours
  while (accumulated.length < pageSize && hasMore) {
    const page = await getPublicToursPage({
      pageSize,
      lastDoc: cursor,
    });

    // Nothing more in Firestore -> stop
    if (!page.items.length) {
      hasMore = false;
      cursor = page.lastDoc;
      break;
    }

    const filtered = page.items.filter(
      (t) => t.categoryId === categoryId
    );

    accumulated = accumulated.concat(filtered);
    cursor = page.lastDoc;
    hasMore = page.hasMore;
  }

  return {
    items: accumulated,
    lastDoc: cursor,
    hasMore,
  };
}

/**
 * Convenience helper:
 * - returns ONLY the items array of the first page
 * - internally still uses pagination (no full-collection read)
 *
 * Usage: simple pages that just need "some tours" can call:
 *   const tours = await getPublicTours({ pageSize: 9 });
 */
export async function getPublicTours(options = {}) {
  const { items } = await getPublicToursPage(options);
  return items;
}

/**
 * Get ONE public tour for details page.
 *
 * - First tries to find by slug: where("slug", "==", slugOrId)
 * - If not found, falls back to treating it as document id
 * - Only returns the tour if status === "published"
 *
 * Returns: mapped tour object or null
 */
export async function getPublicTourBySlugOrId(slugOrId) {
  if (!slugOrId) return null;

  const now = Date.now();

  // 🔹 0) Check cache first
  const cached = tourDetailCache.get(slugOrId);
  if (cached && now - cached.fetchedAt < TOUR_DETAIL_CACHE_TTL) {
    return cached.data;
  }

  const baseRef = collection(db, COLLECTION);

  // 1) Try by slug
  try {
    const slugQuery = query(
      baseRef,
      where("slug", "==", slugOrId),
      fbLimit(1)
    );
    const slugSnap = await getDocs(slugQuery);

    if (!slugSnap.empty) {
      const docSnap = slugSnap.docs[0];
      const tour = mapTourDoc(docSnap);

      if (tour.status === "published") {
        // store to cache
        tourDetailCache.set(slugOrId, {
          data: tour,
          fetchedAt: now,
        });
        return tour;
      }
      return null;
    }
  } catch (err) {
    console.error("Error querying tour by slug:", err);
  }

  // 2) Fallback: treat slugOrId as Firestore document id
  try {
    const docRef = doc(db, COLLECTION, slugOrId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const tour = mapTourDoc(docSnap);
      if (tour.status === "published") {
        tourDetailCache.set(slugOrId, {
          data: tour,
          fetchedAt: now,
        });
        return tour;
      }
    }
  } catch (err) {
    console.error("Error querying tour by id:", err);
  }

  return null;
}

/**
 * Featured tours for homepage.
 *
 * To avoid more composite indexes, we:
 * - query by isFeatured == true only
 * - then filter to status === "published" in JS
 * - sort by createdAt in JS
 *
 * Now with a small in-memory cache to reduce repeat reads.
 */
export async function getFeaturedTours(maxItems = 6) {
  const now = Date.now();

  // 🔹 Serve from cache if fresh
  if (
    featuredCache.data &&
    now - featuredCache.fetchedAt < FEATURED_CACHE_TTL
  ) {
    const base = featuredCache.data;
    if (typeof maxItems === "number" && maxItems > 0) {
      return base.slice(0, maxItems);
    }
    return base;
  }

  const baseRef = collection(db, COLLECTION);

  // Single where → no composite index required
  const q = query(baseRef, where("isFeatured", "==", true));
  const snap = await getDocs(q);

  let items = snap.docs.map(mapTourDoc);

  // Only show published featured tours
  items = items.filter((t) => t.status === "published");

  // newest first, safe even if createdAt missing
  items.sort((a, b) => {
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

  // store full list in cache
  featuredCache = {
    data: items,
    fetchedAt: now,
  };

  if (typeof maxItems === "number" && maxItems > 0) {
    return items.slice(0, maxItems);
  }
  return items;
}
