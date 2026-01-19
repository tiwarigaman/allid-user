// src/api/contact.js
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const COLLECTION = "contactMessages";

/**
 * Very small, defensive sanitization helpers
 * (we still recommend enforcing rules in Firestore security rules)
 */

// Remove HTML tags, collapse whitespace, trim
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

// Optional: very light email check (NOT security, just UX)
function looksLikeEmail(str = "") {
  const value = String(str).trim();
  if (!value) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Public API: send a contact message to Firestore
 *
 * This assumes:
 * - App Check is enabled & enforced for Firestore (in Firebase Console)
 * - Firestore rules restrict fields, types and lengths for `contactMessages`
 *
 * @param {{ name: string, email: string, phone?: string, message: string }} payload
 */
export async function sendContactMessage(payload) {
  const rawName = payload?.name ?? "";
  const rawEmail = payload?.email ?? "";
  const rawPhone = payload?.phone ?? "";
  const rawMessage = payload?.message ?? "";

  const name = limitLength(sanitizeText(rawName), 100);
  const email = limitLength(sanitizeText(rawEmail), 200);
  const phone = limitLength(sanitizeText(rawPhone), 50);
  const message = limitLength(sanitizeText(rawMessage), 2000);

  if (!name || !email || !message) {
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
    message,
    createdAt: serverTimestamp(),
    userAgent: limitLength(userAgent, 300),
    path: limitLength(path, 200),
  };

  const ref = await addDoc(collection(db, COLLECTION), docData);
  return { id: ref.id };
}
