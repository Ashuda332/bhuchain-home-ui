/**
 * SHA-256 hex digest using the browser's Web Crypto API.
 * Web Crypto needs a secure context (https or localhost); elsewhere we fall back
 * to a small non-cryptographic hash so the illustrative demos still work.
 */
export async function sha256(text) {
  const subtle = globalThis.crypto?.subtle;
  if (subtle) {
    const buf = await subtle.digest("SHA-256", new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  return fallbackHash(text);
}

function fallbackHash(text) {
  // 8 rounds of 32-bit FNV-1a with different seeds → 64 hex chars. Demo only.
  let out = "";
  for (let seed = 0; seed < 8; seed++) {
    let h = 0x811c9dc5 ^ (seed * 0x9e3779b9);
    for (let i = 0; i < text.length; i++) {
      h ^= text.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    out += (h >>> 0).toString(16).padStart(8, "0");
  }
  return out;
}

export const shortHash = (h) => (h ? `0x${h.slice(0, 6)}…${h.slice(-4)}` : "0x……");

/** Hash of one block: its position, the previous block's hash, and its record. */
export const blockHash = (index, prev, record) => sha256(`${index}|${prev}|${record}`);
