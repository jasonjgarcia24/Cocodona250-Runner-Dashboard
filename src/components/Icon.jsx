export const Icon = ({ name, size = 14 }) => {
  const s = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  const icons = {
    crew: (
      <svg {...s}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    pacer: (
      <svg {...s}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    bag: (
      <svg {...s}>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    sleep: (
      <svg {...s}>
        <path d="M2 4v16" />
        <path d="M2 8h18a2 2 0 0 1 2 2v10" />
        <path d="M2 17h20" />
        <path d="M6 8v9" />
      </svg>
    ),
    shower: (
      <svg {...s}>
        <path d="M4 4h3a2 2 0 0 1 2 2v3.5h0A5.5 5.5 0 0 1 16 15v1h1" />
        <line x1="8" y1="18" x2="8" y2="21" />
        <line x1="12" y1="18" x2="12" y2="21" />
        <line x1="16" y1="18" x2="16" y2="21" />
      </svg>
    ),
    medic: (
      <svg {...s}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    check: (
      <svg {...s} strokeWidth="2.5">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    xmark: (
      <svg {...s}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    alert: (
      <svg {...s}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    food: (
      <svg {...s}>
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    gear: (
      <svg {...s}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M22 12h-2M4 12H2M19.07 19.07l-1.41-1.41M5.34 5.34L3.93 3.93M12 22v-2M12 4V2" />
      </svg>
    ),
    chevron: (
      <svg {...s} strokeWidth="2.5">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    ),
  };
  return icons[name] || null;
};
