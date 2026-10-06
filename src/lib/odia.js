const ODIA_DIGITS = "୦୧୨୩୪୫୬୭୮୯";

/** Writes a number with Odia numerals, e.g. 124 → ୧୨୪. */
export const toOdia = (n) => String(n).replace(/\d/g, (d) => ODIA_DIGITS[d]);
