// Small inline line icons (stroke = currentColor). Decorative: aria-hidden.
const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const IconDoc = (p) => (
  <svg {...common} {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </svg>
);
export const IconId = (p) => (
  <svg {...common} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <circle cx="9" cy="11" r="2" />
    <path d="M6.5 16c.6-1.4 1.5-2 2.5-2s1.9.6 2.5 2M14 10h4M14 13.5h3" />
  </svg>
);
export const IconShieldCheck = (p) => (
  <svg {...common} {...p}>
    <path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.4 7.5 9.5 4.4-1.1 7.5-4.9 7.5-9.5V6z" />
    <path d="m8.8 12 2.2 2.2 4.3-4.4" />
  </svg>
);
export const IconLedger = (p) => (
  <svg {...common} {...p}>
    <rect x="3" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="14" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="8.5" y="13.5" width="7" height="7" rx="1.5" />
    <path d="M10 7h4M7 10.5 10 13.5M17 10.5 14 13.5" />
  </svg>
);
export const IconLock = (p) => (
  <svg {...common} {...p}>
    <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3M12 14.5v2.5" />
  </svg>
);
export const IconSearch = (p) => (
  <svg {...common} {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2M8.5 11h5M11 8.5v5" />
  </svg>
);
export const IconUserX = (p) => (
  <svg {...common} {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M3 20c.8-3.2 3.2-5 6-5s5.2 1.8 6 5M16.5 8.5l4 4M20.5 8.5l-4 4" />
  </svg>
);
export const IconCopy = (p) => (
  <svg {...common} {...p}>
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </svg>
);
export const IconClock = (p) => (
  <svg {...common} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);
export const IconPin = (p) => (
  <svg {...common} {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
);
export const IconArrow = (p) => (
  <svg {...common} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const IconCheck = (p) => (
  <svg {...common} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
