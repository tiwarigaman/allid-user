// src/api/TourForm.js
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const COLLECTION = "tourForm"; // root collection name

// --- Small sanitization helpers (same idea as contact.js) ---

function sanitizeText(str = "") {
  return String(str)
    .replace(/<[^>]*>/g, " ") // strip tags like <script>, <b>, etc.
    .replace(/\s+/g, " ") // collapse multiple spaces/newlines
    .trim();
}

function limitLength(str = "", max = 1000) {
  const value = String(str);
  return value.length > max ? value.slice(0, max) : value;
}

// Very light email check (UX only, not security)
function looksLikeEmail(str = "") {
  const value = String(str).trim();
  if (!value) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Store tour enquiry form into Firestore
 *
 * Collection: "tourForm"
 *
 * @param {{
 *   arrivalDate?: string,
 *   days?: string,
 *   adults?: string,
 *   children?: string,
 *   accommodation?: string,
 *   info?: string,
 *   name: string,
 *   email: string,
 *   country?: string,
 *   phone: string
 * }} payload
 */
export async function submitTourForm(payload = {}) {
  const arrivalDate = limitLength(sanitizeText(payload.arrivalDate ?? ""), 50);
  const days = limitLength(sanitizeText(payload.days ?? ""), 20);
  const adults = limitLength(sanitizeText(payload.adults ?? ""), 10);
  const children = limitLength(sanitizeText(payload.children ?? ""), 10);
  const accommodation = limitLength(
    sanitizeText(payload.accommodation ?? ""),
    50
  );
  const info = limitLength(sanitizeText(payload.info ?? ""), 2000);
  const name = limitLength(sanitizeText(payload.name ?? ""), 100);
  const email = limitLength(sanitizeText(payload.email ?? ""), 200);
  const country = limitLength(sanitizeText(payload.country ?? ""), 80);
  const phone = limitLength(sanitizeText(payload.phone ?? ""), 50);

  // basic required fields
  if (!name || !email || !phone) {
    throw new Error("Missing required fields.");
  }

  if (!looksLikeEmail(email)) {
    throw new Error("Invalid email address.");
  }

  const userAgent =
    typeof navigator !== "undefined" ? navigator.userAgent : "";
  const path =
    typeof window !== "undefined" ? window.location.pathname : "";

  const docData = {
    name,
    email,
    phone,
    arrivalDate,
    days,
    adults,
    children,
    accommodation,
    info,
    country,
    createdAt: serverTimestamp(),
    userAgent: limitLength(userAgent, 300),
    path: limitLength(path, 200),
    status: "new", // for admin to track later
  };

  const ref = await addDoc(collection(db, COLLECTION), docData);
  return { id: ref.id };
}
