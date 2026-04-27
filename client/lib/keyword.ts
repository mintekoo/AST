// lib/keyword.ts
import { siteInfo } from "./site";

/* =========================
   CLEAN TEXT
========================= */
function cleanText(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/* =========================
   STOP WORDS
========================= */
const stopWords = new Set([
  "the","and","for","with","this","that","are","you",
  "our","we","in","on","to","of","a","an","is"
]);

/* =========================
   EXTRACT KEY TOPICS ONLY
========================= */
function extractKeywords(text: string) {
  const words = cleanText(text).split(" ");

  const filtered: string[] = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    if (word.length > 3 && !stopWords.has(word)) {
      filtered.push(word);

      // 🧠 capture 2-word phrases (VERY IMPORTANT for SEO)
      if (words[i + 1] && words[i + 1].length > 3) {
        filtered.push(`${word} ${words[i + 1]}`);
      }
    }
  }

  return filtered.slice(0, 6);
}

/* =========================
   SMART SEO KEYWORDS
========================= */
export function generateSEOKeywords(title: string, content?: string) {
  const base = siteInfo.baseKeywords;
  const boost = siteInfo.seoBoostKeywords;

  const words = extractKeywords(`${title} ${content || ""}`);

  // 🎯 Controlled expansion (NOT spammy)
  const expanded = words.map((w) => `${w} Ethiopia`);

  return Array.from(
    new Set([...base, ...boost, ...expanded])
  );
}