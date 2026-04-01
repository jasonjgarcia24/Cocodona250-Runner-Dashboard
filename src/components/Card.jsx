import { T } from '../tokens';

export const Card = ({ children, className = '' }) => (
  <div
    className={`rounded-xl ${className}`}
    style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}
  >
    {children}
  </div>
);

export const SectionLabel = ({ children }) => (
  <div
    className="text-xs font-bold tracking-widest uppercase mb-3 font-sans"
    style={{ color: T.accentLight }}
  >
    {children}
  </div>
);
