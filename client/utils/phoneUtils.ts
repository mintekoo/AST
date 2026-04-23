// utils/phoneUtils.ts
/**
 * Frontend helpers for Ethiopian phone numbers.
 *
 * Responsibilities:
 * - Light-weight validation for UX (doesn't replace backend validation)
 * - Formatting helper suitable for live input (auto-convert +251 / 251 / 9 -> local 0-prefixed)
 * - Normalizer that returns backend-ready local format: "09xxxxxxxx" or null
 *
 * Examples accepted:
 *  - +251912345678  -> valid
 *  - 0912345678     -> valid
 *  - 912345678      -> valid
 *  - 251912345678   -> valid
 *
 * Local normalized output format: "09xxxxxxxx" (10 characters: leading 0 + 9 digits)
 */

const DIGIT_ONLY = /[^\d+]/g;

/**
 * Remove whitespace, parentheses, dashes and other stray characters.
 * Preserves leading "+" if present.
 */
export function cleanInput(raw: string): string {
  if (!raw) return "";
  // keep digits and plus sign only
  return raw.toString().trim().replace(DIGIT_ONLY, "");
}

/**
 * Returns true if phone matches one of the supported Ethiopian formats.
 * This is intended for frontend UX validation only.
 */
export function isValidEthiopianPhone(phone: string): boolean {
  if (!phone) return false;
  const cleaned = cleanInput(phone);

  // Common accepted patterns:
  // 0XXXXXXXXX (10 chars)
  // 9XXXXXXXX (9 chars)
  // +2519XXXXXXXX (13 chars with +)
  // 2519XXXXXXXX (12 chars)
  return (
    /^0?9\d{8}$/.test(cleaned) || // 09xxxxxxxx or 9xxxxxxxx
    /^\+2519\d{8}$/.test(cleaned) || // +2519xxxxxxxx
    /^2519\d{8}$/.test(cleaned) // 2519xxxxxxxx
  );
}

/**
 * Format an input string into a local-looking phone while typing.
 * - Converts leading +251 / 251 into 0...
 * - Ensures result is at most 10 chars (0 + 9 digits).
 *
 * This is safe to use in onChange for an <input>.
 */
export function formatPhoneInput(raw: string): string {
  if (!raw) return "";

  let s = cleanInput(raw);

  // If user types +, keep it briefly (but convert for final UX)
  if (s.startsWith("+251")) {
    s = "0" + s.slice(4); // +2519... -> 09...
  } else if (s.startsWith("251")) {
    s = "0" + s.slice(3); // 2519... -> 09...
  } else if (s.startsWith("9") && s.length <= 9) {
    s = "0" + s; // 912345678 -> 0912345678 (may be built progressively)
  }

  // Ensure it starts with 0 for local-format appearance (but don't force more digits than available)
  if (!s.startsWith("0") && s.length > 0 && s[0] !== "+") {
    // If it's multi-digit and doesn't start with 0, leave as-is for progressive typing.
    // This guards against aggressively inserting 0 in the middle of typing country code.
  }

  // Truncate to local length: 10 characters (0 + 9 digits)
  if (s.startsWith("0")) {
    s = s.slice(0, 10);
  } else if (s.startsWith("+")) {
    // keep international input but don't grow unbounded
    s = s.slice(0, 13); // +2519 + 8 digits max -> 13 chars
  } else {
    s = s.slice(0, 10);
  }

  return s;
}

/**
 * Normalize to backend-ready local format: "09xxxxxxxx"
 * Returns a string when normalizable, else null.
 *
 * This mirrors backend expectations: prefer sending 0-prefixed 10-digit numbers.
 */
export function normalizeForBackend(raw: string): string | null {
  if (!raw) return null;
  const s = cleanInput(raw);

  // Direct +251 form
  if (/^\+2519\d{8}$/.test(s)) {
    return "0" + s.slice(4);
  }

  // Direct 251 form
  if (/^2519\d{8}$/.test(s)) {
    return "0" + s.slice(3);
  }

  // 9xxxxxxxx -> 0912345678
  if (/^9\d{8}$/.test(s)) {
    return "0" + s;
  }

  // 0xxxxxxxxx -> already normalized
  if (/^0\d{9}$/.test(s)) {
    return s;
  }

  // fallback: not normalizable
  return null;
}

/**
 * Simple user-facing error message helper.
 * Returns null when valid / empty message if required but missing.
 */
export function getPhoneErrorMessage(
  phone: string,
  required = true
): string | null {
  const trimmed = (phone || "").trim();
  if (required && trimmed.length === 0) return "Phone number is required";
  if (!isValidEthiopianPhone(trimmed))
    return "Enter a valid Ethiopian phone number (09xxxxxxxx or +2519xxxxxxxx)";
  return null;
}
